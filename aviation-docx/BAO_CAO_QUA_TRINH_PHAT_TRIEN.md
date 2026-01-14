# BAO CAO QUA TRINH PHAT TRIEN HE THONG MO PHONG RADAR ATC

## MUC LUC

1. Tong quan du an
2. Cong nghe su dung
3. Kien truc he thong
4. Quy trinh phat trien tu tung buoc
5. Cac thuat toan va cong thuc tinh toan
6. Cach chay va trien khai ung dung
7. Cac tinh nang chinh
8. Ket luan

---

## 1. TONG QUAN DU AN

### 1.1. Muc dich

He thong mo phong huan luyen Kiem soat Khong luu (ATC - Air Traffic Control) su dung radar duoc xay dung nham ho tro sinh vien Hoc vien Hang khong Viet Nam hoc thuc hanh Kiem soat Duong dai co he thong giam sat (ACC Radar) tu xa, tai nha hoac bat cu dau ma khong can phai len truong. Dieu nay giup:

- Giam thieu tan suat su dung phong thuc hanh
- May moc thiet bi co them thoi gian nghi, khong bi qua tai
- Sinh vien co the luyen tap nhieu hon
- Cai thien thuat ngu va phat am thong qua phan hoi bang giong noi AI
- Luu lai video co am thanh de sinh vien xem lai va tu danh gia

### 1.2. Chuc nang chinh

- Hien thi radar thoi gian thuc voi theo doi may bay
- Nhan dien giong noi cho cac lenh ATC
- Giam sat phan cach va phat hien xung dot
- Phat lai phien va lich su huan luyen
- Phan tich cac lenh (D120, C90, IS250, RM0.78, v.v.)
- He thong phan hoi bang am thanh
- Ho tro nhieu nguoi dung voi xac thuc
- Phan tich hieu suat huan luyen

---

## 2. CONG NGHE SU DUNG

### 2.1. Frontend (Giao dien nguoi dung)

**Next.js 14+**
- Framework React hien dai ho tro Server-Side Rendering (SSR)
- Routing tu dong dua tren cau truc thu muc
- Toi uu hoa hinh anh va tai nguyen
- Ho tro API Routes cho backend endpoints

**React 18**
- Thu vien xay dung giao dien nguoi dung thanh cac component tai su dung
- Virtual DOM giup render nhanh va hieu qua
- Hooks (useState, useEffect) de quan ly trang thai

**TypeScript**
- Ngon ngu lap trinh co kieu du lieu tinh
- Phat hien loi trong qua trinh phat trien
- Auto-completion tot hon trong IDE
- Code de bao tri va mo rong hon

**Tailwind CSS**
- Framework CSS tien ich giup styling nhanh chong
- Responsive design de ho tro nhieu kich thuoc man hinh
- Custom styling voi cac class tien ich

**Konva.js & React-Konva**
- Thu vien ve canvas HTML5 hieu nang cao
- Ve cac phan tu radar: may bay, waypoint, duong bay
- Ho tro animation va tuong tac (drag, zoom, rotate)
- Render hang tram doi tuong dong thoi ma khong lag

**Zustand**
- Thu vien quan ly trang thai (state management) nhe va don gian
- Luu tru trang thai cua may bay, UI settings
- Khong phuc tap nhu Redux nhung van manh me

**Web Speech API**
- API nhan dien giong noi tich hop san trong trinh duyet
- Chuyen giong noi thanh van ban (speech-to-text)
- Ho tro phat am chuan ICAO cho ATC

**Socket.IO Client**
- Thu vien giao tiep realtime giua client va server
- Nhan cap nhat trang thai may bay lien tuc
- Xu ly cac su kien: aircraft:update, separation:violation, v.v.

### 2.2. Backend (May chu xu ly)

**Node.js**
- Moi truong chay JavaScript phia server
- Non-blocking I/O giup xu ly nhieu ket noi dong thoi
- Sinh thai thu vien lon (npm)

**Express.js**
- Framework web nhe cho Node.js
- Tao API endpoints de frontend goi
- Middleware ho tro CORS, authentication

**TypeScript**
- Tuong tu frontend, giup backend co kieu du lieu chat che
- Giam loi runtime

**Socket.IO Server**
- Xu ly ket noi WebSocket cho giao tiep realtime
- Phat (emit) trang thai may bay moi 1 giay
- Kiem tra phan cach giua cac may bay moi 2 giay

**Prisma ORM**
- Cong cu truy van co so du lieu (Object-Relational Mapping)
- Tao schema va migration tu dong
- Type-safe queries voi TypeScript

