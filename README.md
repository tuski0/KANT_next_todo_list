# Kant Todo List

Next.js와 TypeScript로 만드는 할 일 관리 웹 애플리케이션입니다.
현재는 프로젝트 초기 설정 단계이며, 할 일 관리 기능은 아직 구현되지 않았습니다.

## 기술 스택

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS 4
- ESLint, Prettier

## 시작하기

Node.js 20.9 이상과 npm이 필요합니다.

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.
`app/page.tsx`를 수정하면 개발 화면에 자동으로 반영됩니다.

## 개발 명령어

| 명령어                 | 설명                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | 개발 서버 실행                        |
| `npm run build`        | 배포용 빌드 생성                      |
| `npm start`            | 빌드된 앱 실행 (`npm run build` 이후) |
| `npm run lint`         | ESLint로 코드 검사                    |
| `npm run format`       | Prettier로 코드와 문서 포맷 정리      |
| `npm run format:check` | 파일을 수정하지 않고 포맷 검사        |

## 코드 포맷 규칙

Prettier 설정은 `.prettierrc.json`에서 관리합니다.

- 들여쓰기: 공백 4칸
- 문자열: 큰따옴표 (JSX 포함)
- 세미콜론 사용
- 줄 길이 기준: 80자 (Prettier가 가능한 범위에서 적용)
- 여러 줄 구문에서 허용되는 마지막 쉼표 사용
- 화살표 함수의 매개변수 괄호 항상 사용
- 줄바꿈: LF

ESLint는 코드 품질을 검사하고, Prettier는 포맷을 정리합니다.
`eslint-config-prettier`로 두 도구의 포맷 규칙이 충돌하지 않도록 설정했습니다.
빌드 결과물, 의존성, 잠금 파일, 자동 생성 파일은 포맷 대상에서 제외합니다.

변경 후에는 아래 명령어로 확인합니다.

```bash
npm run format
npm run format:check
npm run lint
```
