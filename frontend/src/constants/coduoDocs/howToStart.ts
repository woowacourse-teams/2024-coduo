export const CREATE_PAIR_ROOM_STEPS = [
  {
    id: 'create-room',
    title: '1. 방 생성하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855075/coduo-start.webp',
    info: '가장 먼저 방을 생성해주세요. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다',
  },
];

export const MISSION_START_STEPS = [
  {
    id: 'start-with-mission',
    title: '1. 미션과 함께 시작하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/start-with-mission.webp',
    info: "'미션과 함께 시작할래요' 버튼을 누르면 미션과 함께 페어 프로그래밍을 시작할 수 있습니다.",
  },
  {
    id: 'select-mission',
    title: '2. 미션 확인하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/select-mission.webp',
    info: `'레포지토리로 이동하기' 버튼을 클릭하면 미션 레포지토리를 확인할 수 있습니다. 확인 후 원하는 미션 버튼을 클릭해 주세요.`,
  },
  {
    id: 'create-branch',
    title: '3. 브랜치 생성하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/create-branch.webp',
    info: `미션 버튼을 클릭하면 사용할 브랜치를 생성할 수 있습니다. 자신의 깃허브 ID로 브랜치 이름을 입력하고 '브랜치 생성하기' 버튼을 클릭해 주세요.`,
  },
  {
    id: 'check-branch-created',
    title: '4. 생성한 브랜치 확인하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/check-branch.webp',
    info: `미션 레포지토리에서 브랜치가 생성되었는지 확인해 주세요.`,
  },
  {
    id: 'fork-repository',
    title: '5. 미션 레포지토리 fork 하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734858436/create-fork.png',
    info: `상단의 fork 버튼을 눌러 미션 레포지토리를 자신의 레포지토리로 fork 해 주세요.`,
  },
  {
    id: 'copy-repository-address',
    title: '6. 레포지토리 주소 복사하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/copy-code.webp',
    info: `fork 한 레포지토리 주소를 복사해주세요.`,
  },
  {
    id: 'clone-in-local',
    title: '7. 로컬에 clone 하기',
    info: `
    cd 명령어를 통해 원하는 폴더로 이동 후 레포지토리를 clone하고, 본인이 사용하는 통합 개발 환경(IDE)으로 열어 미션을 시작합니다.`,
    sourceCode: [` cd {이동할 폴더 이름}`, `git clone {복사한 레포지토리 주소}`, ` code {실행할 파일 이름}`],
  },
];

export const FREE_START_STEPS = [
  {
    id: 'start-without-mission',
    title: '1. 미션 없이 시작하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/start-free.webp',
    info: "'그냥 시작할래요' 버튼을 누르면 미션 없이 자유롭게 시작할 수 있습니다.",
  },
  {
    id: 'input-pair-name',
    title: '2. 이름 입력하기 ',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/link-pair.webp',
    info: "사용할 이름을 입력해 줍니다. '페어 정보 연동하기' 버튼을 누르면 코딩해듀오에 가입 되어 있는 페어의 아이디를 연동할 수 있습니다.",
  },
  {
    id: 'input-pair-name',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/input-pair-name.webp',
    info: '연동 없이 시작할 경우, 사용할 페어 이름을 입력해 줍니다.',
  },
  {
    id: 'select-role',
    title: '3. 역할 정하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/select-role.webp',
    info: '페어와 논의하여 드라이버와 내비게이터를 정해줍니다. 관련 내용은 설명을 참고해 주세요.',
  },
  {
    id: 'set-timer',
    title: '4. 타이머 설정하기',
    src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734869420/set-timer.webp',
    info: "페어 프로그래밍을 진행 할 시간을 정해주세요. 버튼을 클릭하거나 '직접 설정 버튼' 을 통해 자유롭게 정할 수 있습니다.",
  },
];
