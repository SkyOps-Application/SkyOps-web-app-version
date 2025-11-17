**CHỨC NĂNG TRÊN MÀN HÌNH LUYỆN TẬP**

**TỔNG QUAN VỀ WEB:**  
	*Website hỗ trợ sinh viên Học viện Hàng không Việt Nam học thực hành Kiểm soát Đường dài có hệ thống giám sát (ACC Radar) từ xa, tại nhà hay bất cứ đâu mà không cần phải lên trường mới có hệ thống để học. Điều này giúp giảm thiểu tần suất sử dụng phòng thực hành, máy móc thiết bị của phòng học có thêm thời gian nghỉ và không bị quá tải cũng như giải quyết được nhu cầu được luyện tập nhiều hơn của sinh viên khi học thực hành.*  
	*Website chỉ sử dụng một thiết bị truy cập và một người cũng có thể tự luyện tập vì nhóm nghiên cứu áp dụng phản hồi bằng âm thanh từ AI bên cạnh việc nhập lệnh bằng tay. Điều này cũng giúp cho sinh viên cải thiện thuật ngữ và phát âm.*   
	*website có cơ chế lưu lại video có âm thanh luyện tập để sinh viên có thể theo dõi lại các lượt luyện tập của mình, từ đó nhìn nhận được các điểm chưa hoàn thiện để có thể sửa đổi cũng như cải thiện kỹ năng kiểm soát.*

**1\. DATA THÊM VÀO WEB**  
\- Chức năng dùng để luyện tập đúng thuật ngữ và phát âm  
\- User đọc lệnh và màn hình sẽ hiện readback  
\- Khi cấp Huấn lệnh, nếu đúng callsign tàu bay có trong bài và đúng huấn lệnh thì sẽ có âm thanh (ví dụ như ting một cái) để người dùng biết là đã cấp huấn lệnh rồi  
\- Phía dưới map sẽ có khung hiện lịch sử cấp huấn lệnh, nó sẽ có cấu trúc “Callsign \+ huấn lệnh” và hiện theo trình tự, có **kèm thời gian** cấp huấn lệnh luôn, có thanh kéo để lướt lên lướt xuống (xem rõ hơn trong ảnh des minh hoạ)  
\- Cấu trúc huấn lệnh kèm Callsign tàu thì mới có phản hồi, tức là phải chỉ rõ tàu nào thực hiện huấn lệnh “[Callsign] + huấn lệnh”  
\- Sẽ có khung nhập huấn lệnh phòng trường hợp đọc huấn lệnh mãi mà máy không nhận lệnh (không nghe tiếng ting).  
\- Gọi callsign không có trong bài hệ thống sẽ không phản hồi gì hết

**\*HIỂN THỊ ĐỘ CAO TRÊN MÀN HÌNH VÀ QUY TẮC PHÂN CÁCH**  
\- Nếu tàu bay cao trên 10 000ft thì sẽ hiện là FL+ba số đầu. Ví dụ 10 000ft \= FL100, 12 000ft \= FL120  
\- Nếu tàu bay cao dưới 10 000ft thì màn hình sẽ hiện hai số đầu thôi. Ví dụ 9000ft \= 90, 5000ft \= 50, 4100ft \= 41  
\- Nếu hai tàu bay có độ cao cách nhau không tối thiểu 1000ft và khoảng cách giữa chúng không đủ tối thiểu 10NM (Dặm \- Nautical Miles) thì hai tàu bay mất phân cách \- màn hình sẽ hiển thị cả hai tàu đang màu vàng chuyển sang màu đỏ.  
\- Mỗi lần tăng/hạ độ cao, tàu tăng/hạ từ từ, nhích mỗi 100ft một lần cho đến độ cao được chỉ định

| CALLSIGN THÊM VÀO WEBQuy tắc callsign sẽ là “Tên hãng \+ số” |  |  |  |
| :---: | ----- | ----- | ----- |
| **STT** | **TÊN HÃNG (là user sẽ đọc như này luôn á)** | **KÝ HIỆU HIỆN TRÊN MÀN HÌNH** | **GHI CHÚ** |
| 1 | VietNam | HVN | \- Quy tắc đọc số theo ICAO: 0 \- ZERO 1 \- ONE 2 \- TWO 3 \- TREE 4 \- FOUR 5 \- FIVE 6 \- SIX 7 \- SEVEN 8 \- EIGHT 9 \- NINER DẤU CHẤM TRONG SỐ THẬP PHÂN (.) \- DECIMAL  |
| 2 | VietJet | VJC |  |
| 3 | BamBoo | BAV |  |
| 4 | Vasco | VFC |  |
| 5 | Fedex | FDX |  |
| 6 | Japan Air | JAL |  |