**PostgreSQL**
- He quan tri co so du lieu quan he
- Luu tru thong tin nguoi dung, lich su phien tap, bai tap

**JWT (JSON Web Token)**
- Xac thuc nguoi dung khong trang thai (stateless)
- Token chua thong tin nguoi dung da ma hoa
- Bao mat API endpoints

### 2.3. Shared Package (Goi chia se)

**Shared Types**
- Dinh nghia cac kieu du lieu chung cho ca frontend va backend
- AircraftData, ParsedCommand, Waypoint, Route, v.v.
- Dam bao dong bo giua client va server

**Shared Utilities**
- Cac ham tien ich: tinh khoang cach, bearing, toa do
- Parser lenh ATC (manual va voice)
- Validation du lieu

---

## 3. KIEN TRUC HE THONG

### 3.1. So do kien truc tong quat

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Next.js    │  │  React       │  │  Konva.js    │       │
│  │  Routing    │  │  Components  │  │  Canvas      │       │
│  └─────────────┘  └──────────────┘  └──────────────┘       │
│         │                │                   │               │
│         └────────────────┴───────────────────┘               │
│                         │                                    │
│                  ┌──────▼──────┐                            │
│                  │   Zustand   │                            │
│                  │    Store    │                            │
│                  └──────┬──────┘                            │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ Socket.IO / HTTP
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                        Backend                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Express    │  │  Socket.IO   │  │ Simulation   │       │
│  │  API        │  │  Server      │  │  Engine      │       │
│  └─────────────┘  └──────────────┘  └──────────────┘       │
│         │                │                   │               │
│         └────────────────┴───────────────────┘               │
│                         │                                    │
│                  ┌──────▼──────┐                            │
│                  │   Prisma    │                            │
│                  │    ORM      │                            │
│                  └──────┬──────┘                            │
└─────────────────────────┼────────────────────────────────────┘
                          │
                  ┌───────▼────────┐
                  │  PostgreSQL    │
                  │   Database     │
                  └────────────────┘
```

### 3.2. Luong du lieu (Data Flow)

1. **Frontend khoi tao ket noi:**
   - Nguoi dung truy cap website
   - Next.js render giao dien
   - Socket.IO client ket noi den server
   - Zustand store khoi tao trang thai

2. **Backend xu ly:**
   - Socket.IO server nhan ket noi
   - Simulation Engine bat dau chay
   - Cap nhat vi tri may bay moi 1 giay
   - Kiem tra phan cach moi 2 giay

3. **Realtime updates:**
   - Backend emit event `aircraft:update`
   - Frontend nhan event qua Socket.IO
   - Zustand store cap nhat trang thai
   - React re-render component
   - Konva ve lai canvas

4. **Xu ly lenh:**
   - Nguoi dung noi hoac go lenh
   - Parser phan tich lenh
   - Gui lenh len backend qua Socket.IO
   - Simulation Engine thuc thi lenh
   - Cap nhat trang thai may bay

---

## 4. QUY TRINH PHAT TRIEN TU TUNG BUOC

### 4.1. Buoc 1: Thiet ke va lap ke hoach

**1.1. Phan tich yeu cau**
- Doc tai lieu yeu cau (Project Requirements.md)
- Hieu ro cac chuc nang can thiet:
  - Hien thi radar voi may bay, waypoint, duong bay
  - Nhan lenh tu nguoi dung (voice va manual)
  - Tinh toan vi tri may bay theo thoi gian thuc
  - Phat hien xung dot va canh bao

**1.2. Thiet ke co so du lieu**
- Tao schema Prisma:
  - Bang User: luu thong tin nguoi dung
  - Bang Session: luu phien luyen tap
  - Bang Exercise: luu bai tap
  - Bang Command: luu lich su lenh

**1.3. Thiet ke API**
- Dinh nghia cac endpoint REST:
  - POST /api/auth/login
  - POST /api/auth/register
  - GET /api/exercises
  - GET /api/sessions/:id

- Dinh nghia cac Socket events:
  - aircraft:update
  - aircraft:add
  - aircraft:remove
  - separation:violation
  - separation:warning
  - command:execute

### 4.2. Buoc 2: Thiet lap du an (Project Setup)

**2.1. Tao cau truc thu muc**
```
atc-radar-sim/
├── frontend/          # Next.js app
├── backend/           # Express server
├── shared/            # Shared types & utils
└── package.json       # Root workspace config
```

**2.2. Cai dat dependencies**
```bash
# Tai thu muc root
npm install

