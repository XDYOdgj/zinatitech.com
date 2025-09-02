// blog-details.js - 博客详情页面数据请求
import fit from '../common/fit.js';
import httpRequest from '../common/http.js';

// 获取文章详情
const getBlogDetail = (id) => {
    // 显示加载状态
    $('#blog-detail-content').html(
        `<div class="col-lg-12">
            <div class="axil-loading text-center" style="padding: 100px 0;">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3">Loading article content...</p>
            </div>
        </div>`
    );

    // 调用API获取文章详情
    httpRequest('/blog_posts/detail', 'GET', { id: id })
        .then(response => {
            if (response.code === 1) {
                const article = response.data;
                renderBlogDetail(article);

                // 更新页面标题
                document.title = article.title + ' - Blog Details';

            } else {
                showError('Loading failed: ' + (response.msg || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Failed to get article details:', error);
            showError('Network error, please try again later');
        });
};

// 等待 DOM 和 jQuery 都加载完成
const initBlogDetails = () => {
    // 检查 jQuery 是否可用
    if (typeof $ === 'undefined') {
        console.error('jQuery is not loaded');
        setTimeout(initBlogDetails, 100); // 100ms后重试
        return;
    }

    // 获取URL参数中的文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        $('#blog-detail-content').html(
            `<div class="col-lg-12">
                <div class="axil-error-area axil-section-gap bg-color-white">
                    <div class="container">
                        <div class="axil-error">
                            <h2 class="title">Article ID Missing</h2>
                            <p>Please provide a valid article ID parameter</p>
                            <a href="blog" class="axil-btn btn-bg-primary">Back to Blog List</a>
                        </div>
                    </div>
                </div>
            </div>`
        );
        return;
    }

    getBlogDetail(articleId);
};


// 渲染博客详情
const renderBlogDetail = (article) => {
    // 构建上一篇和下一篇导航HTML
    let navigationHtml = `
        <div class="post-navigation-wrapper pt--40">
            <div class="post-navigation">
    `;

    // 上一篇文章
    if (article.prev_article) {
        navigationHtml += `
            <div class="nav-previous">
                <a href="blog-details?id=${article.prev_article.id}" class="nav-link">
                    <i class="fal fa-arrow-left"></i>
                    <div class="nav-content">
                        <span class="nav-label">Previous Post</span>
                        <h4 class="nav-title">${article.prev_article.title}</h4>
                    </div>
                </a>
            </div>
        `;
    } else {
        navigationHtml += `
            <div class="nav-previous disabled">
                <span class="nav-link">
                    <i class="fal fa-arrow-left"></i>
                    <div class="nav-content">
                        <span class="nav-label">Previous Post</span>
                        <h4 class="nav-title">No Previous Post</h4>
                    </div>
                </span>
            </div>
        `;
    }

    // 下一篇文章
    if (article.next_article) {
        navigationHtml += `
            <div class="nav-next">
                <a href="blog-details?id=${article.next_article.id}" class="nav-link">
                    <div class="nav-content">
                        <span class="nav-label">Next Post</span>
                        <h4 class="nav-title">${article.next_article.title}</h4>
                    </div>
                    <i class="fal fa-arrow-right"></i>
                </a>
            </div>
        `;
    } else {
        navigationHtml += `
            <div class="nav-next disabled">
                <span class="nav-link">
                    <div class="nav-content">
                        <span class="nav-label">Next Post</span>
                        <h4 class="nav-title">No Next Post</h4>
                    </div>
                    <i class="fal fa-arrow-right"></i>
                </span>
            </div>
        `;
    }

    navigationHtml += `
            </div>
        </div>
    `;

    // 处理文章内容的换行
    const processedContent = article.content ? article.content
        .replace(/\n/g, '<br>') // 将换行符转换为<br>标签
        .replace(/\r\n/g, '<br>') // 处理Windows风格的换行
        .replace(/\r/g, '<br>') // 处理Mac风格的换行
        .replace(/<br><br>/g, '<br>') // 避免连续的换行
        : '';

    const html = `
        <div class="col-lg-12">
            <div class="axil-post-details">
                <div class="post-header">
                    <h1 class="title">${article.title}</h1>
                    <div class="post-meta">
                        <div class="post-meta-content">
                            <ul class="post-meta-list">
                                <li><strong>Author:</strong> <a href="#">${article.author || 'Admin'}</a></li>
                                <li><strong>Date:</strong> ${formatDate(article.createtime)}</li>
                                <li><strong>Views:</strong> ${article.view_count || 0}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    ${processedContent}
                </div>
                ${navigationHtml}
            </div>
        </div>
    `;

    $('#blog-detail-content').html(html);

};

// 渲染相关文章
const renderRelatedPosts = (posts) => {
    const relatedHtml = `
        <div class="axil-related-post pt--40">
            <h4 class="title">Related Articles</h4>
            <div class="row">
                ${posts.map(post => `
                    <div class="col-lg-4 col-md-6">
                        <div class="content-blog blog-grid">
                            <div class="inner">
                                <div class="thumbnail">
                                    <a href="blog-details?id=${post.id}">
                                        <img src="${post.image || 'static/image/blog/blog-01.jpg'}" alt="${post.title}">
                                    </a>
                                </div>
                                <div class="content">
                                    <h6 class="title">
                                        <a href="blog-details?id=${post.id}">${post.title}</a>
                                    </h6>
                                    <div class="read-more-btn">
                                        <a class="axil-btn right-icon" href="blog-details?id=${post.id}">Read More <i class="fal fa-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    $('.axil-post-details').after(relatedHtml);
};


// 工具函数
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    try {
        const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        console.error('Error formatting date:', e);
        return '';
    }
};

// 添加CSS样式到页面
const addNavigationStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .post-navigation-wrapper {
            margin-top: 40px;
            border-top: 1px solid #f0f0f0;
            padding-top: 40px;
        }
        .post-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-previous, .nav-next {
            flex: 0 0 48%;
        }
        .nav-link {
            display: flex;
            align-items: center;
            padding: 20px;
            background-color: #f7f7f7;
            border-radius: 10px;
            transition: all 0.3s ease;
            text-decoration: none;
            color: #292930;
        }
        .nav-link:hover {
            background-color: #3577F0;
            color: #ffffff;
        }
        .nav-previous .nav-link {
            text-align: left;
        }
        .nav-next .nav-link {
            text-align: right;
            justify-content: flex-end;
        }
        .nav-content {
            padding: 0 15px;
        }
        .nav-label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: inherit;
        }
        .nav-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            color: inherit;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .disabled .nav-link {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #f0f0f0;
        }
        .fal.fa-arrow-left, .fal.fa-arrow-right {
            font-size: 20px;
        }
    `;
    document.head.appendChild(styleElement);
};

// 在页面加载时添加样式
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addNavigationStyles);
} else {
    addNavigationStyles();
}

const showError = (message) => {
    $('#blog-detail-content').html(
        `<div class="col-lg-12">
            <div class="axil-error-area axil-section-gap bg-color-white">
                <div class="container">
                    <div class="axil-error">
                        <h2 class="title">Loading Failed</h2>
                        <p>${message}</p>
                        <a href="blog" class="axil-btn btn-bg-primary">Back to Blog List</a>
                    </div>
                </div>
            </div>
        </div>`
    );
};

// 使用多种方式确保代码执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogDetails);
} else {
    // DOM 已经加载完成
    initBlogDetails();
}

// 如果 jQuery 已经可用，也尝试使用 jQuery 的 ready
if (typeof $ !== 'undefined') {
    $(document).ready(initBlogDetails);
}