| HUẤN LỆNH THÊM VÀO WEB (bản nhận âm thanh) |  |  |  |
| :---: | ----- | ----- | ----- |
| **STT** | **HUẤN LỆNH** | **HIỂN THỊ TRÊN MÀN HÌNH** | **GHI CHÚ** |
| 1 | DESCEND TO \+ Số \+ THOUSAND \+ FEET | \- Tàu hạ độ cao đến số được chỉ định\- Mũi tên kế bên ĐỘ CAO hướng xuống. | \- Khi tăng/giảm độ cao dưới 10 000ft sẽ dùng huấn lệnh này \- Quy tắc đọc số theo ICAO: 0 \- ZERO 1 \- ONE 2 \- TWO 3 \- TREE 4 \- FOUR 5 \- FIVE 6 \- SIX 7 \- SEVEN 8 \- EIGHT 9 \- NINER DẤU CHẤM TRONG SỐ THẬP PHÂN (.) \- DECIMAL |
| 2 | CLIMB TO \+ Số \+ THOUSAND \+ FEET | \- Tàu lên độ cao đến số được chỉ định\- Mũi tên kế bên ĐỘ CAO hướng lên. |  |
| 3 | DESCEND TO FLIGHT LEVEL \+ SỐ | \- Tàu hạ độ cao đến số được chỉ định\- Mũi tên kế bên Flight Level hướng xuống. | \- Số của Flight Level phải là cụm ba số thì mới đúng huấn lệnh, các số đọc tách ra từng số. Ví dụ như 120 đọc là “one two zero” \- Quy tắc đọc số giống phía trên |
| 4 | CLIMB TO FLIGHT LEVEL \+ SỐ | \- Tàu lên độ cao đến số được chỉ định\- Mũi tên kế bên Flight Level hướng lên. |  |
| 5 | STOP DESCEND AT FLIGHT LEVEL \+ SỐ | \- Tàu DỪNG hạ độ cao tại số được chỉ định\- Mũi tên kế bên Flight Level hướng xuống |  |
| 6 | STOP CLIMB AT FLIGHT LEVEL \+ SỐ | \- Tàu DỪNG tăng độ cao tại số được chỉ định\- Mũi tên kế bên Flight Level hướng lên |  |
| 7 | TURN RIGHT HEADING \+ SỐ | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ phải theo hướng tương ứng được cấp | \- Heading tàu cũng là cụm ba số, cũng đọc tách ra ví dụ như heading 090 đọc là heading zero niner zero \- Quy tắc đọc số giống trên Flight Level |
| 8 | TURN LEFT HEADING \+ SỐ | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ trái theo hướng tương ứng được cấp |  |
| 9 | FLY HEADING \+ SỐ  | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ theo hướng tương ứng được cấp, rẽ trái hoặc phải thì bên nào gần hướng được cấp hơn rẽ bên đó |  |
| 10 | INCREASE SPEED BY \+ SỐ (CỤM HAI SỐ) \+ KNOTS | \- Tàu TĂNG THÊM số Knots tốc độ tương ứng (là tốc độ cũ \+ số knots cần tăng thêm) \- Mũi tên kế bên Speed hướng lên | \- Số knots tăng thêm sẽ là cụm hai số \- Không thể tăng/giảm vượt quá 20 knots, nếu cấp huấn lệnh tăng/giảm nhiều hơn 20 knots thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Quy tắc đọc số giống Flight Level |
| 11 | REDUCE SPEED BY \+ SỐ (CỤM HAI SỐ) \+ KNOTS | \- Tàu GIẢM THÊM số Knots tốc độ tương ứng (là tốc độ cũ \- số knots cần giảm đi)\- Mũi tên kế bên Speed hướng xuống |  |
| 12 | INCREASE SPEED TO \+ SỐ (CỤM BA SỐ) \+ KNOTS | \- Tàu tăng từ tốc độ cũ lên tốc độ được chỉ định \- Mũi tên kế bên Speed hướng lên | \- SPEED của tàu luôn là cụm 3 số.  \- Không thể tăng/giảm vượt quá 20 knots so với speed cũ, nếu cấp huấn lệnh tăng/giảm nhiều hơn 20 knots so với speed cũ thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Quy tắc đọc số giống Flight Level |
| 13 | REDUCE SPEED TO \+ SỐ (CỤM BA SỐ) \+ KNOTS | \- Tàu giảm từ tốc độ cũ lên tốc độ được chỉ định \- Mũi tên kế bên Speed hướng xuống |  |
| 14 | INCREASE MACH NUMBER BY \+ SỐ (SỐ THẬP PHÂN KIỂU 0.3,...)  | \- Tàu TĂNG THÊM số mach tương ứng (là số mach cũ \+ số mach cần tăng) \- Mũi tên kế bên số mach hướng lên | \- Số mach luôn là số thập phân.\- Tăng/giảm mach cũng là tăng/giảm tốc độ tàu, số mach càng lớn tàu chạy càng nhanh. \- Chỉ tối đa 2 chữ số sau dấu chấm. Ví dụ như 0.3, 0.78 thì được còn 0.789 thì không được. \- Chỉ được tăng/giảm tối đa 0.3 đơn vị, nếu cấp huấn lệnh tăng/giảm nhiều hơn 0.3 đơn vị so với số mach cũ thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Quy tắc đọc số giống trên Flight level |
| 15 | REDUCE MACH NUMBER  BY \+ SỐ (SỐ THẬP PHÂN KIỂU 0.3,...) | \- Tàu GIẢM THÊM số mach tương ứng (là số mach cũ \- số mach cần giảm) \- Mũi tên kế bên số mach hướng xuống |  |
| 16 | INCREASE MACH NUMBER TO \+ SỐ (cụm số thập phân) | \- Tàu tăng từ số mach cũ lên số mach được chỉ định\- Mũi tên kế bên số mach hướng lên |  |
| 17 | REDUCE MACH NUMBER TO \+ SỐ (cụm số thập phân) | \- Tàu giảm từ số mach cũ lên số mach được chỉ định\- Mũi tên kế bên số mach hướng xuống |  |
| 18 | CONTACT \+ ĐƠN VỊ \+ TẦN SỐ | Tàu biến mất khỏi map | **\* Danh sách các đơn vị \+ Tần số:** \- SECTOR 1: 134.05 \- SECTOR 3: 120.9 \- SECTOR 4: 133.05 \- SECTOR 5: 120.7 \- PHNOM PENH: 127.5 \- TÂN SƠN NHẤT APPROACH: 125.5 \- CÔN SƠN TOWER: 118.15 \- CAM RANH TOWER: 118.2 \- LIÊN KHƯƠNG TOWER: 118.4 \- BUÔN MÊ THUỘT TOWER: 118.45 \- PLEIKU TOWER: 118.1**\* Tần số đọc rời từng chữ, quy tắc đọc số giống như trên Độ cao** |
| 19 | IDENTIFIED | Tàu trên màn hình đang màu trắng chuyển sang màu vàng | \- Nhận dạng tàu bay |