# Tai thu muc shared
cd shared
npm install
npm run build

# Tai thu muc backend
cd ../backend
npm install

# Tai thu muc frontend
cd ../frontend
npm install
```

**2.3. Cau hinh TypeScript**
- Tao tsconfig.json cho moi package
- Cau hinh compiler options
- Thiet lap path aliases

### 4.3. Buoc 3: Phat trien Backend

**3.1. Tao Simulation Engine**

File: `backend/src/simulation/engine.ts`

Chuc nang chinh:
- Luu danh sach cac may bay (Map<string, AircraftData>)
- Cap nhat vi tri may bay moi giay:
  - Tinh vi tri moi dua tren toc do va huong
  - Cap nhat do cao neu dang len/xuong
  - Cap nhat huong neu co lenh thay doi huong
  - Cap nhat toc do neu co lenh thay doi toc do
- Kiem tra phan cach giua cac may bay
- Thuc thi lenh tu nguoi dung

**3.2. Xu ly Socket.IO**

File: `backend/src/socket/handlers.ts`

Chuc nang:
- Lang nghe cac event tu client
- Xu ly lenh tu nguoi dung
- Emit trang thai may bay ra client
- Emit canh bao phan cach

**3.3. Tao API endpoints**

File: `backend/src/index.ts`

- Khoi tao Express server
- Ket noi database
- Thiet lap middleware (CORS, auth)
- Tao cac route

### 4.4. Buoc 4: Phat trien Shared Package

**4.1. Dinh nghia Types**

File: `shared/src/types/aircraft.ts`

```typescript
interface AircraftData {
  id: string;
  callsign: string;
  position: {
    latitude: number;
    longitude: number;
    altitude: number;
    timestamp: Date;
  };
  heading: number;
  speed: number;
  machNumber: number;
  flightLevel: number;
  // ... cac truong khac
}
```

**4.2. Tao cac ham tien ich**

File: `shared/src/utils/coordinates.ts`

Cac ham tinh toan toa do:
- `calculateDistance()`: Tinh khoang cach giua 2 diem
- `calculateBearing()`: Tinh huong tu diem A den diem B
- `calculateDestination()`: Tinh diem moi sau khi di chuyen
- `latLngToScreen()`: Chuyen toa do WGS84 sang toa do man hinh
- `screenToLatLng()`: Chuyen toa do man hinh sang WGS84

**4.3. Tao parser lenh**

File: `shared/src/utils/parser.ts`

Cac ham phan tich lenh:
- `parseManualCommand()`: Phan tich lenh go tay (D120, C90, v.v.)
- `parseVoiceCommand()`: Phan tich lenh giong noi
- `formatCommand()`: Dinh dang lenh de hien thi

### 4.5. Buoc 5: Phat trien Frontend

**5.1. Tao cau truc component**

```
components/
├── RadarDisplay.tsx      # Man hinh radar chinh
├── AircraftList.tsx      # Danh sach may bay
├── CommandPanel.tsx      # Bang nhap lenh
├── ExerciseSelector.tsx  # Chon bai tap
└── Navbar.tsx            # Thanh dieu huong
```

**5.2. Tao State Management**

File: `frontend/lib/store/aircraft-store.ts`

Su dung Zustand:
```typescript
interface AircraftStore {
  aircraft: AircraftData[];
  selectedAircraftId: string | null;
  updateAircraft: (aircraft: AircraftData) => void;
  selectAircraft: (id: string) => void;
  // ... cac ham khac
}
```

**5.3. Tao RadarDisplay component**

File: `frontend/components/RadarDisplay.tsx`

Chuc nang:
- Ve background radar (mau xanh dam)
- Ve luoi (grid) neu bat
- Ve cac duong bay (airway routes)
- Ve cac waypoint (tam giac rong)
- Ve cac may bay (hinh vuong + nhan + duong huong)
- Xu ly tuong tac: zoom, pan, do khoang cach
- Cap nhat lien tuc khi nhan du lieu tu Socket.IO

**5.4. Tich hop Voice Recognition**

File: `frontend/hooks/useVoiceCommand.ts`

Su dung Web Speech API:
- Kiem tra ho tro trinh duyet
- Khoi tao SpeechRecognition
- Lang nghe giong noi nguoi dung
- Phan tich thanh lenh ATC
- Gui lenh len backend

**5.5. Xu ly Socket.IO client**

File: `frontend/lib/socket.ts`

- Ket noi den backend
- Lang nghe cac event
- Emit cac lenh
- Xu ly reconnection

### 4.6. Buoc 6: Tich hop du lieu thuc te

**6.1. Nhap du lieu waypoint**

File: `shared/src/data/waypoints.ts`

- Chuyen doi toa do tu dinh dang DDMMSS sang Decimal Degrees
- Luu danh sach waypoint voi toa do WGS84
- Dinh nghia cac airway routes

**6.2. Tao cac bai tap**

File: `shared/src/data/exercises.ts`

- Exercise 1: 9 may bay
- Exercise 2: 10 may bay
- Moi may bay co: callsign, route, speed, altitude, thoi gian xuat hien

### 4.7. Buoc 7: Toi uu hoa va debug

**7.1. Toi uu hoa hieu nang**
- Giam so lan re-render cua React
- Su dung React.memo cho cac component
- Toi uu hoa canvas rendering
- Throttle/debounce cac event handler

**7.2. Xu ly loi**
- Try-catch cho cac ham tinh toan
- Validation du lieu nguoi nhap
- Xu ly truong hop mat ket noi Socket.IO
- Error boundaries trong React

**7.3. Kiem tra tinh nang**
- Test nhap lenh manual
- Test nhan dien giong noi
- Test tinh toan phan cach
- Test zoom, pan, rotate label

---

## 5. CAC THUAT TOAN VA CONG THUC TINH TOAN

### 5.1. Tinh khoang cach giua 2 diem (Haversine Formula)

Dung de tinh khoang cach giua 2 toa do WGS84 tren hinh cau Trai Dat.

**Cong thuc Haversine:**

```
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1−a))
d = R × c
```

Trong do:
- φ1, φ2: Vi do cua diem 1 va diem 2 (rad)
- Δφ: Chenh lech vi do (rad)
- Δλ: Chenh lech kinh do (rad)
- R: Ban kinh Trai Dat = 3440.065 NM (nautical miles)
- d: Khoang cach (NM)

**Code implementation:**

```typescript
export function calculateDistance(point1: LatLng, point2: LatLng): number {
  const φ1 = toRadians(point1.latitude);
  const φ2 = toRadians(point2.latitude);
  const Δφ = toRadians(point2.latitude - point1.latitude);
  const Δλ = toRadians(point2.longitude - point1.longitude);

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return EARTH_RADIUS_NM * c;
}
```

**Vi du:**
- May bay A: 10.8°N, 106.6°E
- May bay B: 11.0°N, 106.8°E
- Khoang cach: ~15.2 NM

### 5.2. Tinh huong (Bearing) tu diem A den diem B

Dung de xac dinh huong bay tu mot diem den diem khac.

**Cong thuc:**

```
y = sin(Δλ) × cos(φ2)
x = cos(φ1) × sin(φ2) − sin(φ1) × cos(φ2) × cos(Δλ)
θ = atan2(y, x)
```

Trong do:
- θ: Goc huong (rad), chuyen sang do (0-360°)
- 0° = Huong Bac (North)
- 90° = Huong Dong (East)
- 180° = Huong Nam (South)
- 270° = Huong Tay (West)

**Code implementation:**

```typescript
export function calculateBearing(point1: LatLng, point2: LatLng): number {
  const φ1 = toRadians(point1.latitude);
  const φ2 = toRadians(point2.latitude);
  const Δλ = toRadians(point2.longitude - point1.longitude);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
          Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  
  let bearing = toDegrees(Math.atan2(y, x));
  
  // Normalize to 0-360
  return (bearing + 360) % 360;
}
```

### 5.3. Tinh vi tri moi sau khi di chuyen

Dung de cap nhat vi tri may bay sau moi giay.

**Cong thuc:**

```
δ = d / R  (goc khoang cach)
φ2 = asin(sin(φ1) × cos(δ) + cos(φ1) × sin(δ) × cos(θ))
λ2 = λ1 + atan2(sin(θ) × sin(δ) × cos(φ1), cos(δ) − sin(φ1) × sin(φ2))
```

Trong do:
- d: Khoang cach di chuyen (NM)
- θ: Huong di chuyen (rad)
- φ1, λ1: Toa do ban dau
- φ2, λ2: Toa do moi

**Code implementation:**

```typescript
export function calculateDestination(
  origin: LatLng,
  distance: number,  // nautical miles
  bearing: number    // degrees
): LatLng {
  const δ = distance / EARTH_RADIUS_NM;
  const θ = toRadians(bearing);
  const φ1 = toRadians(origin.latitude);
  const λ1 = toRadians(origin.longitude);

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) +
    Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  const λ2 = λ1 + Math.atan2(
    Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
  );

  return {
    latitude: toDegrees(φ2),
    longitude: toDegrees(λ2),
  };
}
```

**Vi du:**
- Vi tri hien tai: 10.8°N, 106.6°E
- Toc do: 450 knots
- Huong: 090° (Dong)
- Thoi gian: 1 giay
- Khoang cach di chuyen: 450/3600 = 0.125 NM
- Vi tri moi: 10.8°N, 106.6018°E

### 5.4. Cap nhat do cao may bay

May bay tang hoac giam do cao voi ty le co dinh.

**Cong thuc:**

```
Ty le tang/giam = MAX_CLIMB_RATE hoac MAX_DESCENT_RATE (feet/phut)
Altitude_change_per_second = rate / 60
New_altitude = Current_altitude + Altitude_change_per_second
```

**Hang so:**
- MAX_CLIMB_RATE = 2000 feet/phut
- MAX_DESCENT_RATE = 2000 feet/phut

**Code implementation:**

```typescript
// Trong simulation engine, moi 1 giay
if (aircraft.targetFlightLevel && aircraft.flightLevel !== aircraft.targetFlightLevel) {
  const diff = aircraft.targetFlightLevel - aircraft.flightLevel;
  const rate = diff > 0 ? 2000 : -2000; // feet/min
  const altitudeChange = rate / 60; // feet/second
  
  aircraft.position.altitude += altitudeChange;
  aircraft.flightLevel = Math.round(aircraft.position.altitude / 100);
  aircraft.verticalSpeed = rate;
  
  // Kiem tra da den target chua
  if (Math.abs(aircraft.flightLevel - aircraft.targetFlightLevel) < 5) {
    aircraft.flightLevel = aircraft.targetFlightLevel;
    aircraft.position.altitude = aircraft.targetFlightLevel * 100;
    aircraft.verticalSpeed = 0;
  }
}
```

**Vi du:**
- Do cao hien tai: 10000 feet (FL100)
- Do cao muc tieu: 12000 feet (FL120)
- Sau 1 giay: 10000 + (2000/60) = 10033.3 feet
- Sau 60 giay: 12000 feet

### 5.5. Cap nhat huong may bay

May bay thay doi huong voi ty le quay co dinh.

**Cong thuc:**

```
TURN_RATE = 3 do/giay (dua tren may bay thuong mai)
New_heading = Current_heading + Turn_amount
```

**Chon huong re ngan nhat:**
- Neu chenh lech > 180°: Re nguoc lai
- Neu chenh lech < 0: Re trai
- Neu chenh lech > 0: Re phai

**Code implementation:**

```typescript
if (aircraft.assignedHeading && aircraft.heading !== aircraft.assignedHeading) {
  const diff = aircraft.assignedHeading - aircraft.heading;
  let turnAmount = 3; // degrees per second
  
  // Xac dinh huong re ngan nhat
  if (Math.abs(diff) > 180) {
    turnAmount = -turnAmount;
  } else if (diff < 0) {
    turnAmount = -turnAmount;
  }
  
  aircraft.heading = normalizeHeading(aircraft.heading + turnAmount);
  
  // Kiem tra da den target chua
  if (Math.abs(aircraft.heading - aircraft.assignedHeading) < 3) {
    aircraft.heading = aircraft.assignedHeading;
  }
}
```

**Vi du:**
- Huong hien tai: 090° (Dong)
- Huong muc tieu: 180° (Nam)
- Sau 1 giay: 090° + 3° = 093°
- Sau 30 giay: 180°

### 5.6. Kiem tra phan cach giua cac may bay

Theo yeu cau du an, hai may bay mat phan cach neu:
- Khoang cach ngang < 10 NM
- Khoang cach doc < 1000 feet

**Cong thuc:**

```
Horizontal_distance = calculateDistance(AC1.position, AC2.position)
Vertical_distance = |AC1.altitude - AC2.altitude|

