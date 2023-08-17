# Checksheet.link

Checksheet는 온라인 게임 '로스트 아크' 의 **To-do** **SPA** 입니다.

친구들과 게임 이용중에 느낀 불편함을 해소하고자 제작하게 된 프로젝트입니다.

## 제작 배경

![image](https://github.com/laybacksound96/check-project/assets/85489519/92fd3923-2e51-45d7-9e81-e1f024b9172a)

로스트아크는 하나의 계정에 다양한 캐릭터를 육성할 수 있는 게임입니다.

각 캐릭터는 다양한 컨텐츠를 진행할 수 있으며, 진행할 수 있는 컨텐츠의 종류와 개수는 캐릭터마다 다릅니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/25c3851d-74a6-40ac-a292-60ef28b6c60d)


문제는 **캐릭터별 컨텐츠들이 너무 많아, 어떤 컨텐츠를 얼마나 진행했는지 알기 어렵다는 점**이었습니다.

저와 제 친구들은 **"너 해야할 거 뭐 남았어?"** 를 입에 달고 살아야 했습니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/382c2163-95d4-4316-a785-44d6ac80c792)

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

### Frontend
![Typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  - react-router-dom v6
  - recoil
  - styled-components
  - react-beautiful-dnd

### Backend
![nodedotjs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)

![mongodb](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Infra

![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![amazonaws](https://img.shields.io/badge/amazon_aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
  - AWS EC2
  - Route 53 & ALB


## 프로젝트 구성도
![image](https://github.com/laybacksound96/check-project/assets/85489519/d6d82888-5b5a-4dd0-9733-d0bce2dc95f6)

## 데이터베이스 다이어그램
![image](https://github.com/laybacksound96/check-project/assets/85489519/9a2fcadf-bae5-454c-b0e1-3b1ec2b70b10)

`data.text`는 실제로는 string으로 저장되어 있습니다.

프론트페이지에서 `text`가 호출될 때 json으로 파싱됩니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/42665213-02dd-4383-9205-b76cdcdaab78)

위 사진은 파싱된 `text` 레이블의 데이터 구조를 묘사한 것입니다.

`text`는 프론트페이지에서 전역 state(Recoil Atom)으로서 UI를 렌더링하기위해 사용됩니다.

### 이러한 방식을 사용한 이유

위에서 언급했듯이, `data`의 `text` 레이블은 json 객체를 string으로 변환하여 저장한 것입니다.

이러한 방식으로 자료를 저장한 이유는 `text` 객체가 **수정이 매우 많이 일어나는 자료이기 때문**입니다.

유저가 체크박스에 클릭을 할 때마다, 혹은 **설정을 변경할 때마다 서버api를 호출하는 방식은 효율적이지 못하다고 생각했습니다**.

이 객체는 프론트페이지에서 전역 state로서 존재하다가, 상태가 변경되면 일정시간 뒤에 서버에 전송되어 db에 저장됩니다.

따라서 유저가 정보를 여러차례 수정하여도 가장 마지막 상태만 서버에 전송되므로 10~100회의 수많은 호출을 1회로 줄일 수 있었습니다.

![sync_gif](https://github.com/laybacksound96/check-project/assets/85489519/a4d96d3d-336e-4265-a4e1-adc79850c6c0)

위 사진은 상태변화 감지 후 일정 시간이 지나 서버와 통신을 하는 페이지의 모습입니다.

fetch의 상태를 표시하는 ui도 삽입하여 유저에게 db에 저장이 되었는지도 표현하고 싶었습니다.

## 프로젝트 주안점(목표)

**1. 프로젝트를 처음부터 끝까지 해본 경험 가져보기**

    - 프론트페이지 코드작성, 백엔드 서버구현, 배포까지 전부 직접 해보고 싶었습니다.
     
**2. 문서화를 통한 프로젝트 관리경험 가져보기**

    - 체계적인 프로젝트 관리를 해보고 싶었습니다.
    - 처음에는 Notion을 사용하여 각종 이슈관리를 하였고, 현재는 github 레포가 제공하는 issue탭을 사용하고 있습니다.
    
**3. 시인성과 유저 편의성을 중요하게 고려하기**

    - 실제로 타인에게 사용되기 위해 제작된 웹앱이기 때문에 ui/ux를 중요하게 생각하였습니다.
    - 아이콘, 색 등의 다양한 요소를 활용하여 페이지가 난잡하지 않게끔 구성하려 노력하였습니다.
 
