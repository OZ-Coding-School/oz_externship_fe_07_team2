export default {
  extends: ['@commitlint/config-conventional'],
  // feat: 커밋본문 (#이슈번호)
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*): (.+) \(#(\d+)\)$/,
      headerCorrespondence: ['type', 'subject', 'ticket'],
    },
  },
  rules: {
    // type은 항상 소문자여야 합니다.
    'type-case': [2, 'always', 'lower-case'],
    // type은 정해진 목록 중 하나여야 합니다.
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정 또는 문제 해결
        'docs', // 문서 작성 및 수정 (README, 주석 등)
        'style', // 코드 포맷팅, 세미콜론 누락 등 기능 변경 없는 스타일 수정
        'refactor', // 기능 변경 없이 코드 구조 개선
        'test', // 테스트 코드 추가 또는 수정
        'chore', // 기능에 직접 영향 없는 설정, 패키지, 빌드 관련 작업
        'remove', // 사용하지 않는 코드나 파일 제거
        'hotfix', // 운영 중 긴급 버그 수정
        'deprecated', // 더 이상 사용하지 않거나 제거 예정인 코드 처리
        'design', // UI/UX, 퍼블리싱 등 화면 관련 디자인 작업
      ],
    ],
    // subject는 비워둘 수 없습니다.
    'subject-empty': [2, 'never'],
    'subject-case': [0],
    // subject 끝에 마침표를 사용할 수 없습니다.
    'subject-full-stop': [2, 'never', '.'],
    // 본문이 있는 경우, 제목 다음에 한 줄(Blank Line) 띄어야 합니다.
    'body-leading-blank': [1, 'always'],
  },
}
