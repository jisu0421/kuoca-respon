$(function(){
    const $frame = $("#basic");
    const $wrap = $frame.parent();
    $frame.sly({
        horizontal: 1, // 0: 세로슬라이드
        itemNav: "basic", // 순차적으로 진행
        smart: 1, // 자동으로 현재 위치에 맞게 스크롤 보정
        activateOn: "click", // 클릭하면 해당 아이템 활성화 (.active 클래스 붙음)
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1, //드래그 놓았을 때 효과 (툭 밀리는 느낌)
        startAt: 0, // 시작 아이템 index (0부터 시작
        scrollBy: 1, // 한 번 이동할 때 몇 개 아이템 이동할지
        //pagesBar: $wrap.find(".pages"),
        //activatePageOn: "click",
        speed: 300, //300ms
        elasticBounds: 1, //끝에서 살짝 튕기는 ㅎ과
        dragHandle: 1 //스크롤바 핸들 드래그 가능
    });
});


