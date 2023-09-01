
## version 1.0.1 변경사항
- 캐릭터 탭의 버튼이 작동하지 않는 문제 해결
=======
# Checksheet.link

Checksheet는 온라인 게임 '로스트 아크' 의 **To-do** **SPA** 입니다.

친구들과 게임 이용중에 느낀 불편함을 해소하고자 제작하게 된 프로젝트입니다.

## 제작 배경

![image](https://github.com/laybacksound96/check-project/assets/85489519/92fd3923-2e51-45d7-9e81-e1f024b9172a)

로스트아크는 하나의 계정에 다양한 캐릭터를 육성할 수 있는 게임입니다.

각 캐릭터는 다양한 컨텐츠를 진행할 수 있으며, 진행할 수 있는 컨텐츠의 종류와 개수는 캐릭터마다 다릅니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/25c3851d-74a6-40ac-a292-60ef28b6c60d)


문제는 **캐릭터별 컨텐츠들이 너무 많아 현황을 알기 어렵다는 점**이었습니다.

저와 제 친구들은 **"너 해야할 거 뭐 남았어?"** 를 입에 달고 살아야 했습니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/382c2163-95d4-4316-a785-44d6ac80c792)

## 이렇게 구현했습니다

CheckSheet는 아래의 사진과 같은 문제점을 해결하고자 제작하게 되었습니다.

