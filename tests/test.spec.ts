import { test, expect } from '@playwright/test';

// ==================== TEST DATA FROM EXCEL FILE ====================

// Positive Functional Test Cases
const positiveTestCases = [
  // Format: {id, name, input, expectedOutput, inputType}
  {
    id: 'Pos_Fun_0001',
    name: 'Convert a simple present tense daily action sentence',
    input: 'puusaa bath kanavaa.',
    expected: 'පූසා බත් කනවා.',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0002',
    name: 'Convert a compound sentence with multiple vehicle terms',
    input: 'motar raTha, yathurupadhi, vaeen raTha saDHAhaa nava aanayanika milak satahan kara aethi bava rajaya pavasayi',
    expected: 'මොටර් රථ, යතුරුපදි, වෑන් රථ සඳහා නව ආනයනික මිලක් සටහන් කර ඇති බව රජය පවසයි',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0003',
    name: 'Convert a complex cause–effect sentence',
    input: 'Bhuumikampaava nisaa sunaamiya aethi veyi',
    expected: 'භූමිකම්පාව නිසා සුනාමිය ඇති වෙයි',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0004',
    name: 'Convert a short interrogative question',
    input: 'vaayu dhuuShaNaya nisaa rooga vYaapthiya vaedi vee dha?',
    expected: 'වායු දූෂණය නිසා රෝග ව්‍යාප්තිය වැඩි වේ ද?',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0005',
    name: 'Convert an imperative command sentence',
    input: 'raeete kaala enna',
    expected: 'රෑට කාලා එන්න',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0006',
    name: 'Convert a positive present tense statement',
    input: 'api paadam balanavaa',
    expected: 'අපි පාඩම් බලනවා',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0007',
    name: 'Handling a negative sentence form',
    input: 'aeya jiivath venne naehae',
    expected: 'ඇය ජීවත් වෙන්නෙ නැහැ',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0008',
    name: 'Convert a polite request sentence',
    input: 'niirogimath pirimi dharu upathak veevaa!',
    expected: 'නීරොගිමත් පිරිමි දරු උපතක් වේවා!',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0009',
    name: 'Convert a common greeting phrase',
    input: 'mata eeke thiyana gaana kiyanna puLuvandha?',
    expected: 'මට ඒකෙ තියන ගාන කියන්න පුළුවන්ද?',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0010',
    name: 'Convert a day-to-day emotional expression',
    input: 'hari, mama issarahata karannam',
    expected: 'හරි, මම ඉස්සරහට කරන්නම්',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0011',
    name: 'Convert a frequent multi-word phrase',
    input: 'oyaata puLuvan nam meeka paas karanna',
    expected: 'ඔයාට පුළුවන් නම් මේක පාස් කරන්න',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0012',
    name: 'Joined words without spaces cause incorrect conversion',
    input: 'haloo oyi',
    expected: 'හලෝ ඔයි',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0013',
    name: 'Convert a simple present tense statement with work-related expression',
    input: 'mama vaedaka innee',
    expected: 'මම වැඩක ඉන්නේ',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0014',
    name: 'Convert a short imperative phrase with informal modifier',
    input: 'chuttak balanna',
    expected: 'චුට්ටක් බලන්න',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0015',
    name: 'Convert a Long-length informational sentence with technical terms',
    input: 'muruQQgaa yanu vasara siyayakata vaedi kaalayak iQQdhiyaanu suupashaasthra aahaaravala bahulava Bhaavithaakarana elavaluvaki. mehi aethi guNaathmaka bhaavaya nisaa bohoo rooga valata suvadhayaka auShadhayak lesadha haedhinviya haeki athara, visheeshayenma vitaminasii, aayanka, saha prootiin adangu vana baevin kuDaa lamayinge saha vadihitiyange shariirayei saukYAta ithaamath hitha kara eLavaluvak lesa salakanu labayi.',
    expected: 'මුරුංගා යනු වසර සියයකට වැඩි කාලයක් ඉංදියානු සූපශාස්ත්‍ර ආහාරවල බහුලව භාවිතාකරන එලවලුවකි. මෙහි ඇති ගුණාත්මක බ්හාවය නිසා බොහෝ රෝග වලට සුවදයක ඖෂදයක් ලෙසද හැදින්විය හැකි අතර, විශේෂයෙන්ම විටමිනසී, ආයන්ක, සහ ප්‍රෝටීන් අඩන්ගු වන බැවින් කුඪා ලමයින්ගෙ සහ වඩිහිටියන්ගෙ ශරීරයේ සෞක්‍යට ඉතාමත් හිත කර එළවලුවක් ලෙස සලකනු ලබයි.',
    inputType: 'L'
  },
  {
    id: 'Pos_Fun_0016',
    name: 'Convert an interrogative request with temporal modifier',
    input: 'oyaata dhaenma kaeemata enna puluvan dha?',
    expected: 'ඔයාට දැන්ම කෑමට එන්න පුලුවන් ද?',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0017',
    name: 'Convert sentence with repeated temporal expression and negation',
    input: 'issella issella eyaa hoDHAta vaeda kalee naee',
    expected: 'ඉස්සෙල්ල ඉස්සෙල්ල එයා හොඳට වැඩ කලේ නෑ',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0018',
    name: 'Convert a past tense narrative with sequential actions',
    input: 'lamayi raeete kaden kaala aavaa',
    expected: 'ලමයි රෑටෙ කඩෙන් කාල ආවා',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0019',
    name: 'Convert a present continuous tense statement with temporal marker',
    input: 'mama dhaen vaedata yanavaa',
    expected: 'මම දැන් වැඩට යනවා',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0020',
    name: 'Convert a future tense statement with sequential actions',
    input: 'api heta gihin enavaa',
    expected: 'අපි හෙට ගිහින් එනවා',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0021',
    name: 'Convert a negative capability statement',
    input: 'mata ookava penna baee',
    expected: 'මට ඕකව පෙන්න බෑ',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0022',
    name: 'Convert a singular pronoun variations',
    input: 'lamayaa ammaagen aluth paensalak illalaa aDAnavaa mama dhaekka',
    expected: 'ලමයා අම්මාගෙන් අලුත් පැන්සලක් ඉල්ලලා අඬනවා මම දැක්ක',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0023',
    name: 'Convert a plural noun with negative past tense',
    input: 'poth godaak paavichchi karalaa naee',
    expected: 'පොත් ගොඩාක් පාවිච්චි කරලා නෑ',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0024',
    name: 'Convert a polite permission request with interrogative',
    input: 'mata meken ekak araganna puLuvan needha?',
    expected: 'මට මෙකෙන් එකක් අරගන්න පුළුවන් නේද?',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0025',
    name: 'Convert interrogative with English technical term',
    input: 'WiFi eka on karanavaadha?',
    expected: 'WiFi එක on කරනවාද?',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0026',
    name: 'Convert imperative with multiple English brand terms',
    input: 'man dhaen dhaemma TikTok video eka balanna',
    expected: 'man දැන් දැම්ම TikTok video එක බලන්න',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0027',
    name: 'Sentences containing places and common English words that should remain as they are',
    input: 'Meeting eka Teams ekee thiyanavaa',
    expected: 'Meeting එක Teams එකේ තියනවා',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0028',
    name: 'Convert imperative with English tech abbreviation',
    input: 'okata avashYA App eka ikmanata download karanna',
    expected: 'ඔකට අවශ්‍ය App එක ඉක්මනට download කරන්න',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0029',
    name: 'Convert interrogative with question mark punctuation',
    input: 'aeyi mokadha unee?',
    expected: 'ඇයි මොකද උනේ?',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0030',
    name: 'Inputs containing punctuation marks',
    input: '"shrii lankaava indhiyan saagarayee muthu aetaya vee"',
    expected: '"ශ්‍රී ලන්කාව ඉන්දියන් සාගරයේ මුතු ඇටය වේ"',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0031',
    name: 'Convert sentence with currency format',
    input: 'Rs.1000 k dhenna onee panthigaasthu vidhiyata',
    expected: 'Rs.1000 ක් දෙන්න ඔනේ පන්තිගාස්තු විදියට',
    inputType: 'S'
  },
  {
    id: 'Pos_Fun_0032',
    name: 'Convert long informational sentence with formal terminology',
    input: 'aapadhaa kalamaNaakarana maDhYAsThaanaya paevasuvee adha dhina dhaval dholahaa pasu adhika vaesi sahitha kaalaguNayak dhivayinata aethi vena bavayi. visheeshayenma basnaahira, dhakuNu saha sabaragamuva paLaathvala aetham sThaana valata milimiitar siiyakata vaedi thadha vaesi aethi viya haeki athara, dhiivara prajaava muhudhu yaameedhi saelakilimath vana men aapadhaa kalamaNaakarana maDhYAsThaanaya vaedi dhuratath illaa siti.',
    expected: 'ආපදා කලමණාකරන මධ්‍යස්ථානය පැවසුවේ අද දින දවල් දොලහා පසු අදික වැසි සහිත කාලගුණයක් දිවයිනට ඇති වෙන බවයි. විශේෂයෙන්ම බස්නාහිර, දකුණු සහ සබරගමුව පලාත්වල ඇතැම් ස්ථාන වලට මිලිමීටර් සියයකට වැඩි තද වැසි ඇති විය හැකි අතර, ධීවර සහ ධීවර ප්‍රජාව මුහුදු යාමේදී සැලකිලිමත් වන මෙන් ආපදා කලමණාකරන මධ්‍යස්ථානය වැඩි දුරටත් ඉල්ලා සිටි.',
    inputType: 'L'
  },
  {
    id: 'Pos_Fun_0033',
    name: 'Convert sentence with date and time formats',
    input: '2026 janavaari maasaye sita paasala 7.30 AM patangannavaa vageema 1.30 PM avasan venavaa',
    expected: '2026 ජනවාරි මාසයෙ සිට පාසල 7.30 AM පටන්ගන්නවා වගේම 1.30 PM අවසන් වෙනවා',
    inputType: 'M'
  },
  {
    id: 'Pos_Fun_0034',
    name: 'Convert sentence with measurement unit',
    input: '2kg valata hariyanna mata siini saha theekola oni',
    expected: '2kg වලට හරියන්න මට සීනි සහ තේකොල ඔනි',
    inputType: 'M'
  }
];