| HUẤN LỆNH THÊM VÀO WEB (bản nhập huấn lệnh bằng tay) |  |  |  |
| :---: | ----- | ----- | ----- |
| **STT** | **Nhập lệnh** | **HIỂN THỊ TRÊN MÀN HÌNH** | **Chi tiết** |
| 1 | D+SỐ | \- Tàu hạ độ cao đến số được chỉ định\- Mũi tên kế bên ĐỘ CAO hướng xuống. | \- Tàu hạ độ cao (Descend) \- Số sau D có thể là 3 số hoặc 2 số thì nó là kiểu **rút gọn hai số 0** rồi \- Ví dụ D90 → Descend to 9000ft; D120 → Descend to FL120 \= 12000ft |
| 2 | C+SỐ | \- Tàu lên độ cao đến số được chỉ định\- Mũi tên kế bên ĐỘ CAO hướng lên. | \- Tàu tăng độ cao (Climb)) \- Số sau C có thể là 3 số hoặc 2 số thì nó là kiểu **rút gọn hai số 0** rồi \- Ví dụ C90 → Climb to 9000ft; C120 → Climb to FL120 \= 12000ft |
| 5 | SD+SỐ | \- Tàu DỪNG hạ độ cao tại số được chỉ định\- Mũi tên kế bên Flight Level hướng xuống | \- Tàu DỪNG hạ độ cao (STOP DESCEND) \- Số sau SD có thể là 3 số hoặc 2 số thì nó là kiểu **rút gọn hai số 0** rồi \- Ví dụ SD90 → STOP DESCEND AT 9000ft; SD120 → STOP DESCEND AT FL120 \= 12000ft |
| 6 | SC+SỐ | \- Tàu DỪNG tăng độ cao tại số được chỉ định\- Mũi tên kế bên Flight Level hướng lên | \- Tàu DỪNG tăng độ cao (STOP CLIMB) \- Số sau SC có thể là 3 số hoặc 2 số thì nó là kiểu **rút gọn hai số 0** rồi \- Ví dụ SC90 → STOP CLIMB AT 9000ft; SC120 → STOP CLIMB AT FL120 \= 12000ft |
| 7 | R+SỐ | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ phải theo hướng tương ứng được cấp | \- Tàu rẽ sang phải và theo hướng được chỉ định \- Hướng sẽ luôn là cụm ba số \- Ví dụ: R025 → Turn Right Heading 025 |
| 8 | L+SỐ | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ trái theo hướng tương ứng được cấp | \- Tàu rẽ sang trái và theo hướng được chỉ định \- Hướng sẽ luôn là cụm ba số \- Ví dụ: L025 → Turn Left Heading 025 |
| 9 | F+SỐ  | Từ hướng tàu đang bay (hướng từ đuôi tàu lên mũi tàu) rẽ theo hướng tương ứng được cấp, rẽ trái hoặc phải thì bên nào gần hướng được cấp hơn rẽ bên đó | \- Tàu rẽ sang hướng được chỉ định theo đường ngắn nhất (rẽ trái hay phải cái nào gần hơn rẽ cái đó) \- Hướng sẽ luôn là cụm ba số \- Ví dụ: F025 →  Fly Heading 025 |
| 12 | IS+SỐ | \- Tàu tăng từ tốc độ cũ lên tốc độ được chỉ định \- Mũi tên kế bên Speed hướng lên | \- TĂNG SPEED TÀU ĐẾN MỘT SỐ ĐƯỢC CHỈ ĐỊNH \- Không thể tăng/giảm vượt quá 20 knots so với speed cũ, nếu cấp huấn lệnh tăng/giảm nhiều hơn 20 knots so với speed cũ thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Ví dụ: IS250 → INCREASE SPEED TO 250 KNOTS |
| 13 | RS+SỐ | \- Tàu giảm từ tốc độ cũ lên tốc độ được chỉ định \- Mũi tên kế bên Speed hướng xuống | \- GIẢM SPEED TÀU ĐẾN MỘT SỐ ĐƯỢC CHỈ ĐỊNH \- Không thể tăng/giảm vượt quá 20 knots so với speed cũ, nếu cấp huấn lệnh tăng/giảm nhiều hơn 20 knots so với speed cũ thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Ví dụ: RS250 → REDUCE SPEED TO 250 KNOTS |
| 16 | IM+SỐ THẬP PHÂN | \- Tàu tăng từ số mach cũ lên số mach được chỉ định\- Mũi tên kế bên số mach hướng lên | \- Số mach luôn là số thập phân. \- Chỉ tối đa 2 chữ số sau dấu chấm. Ví dụ như 0.3, 0.78 thì được còn 0.789 thì không được. \- Chỉ được tăng/giảm tối đa 0.3 đơn vị, nếu cấp huấn lệnh tăng/giảm nhiều hơn 0.3 đơn vị so với số mach cũ thì khung lịch sử cấp huấn lệnh sẽ hiện **“Unable Increase/reduce” chữ MÀU ĐỎ** \- Ví dụ IM0.78 → Increase Mach number to 0.78; RM0.76 → Reduce Mach number to 0.76 |
| 17 | RM+SỐ THẬP PHÂN | \- Tàu giảm từ số mach cũ lên số mach được chỉ định\- Mũi tên kế bên số mach hướng xuống |  |
| 18 | CT  | Tàu biến mất khỏi map | \- Cho tàu chuyển sóng (contact) |
| 19 | ID | Tàu trên màn hình đang màu trắng chuyển sang màu vàng | \- Nhận diện tàu bay |



