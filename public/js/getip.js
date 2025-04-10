// 页面加载时自动记录
window.addEventListener('load', function() {
    // 通过 AJAX 调用 PHP 记录脚本
    fetch('ip.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: window.location.href,
            userAgent: navigator.userAgent
        })
    })
    .then(response => response.text())
    .then(data => console.log('状态:', data))
    .catch(error => console.error('失败:', error));
});
