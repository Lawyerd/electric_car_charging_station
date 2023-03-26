# 전기차 충전소 현황 웹 어플리케이션

이 어플리케이션은 한국 공공데이터포털에서 제공하는 실시간 전기차 충전소 데이터를 API를 통해 받아와서 Naver Map API를 사용하여 전기차 충전소 현황을 보여주는 웹 어플리케이션입니다.

## 기술 스택

- React
- Bootstrap
- Axios
- Naver Map API
- React Router DOM
- Multiselect React Dropdown
## 설치 방법

1. Git 저장소를 클론합니다.
```bash
Copy code
git clone https://github.com/Lawyerd/electric_car_charging_station
```
2. 프로젝트 폴더로 이동하여 필요한 패키지들을 설치합니다.
```bash
Copy code
cd https://github.com/Lawyerd/electric_car_charging_station
npm install
```
3. .env 파일을 생성하고 Naver Map API 키를 등록합니다.
```css
REACT_APP_NAVER_MAP_API_KEY=[YOUR_NAVER_MAP_API_KEY]
```
4. 어플리케이션을 실행합니다.
```sql
Copy code
npm start
```
## 기능

- 지도에서 충전소 위치 확인
- 상세 정보 보기
- 지역별, 충전기 종류별 검색
## 데이터 출처

한국 공공데이터포털 - 전국 전기차 충전소 정보

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. 자세한 내용은 LICENSE 파일을 확인하세요.