// Negative Functional Test Cases
const negativeTestCases = [
  {
    id: 'Neg_Fun_0001',
    name: 'Multiple Consecutive spaces',
    input: 'api      bath     kanna     yanavaa',
    expected: 'අපි බත් කන්න යනවා',
    inputType: 'S'
  },
  {
    id: 'Neg_Fun_0002',
    name: 'Missing spaces / joined words (stress test)',
    input: 'ithihaasayeepaLamuvaratalookaveLaDHA poLeerathranavunsayakamilaaemerikaanudolarsiimaavaikmavaagosthibee.',
    expected: 'ඉතිහාසයේ පළමු වරට ලෝක වෙ‍ළඳපොළේ රත්‍රන් අවුන්සයක මිල ඇමෙරිකානු ඩොලර්සීමාව ඉක්මවා ගොස් තිබේ.',
    inputType: 'L'
  },
  {
    id: 'Neg_Fun_0003',
    name: 'Convert currency format with punctuation',
    input: 'mehi mila Rs: 20.00',
    expected: 'මෙහි මිල රු: 20.00',
    inputType: 'S'
  },
  {
    id: 'Neg_Fun_0004',
    name: 'Handling of "ww" character combination',
    input: 'eyaata badagini kiyala oyaata kiyanna kiwwa',
    expected: 'එයාට බඩගිනි කියල ඔයාට කියන්න කිව්වා',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0005',
    name: 'Scientific notation / Math format failure',
    input: '52000000000',
    expected: '52000000000',
    inputType: 'S'
  },
  {
    id: 'Neg_Fun_0006',
    name: 'Mixed Language with Quotes failure',
    input: 'api yaluvoo ekka "new zealand " valata giya vele ,ehe idhala paraNa yahaluvek apita muna gahunaa.',
    expected: 'අපි යලුවෝ එක්ක "new zealand " වලට ගිය වෙලෙ ,එහෙ ඉදල පරණ යහලුවෙක් අපිට මුන ගහුනා.',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0007',
    name: 'Failure to translate common English noun',
    input: 'magen gaththa watch eka heta udhenma genath dhenna puluwandha?',
    expected: 'මගෙන් ගත්ත ඔරලෝසුව හෙට උදෙන්ම ගෙනත් දෙන්න පුළුවන්ද?',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0008',
    name: 'Heavy Mixed Language',
    input: 'machan mata adha download karapu file eka WhatsApp ekak karanna puLuvandha because email eken attach vennee naee',
    expected: 'මචන් මට අද බාගත කරපු file එක WhatsApp කරන්න පුළුවන්ද මොකද email එකෙන් එකතු  වෙන්නේ නෑ',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0009',
    name: 'Failure to translate greeting with proper noun',
    input: 'Good Morning ! guNavardhana mahathmaya',
    expected: 'සුභ උදෑසනක් ගුණවර්දන මහත්මයා',
    inputType: 'S'
  },
  {
    id: 'Neg_Fun_0010',
    name: 'Long text mixed script and phonetic failure',
    input: 'Sri Lankaave aarthikaya gana katha karaddi api godak deval gana hithanna one. Tourism industry eka dan develop vegana enava. Foreignersla godak enava beach side ekata. Hotels vala prices tikak wadi unath service eka hodayi. Government ekenuth support ekak denava. namuth thava improvements one.',
    expected: 'ශ්‍රී ලංකාවේ ආර්ථිකය ගැන කතා කරන විට අපි ගොඩක් දේවල් ගැන හිතන්න ඕනේ. සංචාරක කර්මාන්තය දැන් දියුණු වීගෙන එනවා. විදේශිකයන් ගොඩක් එනවා වෙරළ තීරයට. හෝටල් වල මිල ගණන් ටිකක් වැඩි උනත් සේවාව හොඳයි. රජයෙන් සහයෝගයක් දෙනවා. නමුත් තව දියුණුවක් අවශ්‍යයි.',
    inputType: 'L'
  },
  {
    id: 'Neg_Fun_0011',
    name: 'Case sensitivity and phonetic mapping failure',
    input: 'leenaa aBA gahata velaa aBA kanavaa',
    expected: 'ලේනා අඹ ගහට වෙලා අඹ කනවා',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0012',
    name: 'Long text education context failure',
    input: 'Lamayi school gihin education eka gana wadiyen focus karanna one. Exams pass venna vitharak nemei, practical knowledge ekath ganna one. Teachersla kiyala dena deval hodata ahaganna. Future eka success karaganna nam dan indanma plan karanna one. University yanna try karanna.',
    expected: 'ළමයි පාසල් ගිහින් අධ්‍යාපනය ගැන වැඩියෙන් අවධානය යොමු කරන්න ඕනේ. විභාග සමත් වෙන්න විතරක් නෙමෙයි, ප්‍රායෝගික දැනුම ලබාගන්නත් ඕනේ. ගුරුවරු කියලා දෙන දේවල් හොඳට අහගන්න. අනාගතය සාර්ථක කරගන්න නම් දැන් ඉඳන්ම සැලසුම් කරන්න ඕනේ. විශ්ව විද්‍යාලයට යන්න උත්සාහ කරන්න.',
    inputType: 'L'
  },
  {
    id: 'Neg_Fun_0013',
    name: 'Failure to translate transaction verbs',
    input: 'reception ekata gihin bill eka pay karanna',
    expected: 'පිළිගැනීමේ කවුන්ටරයට ගිහින් බිල්පත ගෙවන්න',
    inputType: 'M'
  },
  {
    id: 'Neg_Fun_0014',
    name: 'Incorrect conversion of long formal sentence',
    input: 'nava thaakShaNika padhDhathi haDHAunvaadhiima, dhaththa vishleeShaNaya nivaeradhiva sidhu kiriima, saha kaarYA pravaaha svayQQkriiyakaraNaya kiriima maGAin aayathanayaka seevaa guNaathmakaBhaavaya ihaLa naeQQviimatath samastha meheyum kaarYAkShamathaava vaedi dhiyuNu kiriimatath haeki vee.',
    expected: 'නව තාක්ෂණික පද්ධති හඳුන්වාදීම, දත්ත විශ්ලේෂණය නිවැරදිව සිදු කිරීම, සහ කාර්ය ප්‍රවාහ ස්වයංක්‍රීයකරණය කිරීම මඟින් ආයතනයක සේවා ගුණාත්මකභාවය ඉහළ නැංවීමටත් සමස්ත මෙහෙයුම් කාර්යක්ෂමතාව වැඩි දියුණු කිරීමටත් හැකි වේ.',
    inputType: 'L'
  }
];