### Bảng WAYPOINT & ROUTES
# WAYPOINT VÀ ĐƯỜNG BAY
# WAYPOINT & ROUTES

| STT | ĐƯỜNG BAY | WAYPOINT | KINH ĐỘ (N) | VĨ ĐỘ (E) |
|-----|-----------|----------|--------------|-------------|
| 1 | W2 | KONCO | 170000 | 1071113 |
|   |    | BIGBO | 162919 | 1073738 |
|   |    | HUE | 162408 | 1074206 |
|   |    | DAN | 160310 | 1081154 |
|   |    | CQ | 152444 | 1084216 |
|   |    | KUMUN | 145817 | 1084827 |
|   |    | PCA | 135726 | 1090234 |
|   |    | KAMGO | 131715 | 1090605 |
|   |    | KARAN | 123856 | 1090924 |
|   |    | NHATA | 121335 | 1091204 |
|   |    | CRA | 115940 | 1091312 |
|   |    | IBUNU | 114008 | 1085205 |
|   |    | PTH | 105541 | 1080419 |
|   |    | VEPMA | 105600 | 1074018 |
|   |    | AC | 105621 | 1071118 |
|   |    | TSH | 104906 | 1063902 |
| 2 | Q2 | TSH | 104906 | 1063902 |
|   |    | KADUM | 112126 | 1070334 |
|   |    | PATMA | 122011 | 1074836 |
|   |    | SADAS | 131912 | 1074946 |
|   |    | DADEN | 135958 | 1075037 |
|   |    | LATOM | 145246 | 1075037 |
|   |    | PATNO | 155754 | 1075306 |
|   |    | BIGBO | 162919 | 1073738 |
|   |    | TRABE | 165345 | 1072537 |
|   |    | VIDEN | 170114 | 1072156 |
| 3 | W10 | HAMIN | 170747 | 1074040 |
|   |     | HUE | 162408 | 1074206 |
| 4 | W1 | HAMIN | 170747 | 1074040 |
|   |    | PHULU | 164141 | 1075319 |
|   |    | CAHEO | 163211 | 1075755 |
|   |    | DAN | 160310 | 1081154 |
|   |    | VILOT | 150219 | 1080642 |
|   |    | XAQUA | 145510 | 1080606 |
|   |    | PLK | 140022 | 1080128 |
|   |    | MEVON | 132011 | 1080427 |
|   |    | BMT | 123959 | 1080723 |
|   |    | ENRIN | 111127 | 1071926 |
|   |    | AC | 105621 | 1071118 |
|   |    | ESDOB | 105319 | 1065750 |
|   |    | TSH | 104906 | 1063902 |
| 5 | R328 | TORED | 162749 | 1064032 |
|   |      | HUE | 162408 | 1074206 |
| 6 | A1 | PAPRA | 154600 | 1071100 |
|   |    | TANNA | 155412 | 1073932 |
|   |    | PATNO | 155754 | 1075306 |
|   |    | DAN | 160310 | 1081154 |
|   |    | KANGU | 162115 | 1083953 |
|   |    | BINKU | 163335 | 1085823 |
|   |    | BUNTA | 165000 | 1092342 |
| 7 | P901 | DAN | 160310 | 1081154 |
|   |      | ITBAM | 164000 | 1093606 |
| 8 | Q6 | MUMGA | 140000 | 1080913 |
|   |    | TATIM | 145850 | 1080111 |
|   |    | PATNO | 155754 | 1075306 |
| 9 | Q1 | DAN | 160310 | 1081154 |
|   |    | SADIN | 150448 | 1081038 |
|   |    | BANSU | 141710 | 1080935 |
|   |    | MUMGA | 140000 | 1080913 |
|   |    | ENGIM | 132026 | 1080821 |
|   |    | BMT | 123959 | 1080723 |
|   |    | DOVIN | 115501 | 1080629 |
|   |    | AC | 105621 | 1071118 |
| 10 | W11 | PLK | 140022 | 1080128 |
|    |     | CQ | 152444 | 1084216 |
|    |     | BANSU | 141710 | 1080935 |
| 11 | G221 | PCA | 135726 | 1090234 |
|    |      | ASUKU | 153626 | 1091439 |
|    |      | BUNTA | 165000 | 1092342 |
| 12 | B202 | PLK | 140022 | 1080128 |
|    |      | BOMPA | 142000 | 1072400 |
| 13 | G474 | ANINA | 135900 | 1072500 |
|    |      | DADEN | 135958 | 1075037 |
|    |      | PLK | 140022 | 1080128 |
|    |      | MUMGA | 140000 | 1080913 |
|    |      | PCA | 135726 | 1090234 |
| 14 | L628 | PCA | 135726 | 1090234 |
|    |      | VIMUT | 135745 | 1093117 |
|    |      | VEPAM | 135800 | 1100000 |
|    |      | DAMEL | 135842 | 1113036 |
|    |      | MESOX | 135848 | 1130242 |
|    |      | ARESI | 135824 | 1142700 |
| 15 | L642 | EGEMU | 170000 | 1121700 |
|    |      | EXOTO | 152130 | 1110300 |
|    |      | VEPAM | 135800 | 1100000 |
|    |      | KARAN | 123856 | 1090924 |
|    |      | SOSPA | 115002 | 1083827 |
|    |      | PTH | 105541 | 1080419 |
|    |      | RUTIT | 102715 | 1074527 |
|    |      | ELSAS | 100812 | 1073254 |
|    |      | CN | 84358 | 1063735 |
|    |      | ESPOB | 70000 | 1053318 |
| 16 | M771 | DUDIS | 70000 | 1064836 |
|    |      | DAGAG | 92748 | 1082630 |
|    |      | SUDUN | 95934 | 1084744 |
|    |      | DAMVO | 110630 | 1093242 |
|    |      | DOXAR | 122200 | 1102242 |
|    |      | NITOM | 124431 | 1103825 |
|    |      | DAMEL | 135842 | 1113036 |
|    |      | DONDA | 144212 | 1120118 |
| 17 | W17 | TSH | 104906 | 1063902 |
|    |      | ATGAS | 102417 | 1053102 |
|    |      | TUNPO | 100344 | 100344 |
| 18 | R334 | PQU | 100955 | 1040220 |
|    |      | NUMDI | 102643 | 1034635 |
| 19 | W8 | TSH | 104906 | 1063902 |
|    |     | POTIX | 101405 | 1053700 |
|    |     | TUNPO | 100344 | 100344 |
|    |     | RG | 95734 | 1050759 |
|    |     | PQU | 100955 | 1040220 |
| 20 | W16 | TSH | 104906 | 1063902 |
|    |      | ENPAS | 102359 | 1060641 |
|    |      | TRN | 100500 | 1054220 |
|    |      | RG | 95734 | 1050759 |
| 21 | L643 | TSH | 104906 | 1063902 |
|    |      | XOBAV | 100825 | 1063833 |
|    |      | NIXIV | 92336 | 1063802 |
|    |      | CN | 84358 | 1063735 |
| 22 | N891 | XONAN | 91442 | 1025018 |
|    |      | SAMOG | 80006 | 1031424 |
|    |      | IGARI | 65612 | 1033506 |
| 23 | M753 | IPRIX | 70000 | 1040754 |
|    |      | BITOD | 71524 | 1040706 |
|    |      | ADBOP | 83000 | 1040500 |
|    |      | PQU | 100955 | 1040220 |
|    |      | CAMPU | 103307 | 1041549 |
|    |      | PNH | 113238 | 1045038 |
| 24 | M765 | PANDI | 113806 | 1140000 |
|    |      | ALDAS | 105654 | 1121218 |
|    |      | MAPNO | 101306 | 1102006 |
|    |      | SAMAP | 94718 | 1091509 |
|    |      | DAGAG | 92748 | 1082630 |
|    |      | CN | 84358 | 1063735 |
|    |      | VIGEN | 75944 | 1052210 |
|    |      | BITOD | 71524 | 1040706 |
|    |      | IGARI | 65612 | 1033506 |
| 25 | L637 | BITOD | 71524 | 1040706 |
|    |      | BIBAN | 83000 | 1050000 |
|    |      | ANHOA | 94714 | 1055430 |
|    |      | BITIS | 101559 | 1061454 |
|    |      | TSH | 104906 | 1063902 |
| 26 | W19 | TSH | 104906 | 1063902 |
|    |      | VTV | 102222 | 1070540 |
|    |      | TULTU | 94059 | 1065352 |
|    |      | LITAM | 85937 | 1064206 |
|    |      | CN | 84358 | 1063735 |
| 27 | M768 | AKMON | 81254 | 1101306 |
|    |      | MOXON | 84930 | 1092118 |
|    |      | DAGAG | 92748 | 1082630 |
|    |      | ELSAS | 100812 | 1073254 |
|    |      | ASEBO | 101954 | 1071724 |
|    |      | LOSON | 102936 | 1070432 |
|    |      | TSH | 104906 | 1063902 |
| 28 | L625 | AKMON | 81254 | 1101306 |
|    |      | UDOSI | 93249 | 1111053 |
|    |      | ALDAS | 105654 | 1121218 |
|    |      | AGSAM | 112818 | 1123518 |
|    |      | ANOKI | 122200 | 1131500 |
|    |      | ARESI | 135824 | 1142700 |
| 29 | N892 | MIGUG | 151624 | 1140000 |
|    |      | MESOX | 135848 | 1130242 |
|    |      | MUGAN | 122200 | 1115218 |
|    |      | MINUX | 111818 | 1110612 |
|    |      | MAPNO | 101306 | 1102006 |
|    |      | OSIXA | 93120 | 1095038 |
|    |      | MOXON | 84930 | 1092118 |
|    |      | MELAS | 70518 | 1080912 |
| 30 | Q15 | CRA | 115940 | 1091312 |
|    |      | ATVIT | 120826 | 1092946 |
|    |      | NITOM | 124431 | 1103825 |
|    |      | MESOX | 135848 | 1130242 |
| 31 | W15 | AC | 105621 | 1071118 |
|    |      | VETOM | 111359 | 1073627 |
|    |      | LKH | 114515 | 1082119 |
|    |      | SOSPA | 115002 | 1083827 |
|    |      | CRA | 115940 | 1091312 |
| 32 | N500 | TSH | 104906 | 1063902 |
|    |      | BUKMA | 105050 | 1070151 |
|    |      | MATGI | 105344 | 1073848 |
|    |      | PTH | 105541 | 1080419 |
|    |      | AGSIS | 110119 | 1084952 |
|    |      | DAMVO | 110630 | 1093242 |
|    |      | MIMUX | 111818 | 1110612 |
|    |      | AGSAM | 112818 | 1123518 |
|    |      | PANDI | 113806 | 1140000 |
| 33 | W12 | PCA | 135726 | 1090234 |
|    |      | NOBID | 131844 | 1083455 |
|    |      | BMT | 123959 | 1080723 |
|    |      | PATMA | 122011 | 1074836 |
|    |      | DONXO | 112524 | 1065706 |
|    |      | RUNOP | 110517 | 1063818 |
|    |      | MOXEP | 105358 | 1062746 |
|    |      | TRN | 100500 | 1054220 |
| 34 | Q7 | SADAS | 131912 | 1074946 |
|    |    | MUMGA | 140000 | 1080913 |
| 35 | M505 | BMT | 123959 | 1080723 |
|    |      | MULAD | 123253 | 1073429 |
| 36 | W7 | LKH | 114515 | 1082119 |
|    |    | ONEBI | 115617 | 1081831 |
|    |    | BMT | 123959 | 1080723 |
| 37 | L644 | AC | 105621 | 1071118 |
|    |      | LEDUP | 104633 | 1070849 |
|    |      | LOSON | 102936 | 1070432 |
|    |      | BODOD | 93822 | 1065129 |
|    |      | CN | 84358 | 1063735 |
|    |      | DUDIS | 70000 | 1064836 |
| 38 | R468 | PNH | 113238 | 1045038 |
|    |      | POPET | 110600 | 1055700 |
|    |      | SAPEN | 110112 | 1061100 |
|    |      | MOXEB | 105358 | 1062746 |
|    |      | TSH | 104906 | 1063902 |
| 39 | W18 | TRN | 100500 | 1054220 |
|    |      | QL | 91034 | 1051036 |
| 40 | W23 | TRN | 100500 | 1054220 |
|    |      | ANHOA | 94714 | 1055430 |
|    |      | VEPKI | 90621 | 1062225 |
|    |      | CONDA | 85726 | 1062829 |
|    |      | CN | 84358 | 1063735 |
| 41 | M510 | TRN | 100500 | 1054220 |
|    |      | POTIX | 101405 | 1053700 |
|    |      | ATGAS | 102417 | 1053102 |
|    |      | DADEM | 105344 | 1051341 |
| 42 | M755 | KISAN | 103220 | 1044030 |
|    |      | TUNPO | 100344 | 100344 |
|    |      | BITOD | 71524 | 1040706 |
| 43 | R588 | PLK | 140022 | 1080128 |
|    |      | GONLY | nằm giữa PLK → PNH, cách PLK 68NM | |
|    |      | PNH | 113238 | 1045038 |