Neu (Horizontal_distance < 10 NM) VA (Vertical_distance < 1000 feet):
  => XUNG DOT (CONFLICT)
```

**Code implementation:**

```typescript
private checkSeparation() {
  const aircraftList = Array.from(this.aircraft.values());
  
  for (let i = 0; i < aircraftList.length; i++) {
    for (let j = i + 1; j < aircraftList.length; j++) {
      const ac1 = aircraftList[i];
      const ac2 = aircraftList[j];
      
      const horizontalDist = calculateDistance(
        { latitude: ac1.position.latitude, longitude: ac1.position.longitude },
        { latitude: ac2.position.latitude, longitude: ac2.position.longitude }
      );
      
      const verticalDist = Math.abs(ac1.position.altitude - ac2.position.altitude);
      
      // Kiem tra vi pham
      if (horizontalDist < 10 && verticalDist < 1000) {
        // Cap nhat trang thai CONFLICT
        ac1.conflict = true;
        ac1.state = 'CONFLICT';
        ac2.conflict = true;
        ac2.state = 'CONFLICT';
        
        // Gui canh bao
        this.io.emit('separation:violation', {
          aircraft1: ac1.id,
          aircraft2: ac2.id,
          horizontalDistance: horizontalDist,
          verticalDistance: verticalDist,
          severity: 'CRITICAL',
        });
      }
    }
  }
}
```

**Vi du:**
- May bay A: FL350 (35000 feet), toa do (10.8°N, 106.6°E)
- May bay B: FL360 (36000 feet), toa do (10.85°N, 106.65°E)
- Khoang cach ngang: ~5 NM
- Khoang cach doc: 1000 feet
- Ket qua: Dung ngoai bien phan cach, KHONG xung dot

### 5.7. Chuyen doi toa do WGS84 sang toa do man hinh

De ve radar, can chuyen toa do thuc (latitude, longitude) sang toa do pixel (x, y).

**Cong thuc Equirectangular Projection:**

```
scale = zoom × baseScale
latCosine = cos(center.latitude)