![image](https://github.com/laybacksound96/check-project/assets/85489519/25c3851d-74a6-40ac-a292-60ef28b6c60d)

![ezgif com-gif-maker](https://github.com/laybacksound96/check-project/assets/85489519/466ab7d8-96af-4d23-9fd3-68b921597d87)

### 기본 구현

본 프로젝트의 대시보드에서는 두 개의 컴포넌트를 렌더링합니다.

상단 컴포넌트는 남아있는 컨텐츠를 표시하고, 하단 컴포넌트는 컨텐츠 수행여부를 체크하는 체크박스입니다.

만들고자 하는 프로젝트를 구현하기 위해서 **하나의 공유되는 전역 상태가 여러 하위 컴포넌트에 전달되는 구조를 구현** 하는 게 좋다고 생각했습니다.

이를 위해 상태관리 라이브러리인 `Recoil` 과 `React hooks` 인 `useEffect`를 사용하였습니다.

체크박스를 클릭할 때마다 `Recoil`의 전역 상태의 `setter` 함수가 호출되어 상태를 변경합니다.

이 때, `useEffect` 훅은 전역 상태를 구독하고있습니다.

따라서 상태가 변경될때마다 전역 상태에 저장된 남아있는 컨텐츠의 개수 등을 계산해서 리렌더링하게 됩니다.


![config_gif](https://github.com/laybacksound96/check-project/assets/85489519/d809d35e-51b0-4cb2-8131-c2e0ced02ff8)

### 데이터 분류와 설정

앞서 언급한 컨텐츠는 같은 컨텐츠라도 단계별, 난이도별로 차이가 있어 구분하고 싶었습니다.

- 컨텐츠별로 단계(이하 '관문')가 있고, 단계의 개수가 다릅니다. 
- 관문은 유저에 의해 두 개의 난이도로 선택될 수 있습니다. ('쉬움' , '어려움')

따라서 같은 컨텐츠라 하더라도 다양한 경우의 수가 나올 수 있습니다.

이 다양한 데이터들을 합산하지 않고 구분할 수 있어야하며 시각적으로도 시인성이 있기를 바랬습니다.

이러한 구현을 위해 **데이터들을 키값으로 분류하여 오브젝트에 저장**하였습니다.

```javascript
  {"컨텐츠A_1관문-쉬움_2관문-어려움" : 
      {색상 : "#....",
       개수 : 3 },
   "컨텐츠A_1관문-어려움_2관문-어려움" : 
      {색상 : "#....",
       개수 : 4 } ,
       ....
  }
```
오브젝트의 key는 중복될 수 없다는 점에 착안해서 구현하였습니다. 

후에 해당 데이터는 다음과 같은 방식으로 변경하였습니다.
```javascript
 
      [{
       KeyName : "컨텐츠A_1관문-쉬움_2관문-어려움" 
       색상 : "#....",
       개수 : 3 },
    
      {
       KeyName : "컨텐츠A_1관문-어려움_2관문-어려움"
       색상 : "#....",
       개수 : 4 } ,
       ....]

```
전자의 방식은 오브젝트의 프로퍼티 접근이 용이하다는 장점이 있었으나, 

중첩 오브젝트를 형성하게 되고 데이터를 수정할 때 얕은 복사를 피하기 위해 스프레드 연산자(Spread operator)를 자주 남용하게 되어 로직의 가독성을 해쳤습니다.

또 하나의 문제가 있었는데,

메모리에 저장하여 테스트를 해오다가 실제 데이터베이스에 자료를 저장하기 위해 스키마를 작성하였습니다. 

그런데 앞선 방법과도 같은 오브젝트 key를 동적할당하는 방식은 스키마로 작성하기 매우 복잡하다는 사실을 알았습니다.

방법이 지나치게 복잡하고 적절한 방법이 아닌 것 같아 아래와 같은 방식으로 변경하였고, 두 가지의 문제 모두 해결하고 잘 이용하고 있습니다.

### 로그인과 인증

![login_gif](https://github.com/laybacksound96/check-project/assets/85489519/7804fa56-1235-436d-9768-f405b568aff7)
- 본 프로젝트는 OAuth2.0 및 [`Discord API`](https://discord.com/developers/applications/1107519062570975293/oauth2/general)를 활용하여 Discord 소셜로그인을 지원합니다.

사용자 인증은 `Json Web Token`을 사용합니다. 

기존에 `Session` 방식의 인증방식을 학습한 적이 있어, `Session` 방식과의 차이가 궁금하여 JWT방식의 인증방식을 학습하여 적용하였습니다. 

JWT로 발급한 Access Token은 체크박스 클릭, 컴포넌트 드래그 등의 유저 정보를 변경하고자 하는 요청에 쓰입니다.

백엔드 서버의 middleware에서 이러한 유효성 검사를 진행하며, 유효한 토큰이 아니거나 토큰이 없을 경우 등의 에러 핸들러를 구현하였습니다.



### UI
![dragNdrop_gif](https://github.com/laybacksound96/check-project/assets/85489519/b19ecc42-9078-4e04-8ceb-78548904e9b9)
- 다양한 요소에 Drag-and-Drop 기능([`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd))을 제공합니다.


### 검색
![search_gif](https://github.com/laybacksound96/check-project/assets/85489519/28aea34a-0c72-4523-b5f3-f08580e5d040)

- 다른 유저를 검색할 수 있으며, 실시간 자동완성기능이 있습니다.
- 이 기능은 [다른 검색기능이 있는 웹사이트](https://www.op.gg/)의 검색 방식을 클로닝하였습니다.

해당 기능의 로직을 파악하기 위해 해당 웹사이트에서 개발자도구로 네트워크통신을 검사했습니다. 

input박스에서 입력을 마치고 약 1초가 지나야 요청을 하는 것을 확인하였고, 이 아이디어를 응용하여 프로젝트에 적용했습니다.

#### 겪은 문제

해당 검색기능을 구현한 뒤 배포단계에서 사용자들의 사용방식을 관찰한 결과 잘 동작하지 않았음을 알게되었습니다.

유저들이 검색이 끝날 때 까지 기다리지 않는다는 것이었습니다.

이러한 문제를 해결하고자 다음과 같은 방법을 적용하였습니다. 

`1. DB 검색 쿼리의 속도를 향상시킴`

`2. 통신중에 (...) 등의 '검색 중'을 표현하는 아이콘을 표시하여 유저에게 기다릴 수 있게 하기`

1번의 개선방법으로는 DB의 지역 설정을 미국에서 서울로 바꿈으로서 해결하였습니다. 프로젝트의 DB는 MongoDB Atlas로 Cloud DB였습니다.
2번은 현재 개발진행중에 있습니다.




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


![image](https://github.com/laybacksound96/check-project/assets/85489519/42665213-02dd-4383-9205-b76cdcdaab78)

위 사진은 파싱된 `text` 레이블의 데이터 구조를 묘사한 것입니다.

`text`는 프론트페이지에서 전역 state(Recoil Atom)으로서 UI를 렌더링하기위해 사용됩니다.

### 이러한 방식을 사용한 이유

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
 