### EXERCISE 1
# EXERCISE 1 (BẮT ĐẦU 03:00)

| No. | Callsign | MACH | Speed (KTS) | Điểm xuất hiện | Route | Điểm cuối | Giờ xuất hiện | Flight Level |
|-----|----------|-------|--------------|----------------|--------|-----------|---------------|-------------------------------|
| 1 | HVN1120 | 0.80 | 450 | TSH | TSH - AC - BMT - PLK | DAN | 03:03 | Hiện 0 và đang bay lên FL370 |
| 2 | HVN121 | 0.70 | 270 | TSH | TSH - SAPEN - POPET - PNH | PNH | 03:07 | Hiện 0 và đang bay lên FL180 |
| 3 | HVN853 | 0.82 | 480 | TSH | TSH - SAPEN - POPET - PNH | PNH | 03:10 | Hiện 0 và đang bay lên FL310 |
| 4 | VJC793 | 0.80 | 420 | PLK | PLK - BMT - AC - TSH | TSH | 03:00 | 280 |
| 5 | HVN1929 | 0.80 | 450 | PLK | PLK - BMT - AC - TSH | TSH | 03:03 | 320 |
| 6 | HVN465 | 0.68 | 270 | PNH | LKH - AC - TSH | TSH | 03:00 | 160 |
| 7 | JAL680 | 0.81 | 450 | PNH | PNH - POPET - SAPEN - TSH | TSH | 03:15 | 330 |
| 8 | BAV645 | 0.83 | 500 | PLK | PLK - BMT - AC - TSH - SAPEN - POPET - PNH | PNH | 03:01 | 340 |
| 9 | FDX5199 | 0.80 | 475 | PTH | PTH - BAOMY - TSH - SAPEN - POPET - PNH | PNH | 03:11 | 320 |


