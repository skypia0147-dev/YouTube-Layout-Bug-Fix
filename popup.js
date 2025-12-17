document.addEventListener('DOMContentLoaded', function () {
    const updateButton = document.getElementById('check-update');
    const coffeeButton = document.getElementById('buy-me-coffee'); // 새로 추가된 버튼

    // 1. 업데이트 확인 버튼 클릭 이벤트
    updateButton.addEventListener('click', function() {
        const blogUrl = 'https://smooth-7.tistory.com/7';
        chrome.tabs.create({ url: blogUrl });
        window.close();
    });

    // 2. Buy Me a Coffee 버튼 클릭 이벤트
    coffeeButton.addEventListener('click', function() {
        const coffeeUrl = 'https://buymeacoffee.com/smooth7'; // 후원 링크
        chrome.tabs.create({ url: coffeeUrl });
        window.close();
    });
});