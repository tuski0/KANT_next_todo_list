# Kant Todo List

Next.js와 TypeScript로 만드는 회원 전용 할 일 관리 웹 애플리케이션입니다.
Supabase로 회원가입·로그인과 할 일 데이터를 관리합니다.

- **배포 주소**: https://kant-next-todo-list-dvx8.vercel.app/
- **저장소**: https://github.com/tuski0/KANT_next_todo_list

## 주요 기능

- 회원가입 / 로그인 / 로그아웃 (Supabase Auth)
- 로그인하지 않은 사용자는 `/login`으로 이동 (`proxy.ts`)
- 할 일 등록 · 완료 체크 · 삭제 (완료·삭제는 `useOptimistic`으로 즉시 반영)
- 할 일 상세 페이지(`/todo/[id]`)에서 수정
- 카테고리 추가 및 색상 표시
- 로딩(Suspense 스켈레톤) · 오류(`error.tsx`) · 빈 목록 · 없는 할 일(`not-found.tsx`) 화면

## 기술 스택

- Next.js 16 (App Router, Cache Components)
- React 19, TypeScript
- Tailwind CSS 4
- Supabase (Auth, PostgreSQL + RLS)
- ESLint, Prettier

## 폴더 구조

```
app/
├── (auth)/join, (auth)/login   # 회원가입·로그인 페이지
├── todo/[id]/                  # 할 일 상세(동적 라우트) + not-found
├── page.tsx                    # 메인: 서버에서 조회 → 클라이언트 컴포넌트에 Props 전달
├── error.tsx                   # 에러 바운더리
├── domains/
│   ├── auth/  {actions, components, queries, types, utils}
│   └── todo/  {actions, components, queries, types, utils}
└── shared/    {components, lib, types}
```

## 렌더링 방식

- **서버 컴포넌트**: `page.tsx`, 상세 페이지, Header. 쿠키(로그인 정보)로 Supabase를 조회해서
  브라우저로 키나 쿼리를 보내지 않고, 첫 화면에 데이터가 포함된 HTML을 내려줍니다.
- **클라이언트 컴포넌트**: 입력 폼, 목록, 상세 수정 폼. `useActionState`, `useOptimistic` 같은
  상호작용이 필요한 부분만 `"use client"`로 분리했습니다.
- 데이터 조회 부분은 `<Suspense>`로 감싸서 헤더 같은 정적인 부분을 먼저 보여주고
  데이터는 준비되는 대로 스트리밍합니다.

## 환경 변수

`.env.local`(배포 시 Vercel 환경 변수)에 아래 값을 설정합니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## Supabase 테이블

| 테이블      | 컬럼                                                  |
| ----------- | ----------------------------------------------------- |
| `profiles`  | id, name, email, deletedAt ...                        |
| `todo_list` | id, user_id, title, memo, date, category_id, is_check |
| `category`  | id, user_id, title, color                             |

모든 테이블은 RLS를 켜고 `auth.uid() = user_id` 정책으로 본인 데이터만 접근할 수 있습니다.

## 시작하기

Node.js 20.9 이상과 npm이 필요합니다.

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

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