### EXERCISE 2
# EXERCISE 2 (BẮT ĐẦU 04:30)

| No. | Callsign | MACH | Speed (KTS) | Điểm xuất hiện | Route | Điểm cuối | Giờ xuất hiện | Flight Level |
|-----|----------|-------|--------------|----------------|--------|-----------|---------------|------------------------------|
| 1 | HVN1338 | 0.70 | 270 | TSH | TSH - AC - BMT | BMT | 04:31 | Hiện 0 và đang bay lên FL150 |
| 2 | JAL759 | 0.82 | 480 | TSH | TSH - BITIS - BIBAN | BIBAN | 04:35 | Hiện 0 và đang bay lên FL340 |
| 3 | HVN1214 | 0.80 | 450 | TSH | TSH - AC - BMT - PLK | DAN | 04:36 | Hiện 0 và đang bay lên FL370 |
| 4 | HVN757 | 0.80 | 420 | TSH | TSH - BITIS - BIBAN | BIBAN | 04:40 | Hiện 0 và đang bay lên FL280 |
| 5 | HVN1257 | 0.70 | 260 | PLK | PLK - BMT - AC - TSH | TSH | 04:24 | 200 |
| 6 | HVN1219 | 0.81 | 450 | PLK | PLK - BMT - AC - TSH | TSH | 04:29 | 320 |
| 7 | HVN1121 | 0.81 | 450 | PLK | PLK - BMT - AC - TSH | TSH | 04:30 | 360 |
| 8 | BAV862 | 0.83 | 475 | BIBAN | BIBAN - BITIS - TSH - AC - BMT - PLK | PLK | 04:30 | 330 |
| 9 | FDX3201 | 0.80 | 430 | BIBAN | BIBAN - BITIS - TSH - AC - BMT - PLK | PLK | 04:35 | 270 |
| 10 | VFC992 | 0.83 | 475 | ELSAS | ELSAS - TSH - SAPEN - POPET - PNH | PNH | 04:40 | 360 |



**Note:**
- Không cần để tên đường bay, để tên các Waypoints là được, đường bay là để nối các waypoint lại với nhau thôi
- Ký hiệu của các waypoints hiện trên map là hình tam giác rỗng (△), có viền, màu sắc sao cho tương phản với màu map và trùng với màu đường bay là được 