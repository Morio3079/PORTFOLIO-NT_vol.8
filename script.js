document.addEventListener('DOMContentLoaded', () => {
    
    // 監視対象：目次セクション
    const indexSection = document.querySelector('.index-section');
    // 操作対象：左右のナビ
    const sideNavs = document.querySelectorAll('.side-nav');

    // 監視の設定
    const options = {
        root: null,          // ブラウザのビューポートを基準にする
        rootMargin: "0px",    // マージンなし
        threshold: 0.98      // 【重要】セクションが99%完全に表示されたら実行
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // index-section が 100% 画面内に入った場合
            if (entry.isIntersecting) {
                sideNavs.forEach(nav => nav.classList.add('is-show'));
            } else {
                // 画面から外れたとき、かつ「画面の上方向」へ戻った場合にナビを隠す
                // boundingClientRect.top が 0 より大きい＝要素が画面より下にある状態
                if (entry.boundingClientRect.top > 0) {
                    sideNavs.forEach(nav => nav.classList.remove('is-show'));
                }
            }
        });
    }, options);

    if (indexSection) {
        observer.observe(indexSection);
    }
});