dx = (point.longitude - center.longitude) × latCosine
dy = point.latitude - center.latitude

x = canvasWidth/2 + dx × scale
y = canvasHeight/2 - dy × scale  (dao truc Y)
```

**Code implementation:**

```typescript
export function latLngToScreen(
  position: LatLng,
  center: LatLng,
  zoom: number,
  canvasSize: { width: number; height: number }
): ScreenPosition {
  const baseScale = 80;
  const scale = zoom * baseScale;
  
  const latCosine = Math.cos(toRadians(center.latitude));
  
  const dx = (position.longitude - center.longitude) * latCosine;
  const dy = position.latitude - center.latitude;
  
  return {
    x: canvasSize.width / 2 + dx * scale,
    y: canvasSize.height / 2 - dy * scale,
  };
}
```

**Vi du:**
- Toa do may bay: 10.8°N, 106.6°E
- Center radar: 10.5°N, 106.5°E
- Zoom: 2.0
- Canvas: 1920x1080
- dx = (106.6 - 106.5) × cos(10.5°) = 0.1 × 0.9833 = 0.09833
- dy = 10.8 - 10.5 = 0.3
- scale = 2.0 × 80 = 160
- x = 1920/2 + 0.09833 × 160 = 960 + 15.7 = 975.7
- y = 1080/2 - 0.3 × 160 = 540 - 48 = 492

### 5.8. Hien thi do cao theo quy tac

Theo yeu cau du an:
- Neu do cao >= 10000 feet: Hien thi "FL" + 3 chu so dau
- Neu do cao < 10000 feet: Hien thi 2 chu so dau

**Code implementation:**

```typescript
const formatAltitude = (altitude: number): string => {
  if (altitude >= 10000) {
    return `FL${Math.round(altitude / 100)}`;
  } else {
    return `${Math.round(altitude / 100)}`;
  }
};
```

**Vi du:**
- 35000 feet => FL350
- 12000 feet => FL120
- 9000 feet => 90
- 5000 feet => 50
- 4100 feet => 41

---

## 6. CACH CHAY VA TRIEN KHAI UNG DUNG

### 6.1. Yeu cau he thong

**Phan mem:**
- Node.js phien ban 18 tro len
- npm phien ban 9 tro len
- PostgreSQL phien ban 14 tro len (neu dung database)

**Trinh duyet ho tro:**
- Google Chrome 90+
- Microsoft Edge 90+
- Firefox 88+ (co the khong ho tro Voice Recognition)

**Phan cung:**
- RAM: Toi thieu 4GB, khuyên dung 8GB
- CPU: Dual-core tro len
- Micro: Cho tinh nang nhan dien giong noi

### 6.2. Cai dat du an

**Buoc 1: Clone hoac download du an**
```bash
cd /Users/buitienquoc/Downloads/DOUBLE\ QUEBEC\ ALPHA/atc-radar-sim
```

**Buoc 2: Cai dat dependencies**
```bash
# Cai dat dependencies cho tat ca packages
npm install