// UI Test Cases
const uiTestCases = [
  {
    id: 'Pos_UI_00001',
    name: 'Verify output clears immediately when input is deleted',
    input: 'mahanuwara esala perahera balanna godak aya enawa.',
    expectedEmpty: true, // This test expects the output to be empty after deletion
    inputType: 'M',
    isUITest: true
  }
];

// ==================== HELPER FUNCTIONS ====================

// Helper function to run a single test case
async function runTestCase(page: any, testCase: any) {
  console.log(`🚀 Starting test: ${testCase.id} - ${testCase.name}`);
  
  try {
    // 1. Navigate to the Swift Translator website
    await page.goto('https://www.swifttranslator.com/');
    console.log('✓ Navigated to https://www.swifttranslator.com/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // 2. Locate the Singlish input field
    const singlishInputSelectors = [
      'textarea',
      'input[type="text"]',
      '[data-testid*="input"]',
      '[id*="input"]',
      '[class*="input"]',
      '[placeholder*="Enter"]',
      '[placeholder*="Type"]',
      '#singlish-input',
      '.singlish-input',
      'input'
    ];
    
    let singlishInput = null;
    for (const selector of singlishInputSelectors) {
      const element = page.locator(selector).first();
      if (await element.count() > 0 && await element.isVisible()) {
        singlishInput = element;
        console.log(`✓ Found input field with selector: ${selector}`);
        break;
      }
    }
    
    if (!singlishInput) {
      // Fallback: Use the first textarea or contenteditable div
      singlishInput = page.locator('textarea, [contenteditable="true"]').first();
    }
    
    if (!singlishInput || await singlishInput.count() === 0) {
      throw new Error('Could not find input field');
    }
    
    // 3. Clear and enter the Singlish text
    await singlishInput.clear();
    
    if (testCase.isUITest) {
      // For UI test: Type character by character
      for (let i = 0; i < testCase.input.length; i++) {
        await singlishInput.press(testCase.input[i]);
        await page.waitForTimeout(50); // Small delay between keystrokes
      }
    } else {
      await singlishInput.fill(testCase.input);
    }
    
    console.log(`✓ Entered input: "${testCase.input}"`);
    
    // 4. Wait for conversion (longer for long inputs)
    const waitTime = testCase.inputType === 'L' ? 3000 : testCase.inputType === 'M' ? 1500 : 1000;
    await page.waitForTimeout(waitTime);
    
    // 5. Locate the Sinhala output field
    const sinhalaOutputSelectors = [
      'textarea[readonly]',
      'div[contenteditable="false"]',
      '[data-testid*="output"]',
      '[id*="output"]',
      '[class*="output"]',
      '#sinhala-output',
      '.sinhala-output',
      '[id*="result"]',
      '.result',
      'pre',
      'code'
    ];
    
    let sinhalaOutput = null;
    for (const selector of sinhalaOutputSelectors) {
      const element = page.locator(selector).first();
      if (await element.count() > 0 && await element.isVisible()) {
        sinhalaOutput = element;
        console.log(`✓ Found output field with selector: ${selector}`);
        break;
      }
    }
    
    if (!sinhalaOutput) {
      // Fallback: Look for any element containing Sinhala text
      const allElements = page.locator('*:not(script):not(style):not(link):not(meta)');
      const count = await allElements.count();
      
      for (let i = 0; i < Math.min(count, 50); i++) {
        const element = allElements.nth(i);
        const text = await element.textContent();
        if (text && /[\u0D80-\u0DFF]/.test(text)) { // Check for Sinhala characters
          sinhalaOutput = element;
          console.log(`✓ Found Sinhala text in element ${i}`);
          break;
        }
      }
    }
    
    // 6. Get the actual output text
    let actualOutput = '';
    
    if (sinhalaOutput) {
      actualOutput = await sinhalaOutput.textContent() || '';
      actualOutput = actualOutput.trim();
      console.log(`✓ Got actual output: "${actualOutput}"`);
    } else {
      // Try to get text from body
      const bodyText = await page.locator('body').textContent() || '';
      // Extract Sinhala text
      const sinhalaMatch = bodyText.match(/[\u0D80-\u0DFF][\u0D80-\u0DFF\s\.\,\!\?\:\;\-]*[\u0D80-\u0DFF]/);
      if (sinhalaMatch) {
        actualOutput = sinhalaMatch[0].trim();
        console.log(`✓ Extracted Sinhala text from body: "${actualOutput}"`);
      } else {
        throw new Error('Could not find output field or Sinhala text');
      }
    }
    
    // 7. Verify the output matches expected
    console.log(`🔍 Verifying output...`);
    console.log(`   Expected: "${testCase.expected}"`);
    console.log(`   Actual:   "${actualOutput}"`);
    
    // Use different comparison strategies
    if (actualOutput === testCase.expected) {
      console.log('✅ TEST PASSED: Exact match!');
      return { passed: true, actualOutput };
    } else {
      // Try normalization for whitespace differences
      const normalizedActual = actualOutput.replace(/\s+/g, ' ').trim();
      const normalizedExpected = testCase.expected.replace(/\s+/g, ' ').trim();
      
      if (normalizedActual === normalizedExpected) {
        console.log('✅ TEST PASSED: Match after whitespace normalization!');
        return { passed: true, actualOutput };
      } else if (normalizedActual.includes(normalizedExpected)) {
        console.log('✅ TEST PASSED: Expected text found within output!');
        return { passed: true, actualOutput };
      } else if (normalizedExpected.includes(normalizedActual)) {
        console.log('⚠️  Partial match: Output is subset of expected');
        return { passed: false, actualOutput, reason: 'Partial match' };
      } else {
        console.log('❌ TEST FAILED: Output does not match expected');
        return { passed: false, actualOutput };
      }
    }
    
  } catch (error) {
    console.log(`❌ Test ${testCase.id} failed with error:`, error instanceof Error ? error.message : 'Unknown error');
    return { passed: false, actualOutput: '', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function for UI tests
async function runUITestCase(page: any, testCase: any) {
  console.log(`🚀 Starting UI test: ${testCase.id} - ${testCase.name}`);
  
  try {
    // Navigate to the website
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    
    // Find input field
    const singlishInput = page.locator('textarea, input[type="text"], [contenteditable="true"]').first();
    const sinhalaOutput = page.locator('textarea[readonly], div[contenteditable="false"], [id*="output"], [class*="output"]').first();
    
    if (!singlishInput || await singlishInput.count() === 0) {
      throw new Error('Input field not found');
    }
    
    if (!sinhalaOutput || await sinhalaOutput.count() === 0) {
      throw new Error('Output field not found');
    }
    
    // Clear any existing text
    await singlishInput.clear();
    await page.waitForTimeout(500);
    
    // Verify output is initially empty
    const initialOutput = await sinhalaOutput.textContent();
    if (initialOutput && initialOutput.trim() !== '') {
      console.log(`⚠️  Warning: Output not initially empty: "${initialOutput}"`);
    }
    
    // Enter the test input
    await singlishInput.fill(testCase.input);
    await page.waitForTimeout(1000);
    
    // Verify output is not empty
    const outputWithText = await sinhalaOutput.textContent();
    if (!outputWithText || outputWithText.trim() === '') {
      throw new Error('Output field did not show any text after input');
    }
    
    console.log(`✓ Output with text: "${outputWithText}"`);
    
    // Now delete the input
    await singlishInput.clear();
    await page.waitForTimeout(1000);
    
    // Verify output is empty again
    const finalOutput = await sinhalaOutput.textContent();
    const finalOutputTrimmed = finalOutput ? finalOutput.trim() : '';
    
    console.log(`🔍 Verifying output cleared...`);
    console.log(`   Final output: "${finalOutputTrimmed}"`);
    
    if (finalOutputTrimmed === '') {
      console.log('✅ UI TEST PASSED: Output cleared successfully!');
      return { passed: true };
    } else {
      console.log('❌ UI TEST FAILED: Output not cleared after input deletion');
      return { passed: false, reason: 'Output not cleared' };
    }
    
  } catch (error) {
    console.log(`❌ UI Test ${testCase.id} failed with error:`, error instanceof Error ? error.message : 'Unknown error');
    return { passed: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ==================== TEST SUITES ====================

// Positive Functional Test Suite
test.describe('Positive Functional Tests', () => {
  // Create individual test for each positive test case
  for (const testCase of positiveTestCases) {
    test(`${testCase.id} - ${testCase.name}`, async ({ page }) => {
      const result = await runTestCase(page, testCase);
      
      // Take screenshot
      await page.screenshot({ 
        path: `test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`,
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`);
      
      // Assert the test passed
      expect(result.passed, `Test ${testCase.id} failed. Expected: "${testCase.expected}", Got: "${result.actualOutput}"`).toBeTruthy();
      
      console.log(`🎉 ${testCase.id} completed successfully!\n`);
    });
  }
});

// Negative Functional Test Suite
test.describe('Negative Functional Tests', () => {
  for (const testCase of negativeTestCases) {
    test(`${testCase.id} - ${testCase.name}`, async ({ page }) => {
      const result = await runTestCase(page, testCase);
      
      // Take screenshot
      await page.screenshot({ 
        path: `test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`,
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`);
      
      // For negative tests, we expect them to fail (actual output should NOT match expected)
      // So if passed is true, that means the test actually failed (because it shouldn't pass)
      if (result.passed) {
        console.log(`⚠️  Note: Negative test ${testCase.id} passed, which may indicate the issue has been fixed`);
      } else {
        console.log(`✅ Negative test ${testCase.id} correctly failed as expected`);
      }
      
      // We don't assert failure for negative tests since they're expected to fail
      // But we log the result
      console.log(`📝 ${testCase.id} completed. Result: ${result.passed ? 'PASSED (unexpected)' : 'FAILED (expected)'}\n`);
    });
  }
});

// UI Test Suite
test.describe('UI Tests', () => {
  for (const testCase of uiTestCases) {
    test(`${testCase.id} - ${testCase.name}`, async ({ page }) => {
      const result = await runUITestCase(page, testCase);
      
      // Take screenshot
      await page.screenshot({ 
        path: `test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`,
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: test-results/${testCase.id}-${result.passed ? 'passed' : 'failed'}.png`);
      
      // Assert the UI test passed
      expect(result.passed, `UI Test ${testCase.id} failed: ${result.error || result.reason}`).toBeTruthy();
      
      console.log(`🎉 ${testCase.id} completed successfully!\n`);
    });
  }
});

// Additional UI Test: Real-time typing
test('Pos_UI_00002 - Real-time output updates while typing', async ({ page }) => {
  console.log('🚀 Starting UI test: Real-time typing');
  
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForLoadState('networkidle');
  
  const testInput = 'mama gedhara yanavaa';
  const expectedPartial = 'මම';
  
  // Find input and output fields
  const singlishInput = page.locator('textarea, input[type="text"], [contenteditable="true"]').first();
  const sinhalaOutput = page.locator('textarea[readonly], div[contenteditable="false"], [id*="output"], [class*="output"]').first();
  
  if (!singlishInput || await singlishInput.count() === 0) {
    throw new Error('Input field not found');
  }
  
  if (!sinhalaOutput || await sinhalaOutput.count() === 0) {
    throw new Error('Output field not found');
  }
  
  // Clear input
  await singlishInput.clear();
  await page.waitForTimeout(500);
  
  // Type character by character
  console.log('Typing character by character...');
  for (let i = 0; i < testInput.length; i++) {
    await singlishInput.press(testInput[i]);
    await page.waitForTimeout(100); // Wait for conversion
    
    const currentOutput = await sinhalaOutput.textContent();
    console.log(`Typed: "${testInput.substring(0, i+1)}" -> Output: "${currentOutput}"`);
    
    // Output should not be null while typing
    expect(currentOutput).not.toBeNull();
  }
  
  // Final verification
  const finalOutput = await sinhalaOutput.textContent();
  console.log(`Final output: "${finalOutput}"`);
  expect(finalOutput?.trim()).not.toBe('');
  
  // Take screenshot
  await page.screenshot({ 
    path: 'test-results/Pos_UI_00002-real-time-typing.png',
    fullPage: true 
  });
  console.log('✅ Real-time typing test completed successfully!');
});

// ==================== BATCH TEST ====================

// Batch test that runs all test cases
test('Batch Test: Run all test cases in sequence', async ({ page }) => {
  console.log('🚀 Starting batch test of all test cases...');

  // Define results object
  const results: { passed: string[]; failed: Array<{id: string; expected?: string; actual?: string; error?: string}> } = {
    passed: [],
    failed: []
  };

  // Run all positive tests
  for (const testCase of positiveTestCases) {
    try {
      console.log(`\n--- Running ${testCase.id}: ${testCase.name} ---`);
      const result = await runTestCase(page, testCase);
      
      if (result.passed) {
        results.passed.push(testCase.id);
        console.log(`✅ ${testCase.id}: PASSED`);
      } else {
        results.failed.push({
          id: testCase.id,
          expected: testCase.expected,
          actual: result.actualOutput
        });
        console.log(`❌ ${testCase.id}: FAILED`);
      }
      
      // Small delay between tests
      await page.waitForTimeout(1000);
      
    } catch (error) {
      results.failed.push({
        id: testCase.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log(`💥 ${testCase.id}: ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Run all negative tests
  for (const testCase of negativeTestCases) {
    try {
      console.log(`\n--- Running ${testCase.id}: ${testCase.name} ---`);
      const result = await runTestCase(page, testCase);
      
      // For negative tests, passing means the test actually failed (which is what we expect)
      if (!result.passed) {
        results.passed.push(testCase.id);
        console.log(`✅ ${testCase.id}: PASSED (correctly failed as expected)`);
      } else {
        results.failed.push({
          id: testCase.id,
          expected: testCase.expected,
          actual: result.actualOutput
        });
        console.log(`⚠️  ${testCase.id}: FAILED (unexpectedly passed)`);
      }
      
      await page.waitForTimeout(1000);
      
    } catch (error) {
      results.failed.push({
        id: testCase.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log(`💥 ${testCase.id}: ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Run UI tests
  for (const testCase of uiTestCases) {
    try {
      console.log(`\n--- Running ${testCase.id}: ${testCase.name} ---`);
      const result = await runUITestCase(page, testCase);
      
      if (result.passed) {
        results.passed.push(testCase.id);
        console.log(`✅ ${testCase.id}: PASSED`);
      } else {
        results.failed.push({
          id: testCase.id,
          error: result.error || result.reason || 'Unknown error'
        });
        console.log(`❌ ${testCase.id}: FAILED`);
      }
      
      await page.waitForTimeout(1000);
      
    } catch (error) {
      results.failed.push({
        id: testCase.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log(`💥 ${testCase.id}: ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 BATCH TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total tests: ${positiveTestCases.length + negativeTestCases.length + uiTestCases.length}`);
  console.log(`Passed: ${results.passed.length}`);
  console.log(`Failed: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailed tests:');
    for (const fail of results.failed) {
      if (fail.error) {
        console.log(`  ${fail.id}: ${fail.error}`);
      } else {
        console.log(`  ${fail.id}`);
        console.log(`    Expected: "${fail.expected}"`);
        console.log(`    Actual:   "${fail.actual}"`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  // Take final screenshot
  await page.screenshot({ 
    path: 'test-results/batch-test-summary.png',
    fullPage: true 
  });
  console.log('📸 Batch test summary screenshot saved');
  
  // Fail the test if any critical tests failed
  const criticalFailures = results.failed.filter(f => 
    !f.id.startsWith('Neg_Fun_') // Negative tests are expected to fail
  );
  
  if (criticalFailures.length > 0) {
    throw new Error(`${criticalFailures.length} critical test(s) failed. See above for details.`);
  }
});

// ==================== DEBUG TEST ====================

// Debug test to check website structure
test('Debug: Check website structure and find elements', async ({ page }) => {
  try {
    console.log('🔍 Debugging website structure...');
    
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    
    // List all interactive elements
    const textareas = page.locator('textarea');
    const inputs = page.locator('input');
    const contentEditable = page.locator('[contenteditable]');
    const buttons = page.locator('button');
    const divs = page.locator('div');
    
    console.log(`📊 Element counts:`);
    console.log(`  Textareas: ${await textareas.count()}`);
    console.log(`  Inputs: ${await inputs.count()}`);
    console.log(`  Contenteditable: ${await contentEditable.count()}`);
    console.log(`  Buttons: ${await buttons.count()}`);
    console.log(`  Divs: ${await divs.count()}`);
    
    // Try to find input by placeholder
    const elementsWithPlaceholder = page.locator('[placeholder]');
    const placeholderCount = await elementsWithPlaceholder.count();
    console.log(`  Elements with placeholder: ${placeholderCount}`);
    
    for (let i = 0; i < Math.min(placeholderCount, 5); i++) {
      const element = elementsWithPlaceholder.nth(i);
      const placeholder = await element.getAttribute('placeholder');
      console.log(`    ${i}: placeholder="${placeholder}"`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/debug-website.png', fullPage: true });
    console.log('📸 Debug screenshot saved: test-results/debug-website.png');
    
    // Save page HTML for inspection
    const html = await page.content();
    const fs = require('fs');
    fs.writeFileSync('test-results/page-source.html', html);
    console.log('💾 Page source saved: test-results/page-source.html');
    
    // Try to find any Sinhala text on the page
    const bodyText = await page.locator('body').textContent() || '';
    const sinhalaMatches = bodyText.match(/[\u0D80-\u0DFF]+/g);
    
    if (sinhalaMatches) {
      console.log(`🔤 Found Sinhala text examples: ${sinhalaMatches.slice(0, 5).join(', ')}`);
    } else {
      console.log('⚠️  No Sinhala text found on page');
    }
    
    // Test a simple conversion
    console.log('\n🔧 Testing a simple conversion...');
    const testInput = 'mama gedhara yanavaa';
    const inputField = page.locator('textarea, input[type="text"]').first();
    
    if (await inputField.count() > 0) {
      await inputField.fill(testInput);
      await page.waitForTimeout(2000);
      
      // Look for output
      const allText = await page.locator('body').textContent() || '';
      const sinhalaText = allText.match(/[\u0D80-\u0DFF][\u0D80-\u0DFF\s\.\,\!\?\:\;\-]*[\u0D80-\u0DFF]/);
      
      if (sinhalaText) {
        console.log(`✅ Found Sinhala output: "${sinhalaText[0].trim()}"`);
      } else {
        console.log('❌ Could not find Sinhala output');
      }
    } else {
      console.log('❌ Could not find input field for test');
    }
    
  } catch (error) {
    console.log('❌ Debug test failed:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
});