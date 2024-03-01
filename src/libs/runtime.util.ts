import { isBrowser, isServer } from "@builder.io/qwik/build";

/**
 * 하위 코드들이 브라우저에서 동작하는지 확인
 * - 브라우저에서 동작하지 않는 경우 에러 발생
 * @param errorMessage - 에러 메세지
 */
export function mustOnBrowser(errorMessage?: string) {
  if (!isBrowser) {
    throw new Error(errorMessage || "Must Run On Browser");
  }
}

/**
 * 하위 코드들이 서버에서 동작하는지 확인
 * - 서버에서 동작하지 않는 경우 에러 발생
 * @param errorMessage - 에러 메세지
 */
export function mustOnServer(errorMessage?: string) {
  if (!isServer) {
    throw new Error(errorMessage || "Must Run On Server");
  }
}