# Build shared package
cd shared
npm run build
cd ..
```

**Buoc 3: Cau hinh bien moi truong**

Tao file `.env` trong thu muc backend:
```
DATABASE_URL="postgresql://user:password@localhost:5432/atc_db"
PORT=4000
JWT_SECRET="your-secret-key-here"
```

Tao file `.env.local` trong thu muc frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

**Buoc 4: Thiet lap database (neu dung)**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
cd ..
```

### 6.3. Chay che do development (phat trien)

**Cach 1: Chay rieng le**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Cach 2: Chay dong thoi**

Terminal - Root:
```bash
npm run dev
```

Sau khi chay thanh cong:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### 6.4. Chay che do production (san xuat)

**Buoc 1: Build tat ca packages**
```bash
# Build shared
cd shared
npm run build

# Build backend
cd ../backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

**Buoc 2: Chay production server**

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 6.5. Trien khai len server

**Frontend: Netlify hoac Vercel**

1. Tao tai khoan tren Netlify/Vercel
2. Ket noi repository GitHub
3. Cau hinh build:
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
   - Install command: `cd shared && npm run build && cd ../frontend && npm install`
4. Thiet lap bien moi truong (NEXT_PUBLIC_API_URL)
5. Deploy

**Backend: Render hoac Railway**

1. Tao tai khoan tren Render/Railway
2. Tao PostgreSQL database
3. Tao web service
4. Ket noi repository GitHub
5. Cau hinh build:
   - Build command: `cd shared && npm run build && cd ../backend && npm install && npm run build`
   - Start command: `cd backend && npm start`
6. Thiet lap bien moi truong (DATABASE_URL, PORT, JWT_SECRET)
7. Deploy

### 6.6. Kiem tra ung dung

**Kiem tra frontend:**
1. Truy cap http://localhost:3000
2. Kiem tra radar hien thi dung
3. Thu zoom, pan
4. Thu nhan dien giong noi (cho phep micro)
5. Thu nhap lenh bang tay

**Kiem tra backend:**
1. Kiem tra console log trong terminal backend
2. Xem "Simulation engine started"
3. Xem cac event "aircraft:update" moi giay
4. Xem cac event "separation:check" moi 2 giay

**Kiem tra Socket.IO:**
1. Mo DevTools trong trinh duyet (F12)
2. Vao tab Network > WS (WebSocket)
3. Xem cac message emit/receive
4. Kiem tra aircraft:update events

---

## 7. CAC TINH NANG CHINH

### 7.1. Hien thi radar

**Cac thanh phan hien thi:**
- Background: Mau xanh dam (#0C2D57)
- Grid: Luoi chia o (co the bat/tat)
- Airway routes: Duong bay (mau trang mo, co the bat/tat)
- Boundary: Vung gioi han (mau tim)
- Waypoints: Cac diem tham chieu (tam giac rong, mau vang)
- Aircraft: May bay (hinh vuong + nhan thong tin + duong huong)

**Tuong tac:**
- Zoom: Cuon chuot hoac phim +/- (0.5x den 8.0x)
- Pan: Keo chuot de di chuyen ban do
- Measure: Giu Shift + keo chuot de do khoang cach
- Rotate label: Nhan phai vao may bay de xoay nhan 15 do

**Mau sac may bay:**
- Trang: Chua nhan dang (not identified)
- Xanh la: Da nhan dang (identified)
- Do: Xung dot hoac ngoai vung (conflict hoac out of boundary)

### 7.2. Nhap lenh bang tay

**Dinh dang lenh viet tat:**
- D120: Descend to FL120
- C90: Climb to 9000 feet
- SD100: Stop descend at FL100
- SC80: Stop climb at 8000 feet
- R270: Turn right heading 270
- L090: Turn left heading 090
- F180: Fly heading 180
- IS250: Increase speed to 250 knots
- RS220: Reduce speed to 220 knots
- IM0.78: Increase Mach to 0.78
- RM0.76: Reduce Mach to 0.76
- CT: Contact (chuyen sang don vi khac)
- ID: Identify (nhan dang may bay)
- DRAC: Direct to waypoint AC
- DT HVN123 VJC456: Do khoang cach giua 2 may bay

**Cach su dung:**
1. Chon may bay (click vao may bay hoac go callsign)
2. Go lenh vao khung nhap
3. Nhan Enter hoac nut Submit
4. Nghe am thanh "ting" neu thanh cong
5. Xem lich su lenh phia duoi

### 7.3. Nhan dien giong noi

**Cach su dung:**
1. Click nut Micro de bat dau ghi am
2. Noi lenh theo cu phap ICAO:
   - "HVN123 descend to flight level one two zero"
   - "VJC456 turn right heading two seven zero"
   - "BAV789 increase speed to two five zero knots"
3. He thong tu dong phan tich va thuc thi
4. Nghe am thanh "ting" neu thanh cong
5. Xem lenh hien thi trong lich su

**Luu y:**
- Noi ro rang, dung thuat ngu ICAO
- Callsign + lenh
- So doc tach tung chu so:
  - 120 => "one two zero"
  - 270 => "two seven zero"
  - 0.78 => "zero point seven eight"

### 7.4. Theo doi may bay

**Thong tin hien thi tren nhan may bay:**
- Dong 1: Callsign (vi du: HVN123)
- Dong 2: Flight Level (vi du: FL350 hoac 90)
- Dong 3: Speed - Mach (vi du: 450 - 0.78)

**Duong huong (Heading line):**
- Duong thang tu may bay, dai 5 NM
- Huong tu duoi len tren = huong bay cua may bay

**Mui ten thang dung ben canh Flight Level:**
- Mui ten len: May bay dang tang do cao
- Mui ten xuong: May bay dang giam do cao
- Khong co mui ten: May bay duy tri do cao

### 7.5. Canh bao phan cach

**Khi nao canh bao:**
- Warning: Khoang cach ngang < 15 NM va khoang cach doc < 2000 feet
- Violation: Khoang cach ngang < 10 NM va khoang cach doc < 1000 feet

**Hien thi canh bao:**
- May bay doi sang mau do
- Am thanh canh bao
- Thong bao tren man hinh

### 7.6. Lich su lenh

**Hien thi:**
- Thoi gian cap lenh (theo dong ho he thong)
- Callsign + lenh da cap
- Mau do: Lenh khong hop le hoac "Unable"
- Co thanh keo de xem lich su cu

**Vi du:**
```
03:05:23 - HVN123 Descend to FL120
03:05:45 - VJC456 Turn right heading 270
03:06:12 - HVN123 Increase Speed to 250 knots
03:06:30 - BAV789 Unable increase (vuot qua 20 knots)
```

---

## 8. KET LUAN

### 8.1. Thanh qua dat duoc

Du an da xay dung thanh cong he thong mo phong huan luyen ATC radar voi cac tinh nang:
- Hien thi radar thoi gian thuc voi Konva.js
- Tinh toan vi tri may bay bang cong thuc Haversine
- Phat hien xung dot va canh bao
- Nhan dien giong noi bang Web Speech API
- Giao tiep realtime qua Socket.IO
- Quan ly trang thai voi Zustand

### 8.2. Kho khan gap phai

1. **Tinh toan toa do phuc tap:**
   - Phai chuyen doi giua WGS84 va toa do man hinh
   - Su dung Haversine formula cho do chinh xac cao

2. **Dong bo du lieu realtime:**
   - Xu ly nhieu may bay dong thoi
   - Dam bao khong bi lag khi cap nhat moi giay

3. **Nhan dien giong noi:**
   - Web Speech API chua chinh xac 100%
   - Can xu ly nhieu bien the phat am

4. **Hieu nang rendering:**
   - Canvas ve lai lien tuc
   - Toi uu hoa bang React.memo va throttle

### 8.3. Huong phat trien

1. **Them tinh nang:**
   - Luu va phat lai phien tap
   - Danh gia hieu suat cua nguoi dung
   - Che do multi-player (nhieu nguoi cung luc)

2. **Cai thien AI:**
   - Nhan dien giong noi tot hon
   - Ho tro nhieu ngon ngu

3. **Mo rong database:**
   - Luu tru lich su chi tiet
   - Thong ke va bao cao

4. **Toi uu hoa:**
   - Giam dung luong
   - Tang toc do render
   - Ho tro mobile

### 8.4. Bai hoc kinh nghiem

1. **Quan ly state:**
   - Zustand don gian va hieu qua
   - Nen su dung state management cho du an phuc tap

2. **TypeScript:**
   - Giup phat hien loi som
   - Code de bao tri hon nhieu

3. **Modular architecture:**
   - Tach shared package giup tai su dung code
   - Frontend/backend doc lap de trien khai

4. **Realtime communication:**
   - Socket.IO rat phu hop cho ung dung realtime
   - Can xu ly reconnection va error handling

---

**KET THUC TAI LIEU**

Tai lieu nay trinh bay toan bo qua trinh phat trien he thong mo phong radar ATC tu khoi tao den trien khai. Hy vong tai lieu giup ban co tai lieu day du de viet bao cao va trinh bay du an.

