/**
 * Korean Translation Dictionary and helper functions for Student Oral Assessment
 */

export const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Narrative Prompt': '서사적 질문 (이야기하기)',
  'Descriptive Prompt': '묘사적 질문 (설명하기)',
  'Expository Prompt': '설명적 질문 (정보 전달)',
  'Argumentative Prompt': '논증적 질문 (주장과 이유)',
  'Persuasive Prompt': '설득적 질문 (설득하기)',
};

export const UI_TRANSLATIONS: Record<string, string> = {
  // Toolbar & Header
  'Student Oral Assessment App': '학생 구술 평가 앱',
  'Teacher Review': '교사 검토',
  'KR Subtitles': '한국어 자막',
  'Dark': '다크',
  'Light': '라이트',

  // Registration & Setup
  'Student Registration': '학생 등록',
  'Enter Student Name': '학생 이름을 입력하세요',
  'Select Grade Level': '학년을 선택하세요',
  'Parent / Student Consent': '보호자 / 학생 동의',
  'I consent to recording video & audio for assessment purposes': '평가를 위해 비디오 및 오디오 녹음에 동의합니다',
  'Question Timer Duration': '질문 타이머 시간',
  '30 Seconds': '30 초',
  '45 Seconds': '45 초',
  '60 Seconds (Default)': '60 초 (기본값)',
  '90 Seconds': '90 초',
  '120 Seconds': '120 초',
  'Untimed (No limit)': '시간 제한 없음',
  'Start Assessment': '평가 시작하기',
  'Grade 1': '1 학년',
  'Grade 2': '2 학년',
  'Grade 3': '3 학년',
  'Grade 4': '4 학년',
  'Grade 5': '5 학년',
  'Grade 6': '6 학년',

  // Centering Overlay Prompt
  'Please center yourself in the camera!': '카메라 중앙에 위치해 주세요!',
  'Look straight at the camera and make sure your head and shoulders fit nicely inside the outline.': '카메라를 정면으로 바라보고 머리와 어깨가 안내선 안에 들어오도록 해 주세요.',
  'Ready to Begin': '시작할 준비가 되었습니다',
  'Yes, I am Centered': '네, 중앙에 맞췄습니다',

  // Test Execution States
  'Ready to start question': '질문을 시작할 준비가 되었습니다',
  'Click Start Question to view your prompt and record your answer.': '질문 시작을 클릭하여 질문을 확인하고 답변을 녹음하세요.',
  'Start Question': '질문 시작하기',
  'Recording in progress...': '녹음 진행 중...',
  'Speak clearly into your microphone.': '마이크를 향해 명확하게 말씀해 주세요.',
  'Finish Answer': '답변 완료',
  'Time remaining': '남은 시간',
  'Unlimited time': '제한 없음',
  'Question': '질문',
  'of': '/',
  'Speech Volume': '음성 볼륨',
  'Live Transcript': '실시간 자막 (음성 인식)',
  'Listening for speech...': '음성을 듣고 있습니다...',

  // Completion
  'Assessment Completed!': '평가가 완료되었습니다!',
  'Great job! All questions have been answered and recorded successfully.': '수고하셨습니다! 모든 질문에 대한 답변이 성공적으로 녹음되었습니다.',
  'Submit Assessment': '평가 제출하기',
  'Start New Assessment': '새 평가 시작하기',
  'Review Submission': '제출 내역 검토',

  // Mascot tips
  'Hi there! I am your AI assessment assistant. Take a deep breath and speak clearly!': '안녕하세요! 저는 여러분의 AI 평가 도우미예요. 심호흡을 하고 천천히 명확하게 말해 보세요!',
  'Click "Start Question" when you are ready to read your question and record your voice!': '준비가 되면 "질문 시작하기"를 눌러 질문을 읽고 목소리를 녹음해 보세요!',
  'Great! Speak loudly and clearly. Take your time to express your thoughts!': '좋아요! 크고 명확하게 말해 보세요. 생각을 여유 있게 표현해 보세요!',
  'Awesome job! Click "Finish Answer" when you are done speaking.': '멋져요! 답변이 끝나면 "답변 완료"를 눌러 주세요.',
  'Hooray! You completed all questions. Don\'t forget to click Submit!': '만세! 모든 질문을 마쳤습니다. 잊지 말고 제출 버튼을 누르세요!',
};

