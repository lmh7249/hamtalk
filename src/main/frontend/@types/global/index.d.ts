//TODO: 아래 코드들은 ts에게 어떤 타입인지 모르지만 사용해도 괜찮다고 알려주는 것. 만약 작성하지 않으면 ts 컴파일 에러.

declare module '*.png';
declare module '*.gif';
declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '*.jpg';
declare module 'sockjs-client';