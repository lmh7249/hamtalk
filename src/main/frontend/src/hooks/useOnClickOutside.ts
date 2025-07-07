import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

// 이전과 시그니처가 미세하게 다릅니다.
// RefObject<any>를 사용해서 어떤 종류의 ref든 일단 받도록 하고,
// 내부에서 타입 가드를 통해 안전하게 처리합니다.
function useOnClickOutside(
    refs: RefObject<any>[],
    handler: (event: AnyEvent) => void
) {
    useEffect(() => {
        const listener = (event: AnyEvent) => {
            const target = event.target as Node;

            // .some() 메서드로 refs 배열을 순회
            const isClickInside = refs.some(ref => {
                // ❗️ 여기가 핵심: ref.current가 존재하고, 동시에 contains 메서드를 가진 요소인지 한번 더 확인 (타입 가드)
                const el = ref.current;
                return el && typeof el.contains === 'function' && el.contains(target);
            });

            if (isClickInside) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [refs, handler]);
}

export default useOnClickOutside;