// Map of exact question prompt strings to Korean translations
export const QUESTION_PROMPT_TRANSLATIONS: Record<string, string> = {
  // Grade 1
  "Can you tell me five weather words? (Like sunny, rainy...)": "날씨를 나타내는 단어 5개를 말해 줄 수 있나요? (예: 맑음, 비...)",
  "Can you tell me five shapes? (Like circle, square...)": "도형 5개의 이름을 말해 줄 수 있나요? (예: 동그라미, 세모...)",
  "Can you tell me five animals? (Like dog, cat...)": "동물 5마리의 이름을 말해 줄 수 있나요? (예: 강아지, 고양이...)",
  "Can you tell me five family members? (Like mother, father...)": "가족 구성원 5명을 말해 줄 수 있나요? (예: 엄마, 아빠...)",
  "Tell me about your morning routine.": "아침에 일어나서 하는 일(아침 루틴)에 대해 말해 보세요.",
  "Can you say five colors? (Like red, blue...)": "색깔 5가지를 말해 줄 수 있나요? (예: 빨강, 파랑...)",
  "Can you say five things you wear?": "입거나 착용하는 옷/물건 5가지를 말해 줄 수 있나요?",
  "What are five rooms in a house?": "집 안에 있는 방/공간 5곳은 어디인가요?",
  "What are five things you use at school? (Like pencil, book...)": "학교에서 사용하는 물건 5가지를 말해 보세요. (예: 연필, 책...)",
  "What are five things you see outside?": "야외에서 볼 수 있는 물건/자연물 5가지는 무엇인가요?",
  "Do you like chocolate or vanilla ice cream more? Why?": "초콜릿 아이스크림과 바닐라 아이스크림 중 어느 것을 더 좋아하나요? 이유는 무엇인가요?",
  "How do you wash your hands?": "손을 어떻게 씻는지 설명해 보세요.",
  "How do you make a peanut butter sandwich?": "땅콩버터 샌드위치를 어떻게 만드는지 설명해 보세요.",
  "How do you brush your teeth?": "양치질을 어떻게 하는지 설명해 보세요.",
  "How do you tie your shoes?": "신발끈을 어떻게 매는지 설명해 보세요.",
  "Is it better to have a cat or a dog? Why?": "고양이와 강아지 중 어떤 키우는 것이 더 좋은가요? 이유를 말해 보세요.",
  "Should bedtime be earlier or later? Why?": "취침 시간은 더 빨라져야 할까요, 더 늦어져야 할까요? 이유를 말해 보세요.",
  "Do you prefer summer or winter? Give reasons.": "여름과 겨울 중 어느 계절을 더 좋아하나요? 이유를 들어 설명해 보세요.",
  "Is it better to play inside or outside? Why?": "실내에서 노는 것과 야외에서 노는 것 중 어느 것이 더 좋나요? 이유를 말해 보세요.",
  "Can you name five toys or games?": "장난감이나 게임 5가지의 이름을 말해 줄 수 있나요?",
  "Can you name five vegetables?": "채소 5가지의 이름을 말해 줄 수 있나요?",
  "Can you count from one to ten?": "1부터 10까지 숫자를 세어 줄 수 있나요?",
  "Can you name five body parts? (Like head, hand...)": "신체 부위 5가지의 이름을 말해 줄 수 있나요? (예: 머리, 손...)",
  "Can you say the days of the week?": "요일(월~일)을 순서대로 말해 줄 수 있나요?",
  "What does your teacher look like?": "선생님의 모습이나 생김새를 설명해 보세요.",

  // Grade 2
  "Tell me about a fun day you had.": "즐거웠던 하루에 대해 이야기해 보세요.",
  "Tell me about your best friend.": "가장 친한 친구에 대해 이야기해 보세요.",
  "Tell your parents why you need a pet. Promise to care for it.": "부모님께 반려동물이 필요한 이유를 설명하고 잘 돌보겠다고 약속해 보세요.",
  "Tell a story about a memorable trip or weekend adventure with your family.": "가족과 함께한 기억에 남는 여행이나 주말 모험 이야기를 해 보세요.",
  "Describe a time you lost something important and how you searched for it.": "중요한 물건을 잃어버렸을 때와 그것을 어떻게 찾았는지 설명해 보세요.",
  "Describe your best friend. What do they look like?": "가장 친한 친구의 생김새와 특징을 설명해 보세요.",
  "Describe your house. How many rooms are there?": "여러분의 집을 설명해 보세요. 방은 몇 개가 있나요?",
  "Describe your favorite place to go.": "가장 좋아하는 장소를 설명해 보세요.",
  "Describe your school playground. What equipment and areas are there?": "학교 놀이터의 기구와 공간들을 설명해 보세요.",
  "Describe your favorite book character. What do they look like and wear?": "가장 좋아하는 책 속 등장인물의 외모와 옷차림을 설명해 보세요.",
  "How do you get to school from home?": "집에서 학교까지 어떻게 가는지 설명해 보세요.",
  "How do you cross the street safely?": "길을 안전하게 건너는 방법에 대해 설명해 보세요.",
  "How do you make your bed?": "이불과 침대를 어떻게 정리하는지 설명해 보세요.",
  "How do you play your favorite game?": "가장 좋아하는 게임의 규칙과 하는 방법을 설명해 보세요.",
  "How do you take care of a pet?": "반려동물을 어떻게 돌보아야 하는지 설명해 보세요.",
  "Should schools have longer recess? Why?": "학교 쉬는 시간이 더 길어져야 할까요? 이유를 설명해 보세요.",
  "Should children have homework? Why or why not?": "어린이들에게 숙제가 있어야 할까요? 찬성/반대 이유를 말해 보세요.",
  "Should students wear uniforms? Give reasons.": "학생들이 교복을 입어야 할까요? 이유를 들어 말해 보세요.",
  "Is it better to read books or watch TV? Why?": "책을 읽는 것과 TV를 보는 것 중 어느 것이 더 좋나요? 이유를 설명해 보세요.",
  "Should kids help with chores at home? Why?": "어린이들이 집안일을 도와야 할까요? 이유를 설명해 보세요.",
  "What can you see from your window?": "창밖으로 무엇이 보이는지 설명해 보세요.",
  "What does your classroom look like?": "교실 풍경과 모습을 설명해 보세요.",
  "What did you do last weekend?": "지난 주말에 무엇을 했는지 이야기해 보세요.",
  "What happened on your birthday?": "지난 생일에 어떤 일이 있었는지 이야기해 보세요.",
  "Convince friends that reading is fun. Compare to TV time.": "친구들에게 독서가 TV 시청만큼 재미있다는 것을 설득해 보세요.",

  // Grade 3
  "Tell me about your favorite story or movie. What happens?": "가장 좋아하는 이야기나 영화의 줄거리를 설명해 보세요.",
  "Tell me about a time you were happy.": "가장 행복했던 순간에 대해 이야기해 보세요.",
  "Tell a story about a time you tried something difficult and succeeded.": "어려운 일에 도전해서 성공했던 경험 이야기를 해 보세요.",
  "Describe an exciting mystery or puzzle you solved with a friend.": "친구와 함께 해결한 흥미진진한 수수께끼나 문제에 대해 설명해 보세요.",
  "Tell a story about a science experiment that went differently than expected.": "생각했던 것과 다르게 진행되었던 과학 실험 이야기를 해 보세요.",
  "Describe your favorite place to play. What makes it fun?": "가장 좋아하는 놀이 장소와 그곳이 왜 재미있는지 설명해 보세요.",
  "Describe a perfect day. What's the weather like?": "여러분이 생각하는 완벽한 하루의 날씨와 일과를 설명해 보세요.",
  "Describe what you see at a park or playground.": "공원이나 놀이터에서 볼 수 있는 풍경을 설명해 보세요.",
  "Describe a time you helped someone.": "누군가를 도와주었던 경험에 대해 설명해 보세요.",
  "Describe a bustling farmers market or grocery store full of fresh items.": "신선한 물건들로 가득 찬 활기찬 전통시장이나 마트 풍경을 설명해 보세요.",
  "How does a plant grow? What does it need?": "식물은 어떻게 자라나요? 자라는 데 무엇이 필요한가요?",
  "How do you make a simple meal like scrambled eggs?": "스크램블 에그 같은 간단한 요리를 만드는 방법을 설명해 보세요.",
  "How do bees make honey?": "꿀벌은 어떻게 꿀을 만드는지 설명해 보세요.",
  "How do you organize your school bag?": "책가방을 어떻게 정리하는지 설명해 보세요.",
  "Why is recycling important? How do we do it?": "재활용이 왜 중요한가요? 우리는 어떻게 재활용을 해야 하나요?",
  "Should students use phones in school? Why or why not?": "학생들이 학교에서 스마트폰을 사용해야 할까요? 이유를 말해 보세요.",
  "Is it better to live in a city or countryside? Why?": "도시와 시골 중 어디에 사는 것이 더 좋은가요? 이유를 설명해 보세요.",
  "Should everyone learn a second language? Why?": "모든 사람이 외국어를 배워야 할까요? 이유를 설명해 보세요.",
  "Should junk food be banned in schools? Why?": "학교에서 정크푸드(인스턴트 식품)를 금지해야 할까요? 이유를 설명해 보세요.",
  "Is it better to have many friends or few close ones?": "친구를 많이 두는 것과 깊은 친구 몇 명을 두는 것 중 어느 것이 더 좋나요?",
  "What do you like to do on holidays?": "휴일이나 명절에 무엇을 하는 것을 좋아하나요?",
  "If you found $10, what would you do?": "길에서 10달러(또는 1만원)를 찾는다면 어떻게 할 건가요?",
  "Convince your teacher to plan a field trip. List learning benefits.": "선생님께 현장학습(체험학습)을 가자고 학습 효과를 들어 설득해 보세요.",
  "Persuade your local community leader to build a new skateboard or bike park.": "지역 대표에게 새로운 스케이트보드나 자전거 공원을 지어달라고 설득해 보세요.",
  "Convince your teacher to take the class on a field trip to a science museum.": "선생님께 과학관으로 학급 현장학습을 가자고 설득해 보세요.",

  // Grade 4
  "Tell me about a time you were scared. What happened?": "무서웠던 경험과 무슨 일이 있었는지 이야기해 보세요.",
  "Tell a story about a challenge your team faced during a sports game or contest.": "스포츠 경기나 대회에서 팀이 겪은 도전 과제에 대한 이야기를 해 보세요.",
  "Describe a historical event from the perspective of someone living back then.": "당시를 살았던 사람의 시선에서 역사적 사건을 설명해 보세요.",
  "Tell a story about finding a strange object in your backyard or park.": "마당이나 공원에서 이상한 물건을 발견했던 이야기를 해 보세요.",
  "Describe a day when technology stopped working and how you adapted.": "전자기기/기술이 작동하지 않았던 하루와 이에 어떻게 적응했는지 설명해 보세요.",
  "Describe your ideal bedroom. What would be in it?": "여러분이 꿈꾸는 이상적인 방의 모습을 설명해 보세요.",
  "Describe walking through a forest. What do you notice?": "숲속을 거니는 풍경과 무엇이 느껴지는지 설명해 보세요.",
  "Describe a problem you solved. How did you do it?": "해결했던 문제와 그 해결 과정에 대해 설명해 보세요.",
  "Describe a dense forest in autumn as the leaves change color and fall.": "단풍이 들고 낙엽이 떨어지는 가을의 울창한 숲을 설명해 보세요.",
  "Describe the atmosphere inside a crowded stadium during a championship match.": "결승전 경기가 열리는 붐비는 경기장 안의 열기 분위기를 설명해 보세요.",
  "Is social media good or bad for teenagers? Why?": "소셜 미디어(SNS)는 청소년에게 좋은가요, 나쁜가요? 이유를 말해 보세요.",
  "Are video games educational or harmful? Why?": "비디오 게임은 교육적인가요, 해로운가요? 이유를 설명해 보세요.",
  "How does rain form? Explain the water cycle.": "비는 어떻게 형성되나요? 물의 순환 과정을 설명해 보세요.",
  "How do you prepare for a test?": "시험을 어떻게 준비하고 공부하는지 설명해 보세요.",
  "How does a bicycle work? What makes it move?": "자전거는 어떤 원리로 작동하고 움직이는지 설명해 보세요.",
  "Should animals be kept in zoos? Why or why not?": "동물을 동물원에 두어야 할까요? 찬반 의견과 이유를 말해 보세요.",
  "Should school start later in the morning? Why?": "등교 시간이 아침에 더 늦춰져야 할까요? 이유를 설명해 보세요.",
  "Should everyone do community service? Why?": "모든 사람이 봉사활동을 해야 할까요? 이유를 설명해 보세요.",
  "What does your school look like to a visitor?": "방문객의 눈에 보이는 여러분 학교의 모습은 어떤가요?",
  "Ask teacher to accept creative project format. Link to learning goals.": "학습 목표와 연계하여 창의적인 프로젝트 형식의 과제를 허용해달라고 선생님께 요청해 보세요.",
  "Imagine you're at the beach. What do you see, hear, and feel?": "해변에 있다고 상상해 보세요. 무엇이 보이고, 들리고, 느껴지나요?",
  "What's the atmosphere like at a birthday party?": "생일 파티장의 분위기는 어떤가요?",
  "If you could visit any country, where would you go?": "어느 나라든 방문할 수 있다면 어디로 가고 싶나요?",
  "What would you do if you won a lot of money?": "복권이나 큰돈이 생긴다면 무엇을 하고 싶나요?",
  "Persuade your class to join a charity walk. Appeal to helping others and team spirit.": "타인 돕기와 팀워크를 강조하여 학급 친구들에게 자선 걷기 대회 참여를 설득해 보세요.",

  // Grade 5
  "Tell me about a difficult choice you had to make.": "어려운 결정을 내려야 했던 순간에 대해 이야기해 보세요.",
  "Describe a time when things didn't go as planned.": "계획대로 일이 진행되지 않았던 경험에 대해 설명해 보세요.",
  "Tell me about a time you learned an important lesson.": "중요한 교훈을 얻었던 경험에 대해 이야기해 보세요.",
  "Tell a story about a moment when you had to show courage in a difficult situation.": "어려운 상황에서 용기를 내야 했던 순간에 대한 이야기를 해 보세요.",
  "Describe a memorable mentor or teacher who changed how you think.": "여러분의 사고방식을 바꾸어 준 기억에 남는 스승이나 멘토를 설명해 보세요.",
  "Describe a busy market. What sights, sounds, and smells do you notice?": "붐비는 시장의 시각, 청각, 후각적 풍경을 설명해 보세요.",
  "Describe your favorite season. How does it affect everything?": "가장 좋아하는 계절과 그 계절이 주변 환경에 미치는 영향을 설명해 보세요.",
  "Describe a festival in your country. What's the atmosphere?": "우리나라의 축제와 그 현장의 분위기를 설명해 보세요.",
  "Describe a starry night sky viewed from a high mountain or remote area.": "높은 산이나 외딴곳에서 바라본 별이 빛나는 밤하늘을 설명해 보세요.",
  "Describe the bustling environment of an international airport terminal.": "국제공항 터미널의 활기차고 분주한 환경을 설명해 보세요.",
  "Is technology making us smarter or lazier? Why?": "기술의 발전은 우리를 더 똑똑하게 만드나요, 아니면 더 게으르게 만드나요?",
  "How does the internet work? How does information travel?": "인터넷은 어떻게 작동하며 정보는 어떻게 이동하는지 설명해 보세요.",
  "How do plants make their own food? Explain photosynthesis.": "식물은 어떻게 스스로 양분을 만드나요? 광합성을 설명해 보세요.",
  "How do you make an important decision?": "중요한 결정을 내릴 때 어떤 과정을 거치는지 설명해 보세요.",
  "How does electricity get to your home?": "전기가 어떻게 여러분의 집까지 도달하는지 설명해 보세요.",
  "Should grades determine a student's future? Why or why not?": "성적이 학생의 미래를 결정해야 할까요? 이유를 말해 보세요.",
  "Should plastic be completely banned? Why?": "플라스틱 사용을 전면 금지해야 할까요? 이유를 설명해 보세요.",
  "Is it better to work hard or work smart? Why?": "열심히 일하는 것과 스마트하게 일하는 것 중 어느 것이 더 중요한가요?",
  "Should space exploration be a priority? Why?": "우주 탐사가 우선순위가 되어야 할까요? 이유를 설명해 보세요.",
  "Paint a picture with words of sunrise or sunset.": "일출이나 일몰의 장관을 글로 묘사해 보세요.",
  "What's it like at the top of a tall building?": "높은 빌딩의 전망대 정상에서 바라보는 느낌은 어떤가요?",
  "If you could change one thing about your past, what would it be?": "과거의 일 중 한 가지를 바꿀 수 있다면 무엇을 바꾸고 싶나요?",
  "What would life be like if phones didn't exist?": "스마트폰이 존재하지 않는다면 우리의 삶은 어떨까요?",
  "Persuade school board to change lunch menu. Use health data and student surveys.": "건강 데이터와 설문조사를 바탕으로 학교 급식 메뉴 변경을 교육위원회에 설득해 보세요.",
  "Convince family to adopt eco-friendly habits. Present cost and planet benefits.": "비용 절감과 환경 보호 이점을 들어 가족들에게 친환경 습관 실천을 설득해 보세요.",

  // Grade 6
  "Should artificial intelligence replace human jobs? Why or why not?": "인공지능(AI)이 인간의 직업을 대체해야 할까요? 찬반 의견을 말해 보세요.",
  "Describe a cityscape at night. What story does it tell?": "도시의 밤 풍경과 그 야경이 담고 있는 이야기를 묘사해 보세요.",
  "Tell me about a belief you've changed over time.": "시간이 지나면서 바뀐 여러분의 신념이나 생각이 있다면 이야기해 보세요.",
  "Tell a story about a major transition, such as moving to a new school or community.": "전학이나 이사 등 큰 환경 변화를 겪었던 이야기를 해 보세요.",
  "Describe an ethical dilemma you faced and how you decided on the right path.": "직면했던 도덕적 고민과 올바른 길을 선택했던 과정을 설명해 보세요.",
  "Describe a place that made you feel peaceful. What created that feeling?": "마음의 평화를 느꼈던 장소와 무엇이 그런 느낌을 만들었는지 설명해 보세요.",
  "How would you describe the feeling of nostalgia?": "'향수(그리움)'라는 감정을 어떻게 설명할 수 있을까요?",
  "Describe how a piece of music makes you feel.": "어떤 음악을 들을 때 느껴지는 감정을 설명해 보세요.",
  "Describe a moral dilemma you've faced. How did you resolve it?": "겪었던 도덕적 갈등과 이를 어떻게 해결했는지 설명해 보세요.",
  "Describe a high-tech laboratory where scientists conduct cutting-edge research.": "첨단 연구가 이루어지는 최첨단 과학 실험실의 풍경을 설명해 보세요.",
  "Is privacy more important than security? Why?": "개인정보 보호(프라이버시)가 국가 안보/보안보다 더 중요한가요?",
  "Should wealthy countries help developing nations? How much?": "부유한 국가들이 개발도상국을 도와야 할까요? 어느 정도 도와야 하나요?",
  "How does an airplane fly? Explain the principles.": "비행기는 어떻게 하늘을 날 수 있나요? 비행 원리를 설명해 보세요.",
  "How does sleep affect your brain and body?": "수면이 뇌와 신체 건강에 미치는 영향에 대해 설명해 보세요.",
  "How do governments make laws?": "정부와 국회는 어떻게 법을 만드는지 설명해 보세요.",
  "Is economic growth more important than environmental protection?": "경제 성장과 환경 보호 중 어느 것이 더 중요한가요?",
  "Should genetic modification of humans be allowed?": "인간에 대한 유전자 변형을 허용해야 할까요?",
  "Persuade investors to fund your startup idea. Present market research and vision.": "시장 조사와 비전을 제시하여 투자자들에게 스타트업 투자를 유치해 보세요.",
  "Ask for promotion at work. Quantify achievements and future contributions.": "성과 지표와 미래 기여도를 들어 직장에서 승진을 요청해 보세요.",
  "Convince community to support renewable energy. Address concerns and benefits.": "우려사항과 이점을 설명하여 지역 사회에 재생 에너지 지원을 설득해 보세요.",
  "What does \"home\" feel like beyond physical description?": "단순한 건물을 넘어 '집(Home)'이 주는 의미와 느낌은 무엇인가요?",
  "What would happen if people could read minds?": "사람들이 타인의 마음을 읽을 수 있게 된다면 어떤 일이 벌어질까요?",
  "If you could relive one day, which would it be and what would you change?": "단 하루를 다시 살 수 있다면 어느 날을 다시 살고 싶고 무엇을 바꾸고 싶나요?",
  "Convince school to implement mental health programs. Use statistics and testimonials.": "통계와 사례를 제시하여 학교에 정신 건강 지원 프로그램을 도입하도록 설득해 보세요.",
  "Persuade government officials on policy change. Balance multiple stakeholder interests.": "이해관계자들의 균형을 고려하여 정부 당국자에게 정책 변화를 설득해 보세요."
};

