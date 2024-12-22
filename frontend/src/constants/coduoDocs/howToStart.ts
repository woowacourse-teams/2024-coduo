const HOW_TO_START = [
  {
    id: 'coduo-guide',
    title: '코딩해듀오 사용가이드',
    content: `코딩해듀오 문서에 오신 것을 환영합니다! 
            코딩해듀오는 페어 프로그래밍을 처음 접하는 사용자가 페어프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다. 
            여기에서는 코딩해듀오를 어떻게 시작할 수 있는지 소개합니다.`,
    images: [
      {
        title: '1. 방 생성하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855075/coduo-start.webp',
        alt: 'create-room',
        info: '가장 먼저 방을 생성해주세요. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다',
      },
    ],
  },
  {
    id: 'start-mission',
    subtitle: '미션과 함께 시작하기',
    content: `코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.`,
    quote: {
      href: 'https://github.com/coduo-missions',
      linkText: '미션 레포지토리로 이동',
      text: '미션 레포지토리에서 미션을 미리 확인해 보세요.',
    },
    images: [
      {
        title: '1. 미션과 함께 시작하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/start-with-mission.webp',
        id: 'start-with-mission',
      },
      {
        title: '2. 미션 확인하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/select-mission.webp',
        id: 'select-mission',
        info: `레포지토리로 이동 버튼을 클릭하면 해당하는 미션의 레포지토리로 이동합니다. 확인 후 원하는 미션 버튼을 클릭해주세요.`,
      },
      {
        title: '3. 브랜치 생성하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/create-branch.webp',
        id: 'create-branch',
        info: `미션 버튼 클릭 시 브랜치 이름을 입력 할 수 있습니다. 자신의 깃허브 ID로 브랜치 이름을 입력하고 브랜치 생성하기 버튼을 클릭해주세요.`,
      },
      {
        title: '4. 생성한 브랜치 확인하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/check-branch.webp',
        id: 'check-branch-created',
        info: `미션 레포지토리에서 자신의 브랜치가 생성되었는지 확인해주세요.`,
      },
      {
        title: '5. fork 하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734858436/create-fork.png',
        id: 'fork-repository',
        info: `상단의 fork 버튼을 눌러 해당 미션을 자신의 레포지토리로 fork 해주세요.`,
      },
      {
        title: '6. 레포지토리 주소 복사하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/copy-code.webp',
        id: 'copy-repository-address',
        info: `fork 해 온 레포지토리 주소를 복사해주세요.`,
      },
      {
        title: '7. 로컬에 clone 하기',
        id: 'clone-in-local',
        info: `
        cd 명령어를 통해 원하는 폴더로 이동 후 레포지토리를 클론하고, 본인이 사용하는 통합 개발 환경(IDE)으로 열어 미션을 시작합니다.`,
        sourceCode: [` cd {이동할 폴더 이름}`, `git clone {복사한 레포지토리 주소}`, ` code {실행할 파일 이름}`],
      },
    ],
  },
  {
    id: 'start-free',
    subtitle: '자유롭게 시작하기',
    images: [
      {
        title: '1. 미션 없이 시작하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/start-free.webp',
        id: 'start-without-mission',
        info: "'그냥 시작할래요' 버튼을 누르면 미션 없이 자유롭게 시작할 수 있습니다.",
      },
      {
        title: '2. 이름 입력하기 ',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/link-pair.webp',
        id: 'link-pair',
        info: '사용할 이름을 입력해 줍니다. 페어 정보 연동하기 버튼을 누르면 코딩해듀오에 가입 되어 있는 페어의 아이디를 연동할 수 있습니다.',
      },
      {
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/input-pair-name.webp',
        id: 'input-pair-name',
        info: '연동 없이 시작할 경우, 사용할 페어 이름을 입력해 줍니다.',
      },
      {
        title: '3. 역할 정하기',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/select-role.webp',
        id: 'select-role',
        info: '페어와 논의하여 드라이버와 네비게이터를 정해줍니다. 관련 내용은 설명을 참고해 주세요.',
      },
      {
        title: '4. 타이머 설정하기',
        id: 'set-timer',
        src: 'https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734869420/set-timer.webp',
        info: '페어프로그래밍을 진행 할 시간을 정해주세요. 버튼을 클릭하거나 "직접 설정"을 통해 임의로 정할 수 있습니다.',
      },
    ],
  },
];

export { HOW_TO_START };
