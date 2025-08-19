// 博客页面JavaScript
import httpRequest from '../common/http.js';

// 分页和搜索参数
const from = {
    page: 1,
    limit: 9,
    category: '',
    search: ''
};


// 格式化日期函数
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

// HTTP请求函数已通过import导入

// 获取博客列表
function getBlogList() {
    // 显示加载提示
    const loadingElement = document.getElementById('blog-loading');
    const blogListElement = document.getElementById('blog-list');

    if (loadingElement) loadingElement.style.display = 'block';
    if (blogListElement) blogListElement.innerHTML = '';

    // 构建请求参数
    const params = new URLSearchParams({
        page: from.page,
        limit: from.limit
    });

    if (from.category) params.append('category', from.category);
    if (from.search) params.append('search', from.search);

    // 发送请求
    const requestData = {
        page: from.page,
        limit: from.limit
    };

    if (from.category) requestData.category = from.category;
    if (from.search) requestData.search = from.search;

    httpRequest('/blog_posts/index', 'GET', requestData)
        .then(data => {
            // 隐藏加载提示
            if (loadingElement) loadingElement.style.display = 'none';

            if (data.code === 1 && data.data) {
                renderBlogList(data.data.list || []);
                updatePagination(data.data.pagination);
            } else {
                showError('Failed to obtain the blog list');
            }
        })
        .catch(error => {
            console.error('Failed to obtain the blog list:', error);
            if (loadingElement) loadingElement.style.display = 'none';
            showError('Network error. Please try again later');
        });
}

// 渲染博客列表
function renderBlogList(blogs) {
    const blogListElement = document.getElementById('blog-list');
    if (!blogListElement) return;

    if (!blogs || blogs.length === 0) {
        blogListElement.innerHTML = `
            <div class="col-12 text-center">
                <p>There are no blog posts for the moment</p>
            </div>
        `;
        return;
    }

    const blogHtml = blogs.map(blog => {
        const title = blog.title || 'no title';
        const excerpt = blog.excerpt || blog.content?.substring(0, 100) + '...' || '';
        const publishDate = blog.created_at ? formatDate(blog.created_at) : '';
        const detailUrl = `blog-details?id=${blog.id}`;

        return `
            <div class="col-md-4">
                <div class="content-blog blog-grid">
                    <div class="inner">
                        <div class="content">
                            <h5 class="title">
                                <a href="${detailUrl}">${title}</a>
                            </h5>
                            ${publishDate ? `<div class="blog-meta"><span class="date">${publishDate}</span></div>` : ''}
                            ${excerpt ? `<p class="excerpt">${excerpt}</p>` : ''}
                            <div class="read-more-btn">
                                <a class="axil-btn right-icon" href="${detailUrl}">
                                    Read More <i class="fal fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    blogListElement.innerHTML = blogHtml;
}

// 更新分页
function updatePagination(pagination) {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement || !pagination) return;

    const { current_page, total_pages, has_prev, has_next } = pagination;
    const currentPageNum = parseInt(current_page);
    const totalPagesNum = parseInt(total_pages);

    let paginationHTML = '';

    // 上一页
    if (has_prev) {
        paginationHTML += `<li><a href="#" onclick="selectPage(${currentPageNum - 1})" class="prev">‹</a></li>`;
    }

    // 页码
    for (let i = 1; i <= totalPagesNum; i++) {
        if (i === currentPageNum) {
            paginationHTML += `<li><a href="#" class="current">${i}</a></li>`;
        } else {
            paginationHTML += `<li><a href="#" onclick="selectPage(${i})">${i}</a></li>`;
        }
    }

    // 下一页
    if (has_next) {
        paginationHTML += `<li><a href="#" onclick="selectPage(${currentPageNum + 1})" class="next">›</a></li>`;
    }

    paginationElement.innerHTML = paginationHTML;
}

// 选择页码
function selectPage(page) {
    from.page = page;
    getBlogList();

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 按分类筛选
function filterByCategory(category) {
    from.category = category;
    from.page = 1;
    getBlogList();
}

// 搜索博客
function searchBlog(keyword) {
    from.search = keyword;
    from.page = 1;
    getBlogList();
}

// 显示错误信息
function showError(message) {
    const blogListElement = document.getElementById('blog-list');
    if (blogListElement) {
        blogListElement.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    const page = urlParams.get('page');

    if (category) from.category = category;
    if (search) from.search = search;
    if (page) from.page = parseInt(page) || 1;

    // 初始化博客列表
    getBlogList();

    // 绑定搜索事件（如果页面有搜索框）
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"], input[name="search"]');
            if (searchInput) {
                searchBlog(searchInput.value.trim());
            }
        });
    }
});

// 导出函数供全局使用
window.selectPage = selectPage;
window.filterByCategory = filterByCategory;
window.searchBlog = searchBlog;