/**
 * Returns Korean translation for UI text strings, falling back to original string if not found.
 */
export function getUITranslation(text: string): string {
  if (!text) return text;
  return UI_TRANSLATIONS[text] || text;
}

/**
 * Returns Korean translation for Category Labels
 */
export function getCategoryTranslation(categoryLabel: string): string {
  if (!categoryLabel) return categoryLabel;
  return CATEGORY_TRANSLATIONS[categoryLabel] || categoryLabel;
}

/**
 * Returns Korean translation for Question Prompts
 */
export function getQuestionTranslation(promptText: string): string {
  if (!promptText) return promptText;
  if (QUESTION_PROMPT_TRANSLATIONS[promptText]) {
    return QUESTION_PROMPT_TRANSLATIONS[promptText];
  }
  
  // Fallback pattern matching for common prompt structures
  if (promptText.startsWith("Can you tell me five")) {
    return "5가지를 말해 줄 수 있나요?";
  }
  if (promptText.startsWith("Tell me about")) {
    return "에 대해 이야기해 보세요.";
  }
  if (promptText.startsWith("Describe")) {
    return "에 대해 설명해 보세요.";
  }
  if (promptText.startsWith("How do you")) {
    return "어떻게 하는지 설명해 보세요.";
  }
  if (promptText.startsWith("Should")) {
    return "해야 할까요? 이유를 설명해 보세요.";
  }

  return promptText;
}
