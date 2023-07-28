
![image](https://github.com/laybacksound96/check-project/assets/85489519/6c3514bd-a6e1-4ec2-8688-9cade7da415d)
<h1 align="center"><a href="https://www.checksheet.link/">Checksheet.link</a></h1>

<div align="center">

온라인 게임 **로스트아크**의 **To-do** [`React`](https://facebook.github.io/react/) **SPA**

로스트아크엔 주에 한 회씩 할 수 있는 다양한 컨텐츠들이 있습니다.<br/>
이러한 컨텐츠들의 현황을 일목요연하게 보여주는 앱입니다.

</div>
 

## 제작 배경

![image](https://github.com/laybacksound96/check-project/assets/85489519/92fd3923-2e51-45d7-9e81-e1f024b9172a)

로스트아크는 하나의 계정에 다양한 캐릭터를 육성할 수 있는 게임입니다.

각 캐릭터는 다양한 컨텐츠를 진행할 수 있으며, 진행할 수 있는 컨텐츠의 종류와 개수는 캐릭터마다 다릅니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/521322e8-e21b-4bf6-a3e7-155981b6b59d)

문제는 **캐릭터별 컨텐츠들이 너무 많아, 어떤 컨텐츠를 얼마나 진행했는지 알기 어렵다는 점**이었습니다.

저와 제 친구들은 **"너 해야할 거 뭐 남았어?"** 를 입에 달고 살아야 했습니다.

CheckSheet는 이러한 문제를 해결하고자 제작하게 되었습니다.

## Checksheet는 다음과 같은 기능을 제공합니다

### 로그인
![login_gif](https://github.com/laybacksound96/check-project/assets/85489519/7804fa56-1235-436d-9768-f405b568aff7)
- OAuth2.0와 [`Discord API`](https://discord.com/developers/applications/1107519062570975293/oauth2/general)를 활용하여 Discord 소셜로그인을 지원합니다.

### UI
![dragNdrop_gif](https://github.com/laybacksound96/check-project/assets/85489519/b19ecc42-9078-4e04-8ceb-78548904e9b9)
- 다양한 요소에 Drag-and-Drop 기능([`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd))을 제공합니다 

![click](https://github.com/laybacksound96/check-project/assets/85489519/96a67aca-b18b-425e-bb0b-a32c1465811e)

- 남아있는 할 일의 개수를 확인합니다. 

![config_gif](https://github.com/laybacksound96/check-project/assets/85489519/d809d35e-51b0-4cb2-8131-c2e0ced02ff8)
- 할 일에 대한 세부적인 기능을 설정할 수 있는 모달들을 구현하였습니다.
- 설정값에 따라 할 일들의 색상을 바꿔 높은 시인성을 추구하였습니다.

### 검색
![search_gif](https://github.com/laybacksound96/check-project/assets/85489519/28aea34a-0c72-4523-b5f3-f08580e5d040)

- 다른 유저를 검색할 수 있으며, 실시간 자동완성기능이 있습니다.
- 이 기능은 [op.gg](https://www.op.gg/)의 검색 방식을 클로닝하였습니다.

## 프로젝트에 사용된 기술스택 및 의존성

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"></br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  - react-router-dom
  - recoil
  - styled-components

## 프로젝트 구성도
