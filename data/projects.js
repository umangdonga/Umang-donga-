/*
 * Case study content. Each project renders through views/case-study.ejs.
 *
 * Section types:
 *   text        { heading, number?, paragraphs?, bullets? }
 *   insights    { items: string[] }
 *   figure      { src, alt, caption?, frame?: 'accent' | 'plain' | 'bleed', notes?, screens? }
 *                 notes:   [{ x, y, side?, title, text }] – numbered pins with side callouts;
 *                          needs size: [w, h], optional crop (frame aspect ratio) to zoom in
 *                 screens: { flow?, pinY?, items: [{ x, n?, y?, title, text, action? }] }
 *                          – one caption per phone; x/y are % of the image
 *   beforeAfter { heading?, intro?, connector?, paired?, before, after }
 *                 before/after: { src, alt, label, tone?: 'bad' | 'good', size, crop?, notes? }
 *                 paired: same numbers on both sides mark the same area
 *   steps       { items: string[] }                    – process strip
 *   ideas       { heading, intro?, items: [{label, chosen?}], image? }
 *   cards       { heading?, items: [{title, text, icon?}] }
 *   identity    { heading, colors: [hex], typeface }
 *   law         { name, definition, rule, verdicts, image, analysis: string[] }
 *   scorecard   {}                                     – built from the law sections
 */

const img = (name) => `/images/case/${name}.webp`;

module.exports = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'campus',
    name: 'Campus Connect',
    cardTitle: 'Campus Connect',
    thumb: '/images/thumb-campus.png',
    category: 'Mobile App · UX Case Study',
    summary:
      'A mobile experience designed to help students and parents easily navigate campus, discover essential facilities, and find the right destination with clear indoor and outdoor directions.',
    theme: { accent: '#164F75', accentSoft: '#E8EFF4', onAccent: '#FFFFFF' },
    behance: 'https://www.behance.net/gallery/249721127/Campus-Connect-Smart-Campus-Navigation-App',
    hero: {
      title: 'Campus Connect',
      subtitle: 'Smart Campus Navigation App',
      image: img('campus-hero'),
      imageStyle: 'phone',
    },
    meta: [
      { label: 'Role', value: 'UI/UX Designer', icon: 'user' },
      { label: 'Type', value: 'Academic / Concept Project', icon: 'layers' },
      { label: 'Platform', value: 'Mobile Application', icon: 'phone' },
    ],
    overview: [
      'Campus Connect is a smart campus navigation app created for students, parents, and campus users. The concept brings navigation, campus information, transport, facilities, and important student services into one simple experience.',
      'The main goal was to reduce confusion while moving through large campus spaces and make important campus information easier to access.',
    ],
    sections: [
      {
        type: 'beforeAfter',
        heading: 'Home screen: before → after',
        intro: 'Matching numbers mark the same area on both screens.',
        connector: 'Redesign',
        paired: true,
        before: {
          src: img('campus-before'),
          alt: 'Earlier Campus Connect home screen with soft grey cards and the campus map at the bottom',
          label: 'Before',
          tone: 'bad',
          size: [1361, 1058],
          crop: 0.62,
          notes: [
            { x: 50, y: 26.5, title: 'Flat header', text: 'Grey search bar blends into the page.' },
            { x: 50, y: 41.5, title: 'Low-contrast cards', text: 'Soft grey tiles look disabled, not tappable.' },
            { x: 50, y: 75, title: 'Map buried', text: 'The core feature sits last, cut off by the nav.' },
          ],
        },
        after: {
          src: img('campus-after'),
          alt: 'Redesigned Campus Connect home screen with a campus photo header, map card first and solid blue action tiles',
          label: 'After',
          tone: 'good',
          size: [1361, 1058],
          crop: 0.62,
          notes: [
            { x: 50, y: 28.3, title: 'Photo header', text: 'Campus photo sets context; white search stands out.' },
            { x: 50, y: 64, title: 'Solid action tiles', text: 'High-contrast tiles read clearly as buttons.' },
            { x: 46, y: 41, title: 'Map comes first', text: 'Moved to the top with a clear View Full Map action.' },
          ],
        },
      },
      { type: 'steps', items: ['Research', 'Information Architecture', 'User Flow', 'Wireframing', 'UI Design & Prototype'] },
      {
        type: 'text',
        number: '01',
        heading: 'Interviews',
        paragraphs: [
          'During the early research phase, I conducted user interviews to understand how students and parents navigate a large campus and find important locations and services. The conversations focused on navigation difficulties, information needs, and common challenges faced by first-time campus users. These insights helped shape the structure and key features of Campus Connect.',
        ],
        bulletsTitle: 'Questions I asked',
        bullets: [
          'What challenges do users face while navigating the campus?',
          'Which campus locations and services do they need most often?',
          'How do students and parents currently find directions and information?',
          'What information would make campus navigation easier?',
        ],
      },
      {
        type: 'insights',
        items: [
          'New users often struggle to find the right building, block, or room.',
          'Students need multiple campus services and information in one accessible place.',
          'Clear directions and location-based information can reduce confusion while moving around campus.',
        ],
      },
      {
        type: 'text',
        number: '02',
        heading: 'Design',
        paragraphs: [
          'Once the key user needs were identified, I moved into the visual design phase in Figma. The goal was to create a clean, intuitive interface that makes campus navigation and essential services easy to understand for students and parents. I focused on clear information hierarchy, simple interactions, and a consistent visual language across the app.',
        ],
        bullets: [
          'A clean, modern and minimal style was used to keep the interface simple and navigation-focused.',
          'The design followed common mobile UX principles such as consistency, clear hierarchy, familiar navigation patterns, and easy-to-understand interactions.',
          'The experience was designed as a mobile application, primarily for smartphone users.',
          'The design focuses on the needs identified during research: quick access to campus locations, clear directions, essential services, and simple navigation for first-time users.',
        ],
      },
      {
        type: 'figure',
        src: img('campus-design'),
        alt: 'Campus Connect navigation screens: turn-by-turn outdoor directions, classroom search and room details',
        frame: 'accent',
        screens: {
          pinY: 4,
          items: [
            { x: 23.75, n: 3, title: 'Turn-by-turn', text: 'Live view with the next turn, distance and time left.', action: 'Follow the arrow' },
            { x: 50, n: 1, y: 22, title: 'Find your class', text: 'Enter block and room; no campus knowledge needed.', action: 'Start Navigation' },
            { x: 76.25, n: 2, title: 'Route overview', text: 'Time, distance and tips like "take the lift" before leaving.', action: 'Start Turn-by-Turn' },
          ],
        },
      },
      {
        type: 'text',
        heading: 'Learnings',
        paragraphs: [
          'This project helped me understand how UX can simplify complex environments like a large campus. I learned that good navigation is not only about showing a route, but also about giving users the right information at the right moment.',
        ],
        bullets: [
          'Navigation should be simple and easy to understand without requiring prior campus knowledge.',
          'Organizing locations, services, and features clearly helps users find what they need faster.',
          'User problems and needs helped shape the core features and overall flow.',
          'Even when a product has many features, the interface should feel focused and easy to use.',
          'Distance, direction, time, and location together can provide a clearer navigation experience.',
        ],
      },
      {
        type: 'figure',
        src: img('campus-screens'),
        alt: 'Campus Connect screens: campus search, notifications, campus services, latest news, campus canteens and events',
        frame: 'bleed',
        screens: {
          pinY: 5,
          items: [
            { x: 10, title: 'Campus search', text: 'Quick filters and recent searches.', action: 'Tap a filter' },
            { x: 25.9, title: 'Notifications', text: 'Grades, library dues and club events in one feed.' },
            { x: 41.9, title: 'Campus services', text: 'Bus, hostel, canteen, parking as big tiles.', action: 'Tap a tile' },
            { x: 57.8, title: 'Latest news', text: 'Campus updates grouped by Today and Yesterday.' },
            { x: 73.75, title: 'Canteens', text: 'Photos, ratings and timings to pick a place.' },
            { x: 90, title: 'Events', text: 'Seats left and one-tap sign-up.', action: 'Register' },
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'book',
    name: 'BookMyShow – Kid Version',
    cardTitle: 'Bookmyshow Kid Version',
    thumb: '/images/thumb-book.png',
    thumbPosition: 'right center',
    category: 'Mobile App · UX Case Study',
    summary:
      'A kid-friendly movie and event booking experience designed to make discovery and booking simpler, safer, and more engaging for children.',
    theme: { accent: '#0B0B0C', accentSoft: '#FDECEC', onAccent: '#FFFFFF', highlight: '#E2434B' },
    behance: 'https://www.behance.net/gallery/249716123/Bookmyshow-Kid-Version',
    hero: {
      title: 'BookMyShow – Kid Version',
      subtitle: 'Designing a kids-friendly version of an app',
      image: img('book-hero'),
      imageStyle: 'phone',
    },
    meta: [
      { label: 'Role', value: 'UI/UX Designer', icon: 'user' },
      { label: 'Type', value: 'Academic / Concept Project', icon: 'layers' },
      { label: 'Platform', value: 'Mobile Application', icon: 'phone' },
    ],
    overview: [
      'BookMyShow Kid Version is a child-focused redesign of the BookMyShow mobile experience. The concept creates a safer and simpler environment for children to explore movies and events through colorful visuals, easy navigation, and playful interactions.',
      'The experience also introduces parent-controlled features so children can explore independently while important actions such as booking and payment remain under parental control.',
    ],
    sections: [
      {
        type: 'beforeAfter',
        heading: 'Parent sets the rules, kid explores',
        intro: 'A parent configures the app once; the child then gets a simpler, playful home.',
        connector: 'Then',
        before: {
          src: img('book-before'),
          alt: 'Parent control setup screen with approval toggles, age rating chips and a passcode note',
          label: 'Step 1 · Parent',
          size: [1361, 1058],
          crop: 0.62,
          notes: [
            { x: 46.7, y: 23.5, title: 'Mascot guide', text: 'A friendly character explains the setup.' },
            { x: 54.7, y: 40.4, title: 'Approval toggles', text: 'Bookings and payments need a parent first.' },
            { x: 60, y: 68, title: 'Age rating', text: 'Filters which movies the child can see.' },
          ],
        },
        after: {
          src: img('book-after'),
          alt: 'Kid-friendly home screen with mascot greeting, reward coins, movie posters and illustrated tab bar',
          label: 'Step 2 · Kid',
          size: [1361, 1058],
          crop: 0.62,
          notes: [
            { x: 59, y: 19.4, title: 'Greeting & coins', text: 'Mascot and reward coins make it feel like a game.' },
            { x: 43.4, y: 58.6, title: 'Poster cards', text: 'Big pictures and stars: choose without reading.' },
            { x: 53.4, y: 85.5, title: 'Illustrated tabs', text: 'Icons kids recognise at a glance.' },
          ],
        },
      },
      { type: 'steps', items: ['Research', 'Information Architecture', 'User Flow', 'Wireframing', 'UI Design & Prototype'] },
      {
        type: 'text',
        number: '01',
        heading: 'Interviews',
        paragraphs: [
          'During the research phase, I explored how children interact with entertainment platforms and what makes movie discovery and booking difficult for them. The focus was on simplicity, safety, navigation, and the role of parents during the booking process.',
        ],
        bulletsTitle: 'Questions I explored',
        bullets: [
          'How can children easily discover movies and events?',
          'What makes an entertainment app difficult for kids to use?',
          'Which features can make the experience more engaging for children?',
          'How can parents maintain control over booking and payment?',
        ],
      },
      {
        type: 'insights',
        items: [
          'Children need a simpler interface with clear navigation and easy-to-understand interactions.',
          'A playful and visually engaging experience can make movie discovery more enjoyable for kids.',
          'Parents need control over important actions such as booking and payment to keep the experience safe.',
        ],
      },
      {
        type: 'text',
        number: '02',
        heading: 'Design',
        paragraphs: [
          'After identifying the key user needs, I moved into the UI/UX design phase. The goal was to create a child-friendly experience that feels fun and engaging while remaining simple and easy to navigate.',
        ],
        bullets: [
          'A colorful and playful visual language was used to create a more engaging experience for children.',
          'The navigation and content structure were simplified to make important actions easier to understand.',
          'Features such as avatar creation, rewards, and voice support were explored to make the experience more interactive.',
        ],
      },
      {
        type: 'figure',
        src: img('book-design'),
        alt: 'Booking flow screens: movie details, choose cinema, pick time and date, number of seats and seat selection',
        frame: 'accent',
        screens: {
          flow: true,
          pinY: 8,
          items: [
            { x: 13.4, title: 'Movie details', text: 'Trailer, rating, genres and cast.', action: 'Book Tickets' },
            { x: 31.6, title: 'Choose cinema', text: 'Nearby cinemas with distance.', action: 'Select' },
            { x: 50.3, title: 'Time & date', text: 'Shows grouped by morning, afternoon, evening.', action: 'Pick a time' },
            { x: 69.1, title: 'How many seats', text: 'Big number picker, two price tiers.', action: 'Select Seats' },
            { x: 87.8, title: 'Pick seats', text: 'Colour-coded seats and a live total.', action: 'Continue' },
          ],
        },
      },
      {
        type: 'text',
        heading: 'Learnings',
        paragraphs: [
          "This project helped me understand how designing for children requires a different approach to navigation, interaction, visuals, and safety. I learned that a successful kids' experience needs to balance fun and independence with clear boundaries and parental control.",
        ],
      },
      {
        type: 'figure',
        src: img('book-screens'),
        alt: 'Parent approval, lock-screen approval notification, scratch card reward, puzzle game and snacks screens',
        frame: 'bleed',
        screens: {
          pinY: 5,
          items: [
            { x: 19.1, title: 'Parent approval', text: 'Movie, seats and total before paying.', action: 'Approve & Pay' },
            { x: 34.7, title: 'Approval alert', text: "Parent's phone is notified of the request.", action: 'Tap to review' },
            { x: 49.7, title: 'Scratch card', text: 'A reward that makes booking fun.', action: 'Scratch' },
            { x: 65.6, title: 'Puzzle time', text: 'Timed mini puzzle with a progress bar.', action: 'Solve to win' },
            { x: 80.6, title: 'Grab a bite', text: 'Add snacks; seat and food totals stay visible.', action: '+ / −' },
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'indu-cafe',
    name: 'Indu Cafe',
    cardTitle: 'Indu Cafe',
    thumb: '/images/thumb-indu.png',
    category: 'Mobile App · Product Design',
    summary:
      'A digital solution designed to make campus food ordering simpler, faster, and more convenient for students.',
    theme: { accent: '#FFDD1F', accentSoft: '#FFF8D1', onAccent: '#121218' },
    behance: 'https://www.behance.net/gallery/249721671/Innovation-A-Digital-Solution-for-Campus-Catering',
    hero: {
      title: 'A Digital Solution for Campus Catering',
      subtitle: 'Indu Cafe app',
      image: img('indu-hero'),
      imageStyle: 'wide',
    },
    meta: [
      { label: 'Role', value: 'UI/UX Designer', icon: 'user' },
      { label: 'Type', value: 'Cafe app', icon: 'layers' },
      { label: 'Platform', value: 'Mobile Application', icon: 'phone' },
    ],
    overview: [
      'This project explores a digital solution for campus catering, focusing on improving the way students discover food, view menus, and place orders within a campus environment. The goal was to create a simple and convenient experience that reduces friction in everyday campus food ordering.',
      'Students often face difficulties while checking available food options, understanding menus, and managing their food orders on campus. The lack of a simple digital experience can make the process time-consuming and inconvenient.',
    ],
    sections: [
      {
        type: 'cards',
        heading: 'Two apps, one ordering system',
        items: [
          {
            icon: 'users',
            title: 'App for Customers',
            text: 'Students browse categories, discover offers and recommendations, customise quantity and check out with a clear payment summary.',
          },
          {
            icon: 'terminal',
            title: 'App for Staff',
            text: "Kitchen staff see today's overview, manage the menu, track online orders by status and keep inventory up to date.",
          },
        ],
      },
      {
        type: 'text',
        number: '01',
        heading: 'App for Customers',
        paragraphs: [
          'The customer app greets students by name, puts search and food categories up front, and highlights special offers, recommended items and popular items so choosing food takes seconds.',
        ],
      },
      {
        type: 'figure',
        src: img('indu-customer'),
        alt: 'Indu Cafe customer home screen with categories, special offer and recommended items',
        frame: 'accent',
        size: [1600, 1516],
        crop: 0.78,
        notes: [
          { x: 52, y: 23.4, title: 'Search by dish', text: 'Type "pizza" or "paratha" to jump straight to it.' },
          { x: 39.2, y: 30.5, title: 'Category row', text: 'One tap filters the menu.' },
          { x: 41.9, y: 49.1, title: 'Offer banner', text: "Today's deal with a direct Order Now button." },
          { x: 65, y: 54, side: 'right', title: 'Recommended for you', text: 'Picks based on what the student likes.' },
          { x: 62.5, y: 70.8, side: 'right', title: 'Add to cart', text: 'Order from the card, no detail page needed.' },
          { x: 51.6, y: 85.6, side: 'right', title: 'Floating tab bar', text: 'Home, Cart and Profile always in reach.' },
        ],
      },
      {
        type: 'figure',
        src: img('indu-customer-screens'),
        alt: 'Popular items list, pizza detail with quantity selector, and recommended for you grid',
        frame: 'accent',
        screens: {
          pinY: 5,
          items: [
            { x: 22.2, title: 'Popular items', text: 'Best-sellers with price at a glance.', action: 'Add to cart' },
            { x: 50, title: 'Item detail', text: 'Large photo, price and a quantity stepper.', action: '+ / − then Continue' },
            { x: 78.1, title: 'Recommended', text: 'A two-column grid of personal picks.', action: 'Add to cart' },
          ],
        },
      },
      {
        type: 'text',
        number: '02',
        heading: 'App for Staff',
        paragraphs: [
          "The staff app gives the kitchen a quick view of today's orders (preparing, on hold, completed) and quick actions for managing the menu, orders, inventory and reports. Each online order shows its ID, customer, items, time and status.",
        ],
      },
      {
        type: 'figure',
        src: img('indu-staff'),
        alt: 'Staff dashboard with today overview and quick actions, and online orders list with statuses',
        frame: 'plain',
        screens: {
          pinY: 4,
          items: [
            { x: 19.1, y: 9, title: 'Staff dashboard', text: "Today's preparing, on-hold and completed counts, plus four quick actions.", action: 'Tap a quick action' },
            { x: 67.2, title: 'Online orders', text: 'Order ID, customer, items, time and a status tag: New, Ready or On Hold.', action: 'View All' },
          ],
        },
      },
      {
        type: 'text',
        number: '03',
        heading: 'Inventory management',
        paragraphs: [
          'Stock levels are labelled In Stock, Low Stock or Out of Stock so staff can spot problems instantly, update quantities and add new stock items in a couple of taps.',
        ],
      },
      {
        type: 'figure',
        src: img('indu-inventory'),
        alt: 'Inventory manager, add stock and add new stock screens',
        frame: 'bleed',
        screens: {
          pinY: 5,
          items: [
            { x: 16.6, title: 'Inventory manager', text: 'Colour tags flag In Stock, Low and Out of Stock.', action: 'Tap an item' },
            { x: 39.7, title: 'Update quantity', text: 'Type the amount to add for that ingredient.', action: 'Save' },
            { x: 62.2, title: 'Check current stock', text: "See what's left before adding more.", action: 'Yes / No' },
            { x: 84.1, title: 'Add new item', text: 'Name, count and unit for a new ingredient.', action: 'Save' },
          ],
        },
      },
      {
        type: 'text',
        heading: 'Learnings',
        paragraphs: [
          'I learned how to simplify a real-world campus problem by mapping user flows, identifying pain points, and designing a clear and easy-to-use digital experience. This project also helped me improve my skills in UX thinking, information hierarchy, and interface design.',
          'The project addresses the difficulty students face while ordering food on campus, especially long queues and an inefficient ordering process. The solution creates a smoother digital ordering experience, helping students discover food, place orders, and reduce unnecessary waiting.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ux-laws',
    name: 'UX Laws',
    cardTitle: 'UX LAWs',
    thumb: '/images/thumb-uxlaws.png',
    category: 'UX Research · Competitive Analysis',
    summary:
      'A competitive analysis of Amazon, Meesho and Flipkart, evaluating how each e-commerce app applies the Laws of UX.',
    theme: { accent: '#2A1B5C', accentSoft: '#EEEAFB', onAccent: '#FFFFFF', gradient: 'linear-gradient(135deg,#2B1650 0%,#1E2A6E 100%)' },
    hero: {
      title: 'Competitive App Analysis Based on the Laws of UX',
      subtitle: 'E-Commerce Apps: Amazon, Meesho & Flipkart',
      image: img('ux-hero'),
      imageStyle: 'wide',
    },
    meta: [
      { label: 'Role', value: 'UX Researcher', icon: 'user' },
      { label: 'Type', value: 'Competitive Analysis', icon: 'layers' },
      { label: 'Apps', value: 'Amazon · Meesho · Flipkart', icon: 'phone' },
    ],
    overview: [
      'This study compares three popular e-commerce apps, Amazon, Meesho and Flipkart, against well-known Laws of UX. For every law I captured real screens from each app, checked whether the law is applied well, and wrote down what works and what does not.',
      'The goal was to understand how these psychological principles shape everyday shopping experiences, and to train my eye for spotting them in real products.',
    ],
    apps: ['Amazon', 'Meesho', 'Flipkart'],
    sections: [
      { type: 'scorecard' },
      {
        type: 'law',
        name: "Fitts's Law",
        definition: 'The time to click or reach a target depends on how far it is and how big it is.',
        rule: 'Closer and bigger buttons are faster and easier to use.',
        verdicts: { Amazon: true, Meesho: true, Flipkart: true },
        image: img('ux-fitts'),
        analysis: [
          'In Amazon, Meesho, and Flipkart, the "Add to Cart" and "Buy Now" buttons are very easy to use and users do not feel confused. Fitts\'s Law is applied here, but in Amazon there is a small problem: to see these buttons, users need to scroll first. In Flipkart and Meesho these buttons stay fixed (sticky), so they are always visible and easy to access. Overall, all three apps use Fitts\'s Law.',
        ],
      },
      {
        type: 'law',
        name: "Jakob's Law",
        definition: 'Users spend most of their time on other apps, so they expect your app to work in a similar way.',
        rule: 'Users prefer designs that feel familiar to them.',
        verdicts: { Amazon: true, Meesho: true, Flipkart: true },
        image: img('ux-jakob'),
        analysis: [
          'Meesho, Amazon, and Flipkart use a similar e-commerce UI. Because the layout, product cards, search bar, cart icon, and buttons look almost the same, users feel familiar while using all three apps. Users do not need to learn a new system each time, which makes all three apps easier to use.',
        ],
      },
      {
        type: 'law',
        name: "Hick's Law",
        definition: 'The more choices a user has, the longer it takes to make a decision.',
        rule: 'More options = more confusion and slower decisions.',
        verdicts: { Amazon: false, Meesho: true, Flipkart: false },
        image: img('ux-hick'),
        analysis: [
          "Amazon and Flipkart show long, dense filter lists, while Meesho keeps its filter panel short and focused. According to Hick's Law, when a user wants to buy a product, Amazon shows similar or related products on the same page instead of making users search for them separately. This reduces time and helps users decide faster. In Meesho and Flipkart, this option is less visible or not as clearly shown.",
        ],
      },
      {
        type: 'law',
        name: "Tesler's Law",
        definition: 'Every system has a certain amount of complexity that cannot be removed.',
        rule: 'Some complexity is unavoidable, but designers should keep it away from users.',
        verdicts: { Amazon: true, Meesho: true, Flipkart: true },
        image: img('ux-tesler'),
        analysis: [
          "In Amazon, Flipkart, and Meesho, order tracking shows users the current location or stage of their order every time they check it. The complex processes behind the scenes, such as warehouse management, courier coordination, and real-time logistics tracking, are not visible to the user. The apps hide the system's complexity and present a simple interface, applying Tesler's Law: unavoidable complexity is handled by the system instead of the user.",
        ],
      },
      {
        type: 'law',
        name: 'Doherty Threshold',
        definition: 'A system should respond within 0.4 seconds to keep users engaged.',
        rule: 'Fast response = better user experience.',
        verdicts: { Amazon: true, Meesho: false, Flipkart: true },
        image: img('ux-doherty'),
        analysis: [
          'In Amazon and Flipkart, gray placeholder boxes (skeleton screens) are shown while a page is loading. This keeps users engaged and gives a better visual experience. In Meesho the page appears blank white while loading, so this law is not effectively used.',
        ],
      },
      {
        type: 'law',
        name: "Weber's Law",
        definition: 'Users notice changes only when the difference is large enough.',
        rule: 'Small changes are not easily noticed, but bigger differences are.',
        verdicts: { Amazon: true, Meesho: false, Flipkart: true },
        image: img('ux-weber'),
        analysis: [
          'Amazon\'s "Limited Time Deal", Meesho\'s "Time Offer" and Flipkart\'s "Wow Offer" are visible and eye-catching. Price discounts in Amazon and Flipkart are also shown clearly with strong contrast, while in Meesho the price discount is less visible.',
        ],
      },
      {
        type: 'law',
        name: 'Von Restorff Effect',
        definition: 'When multiple items are similar, the one that is different stands out and is remembered.',
        rule: 'Different = more noticeable.',
        verdicts: { Amazon: true, Meesho: true, Flipkart: true },
        image: img('ux-vonrestorff'),
        analysis: [
          'Offers in Amazon, sale advertisements in Meesho, and Earn Coin advertisements in Flipkart are visually different from the content around them, so they are easily noticed by users.',
        ],
      },
      {
        type: 'law',
        name: 'Peak-End Rule',
        definition: 'Users judge an experience based on the most intense moment (peak) and the ending.',
        rule: 'People remember the best (or worst) moment and the final experience.',
        verdicts: { Amazon: false, Meesho: true, Flipkart: true },
        image: img('ux-peakend'),
        analysis: [
          "Meesho and Flipkart have engaging 'order completed' screens with animations and micro-interactions, which create a satisfying final experience. Amazon lacks this, so it does not fully follow the Peak-End Rule.",
        ],
      },
      {
        type: 'law',
        name: 'The Aesthetic-Usability Effect',
        definition: 'Users perceive visually attractive designs as easier to use.',
        rule: 'Good-looking design feels more usable.',
        verdicts: { Amazon: true, Meesho: true, Flipkart: true },
        image: img('ux-aesthetic'),
        extraImage: { src: img('ux-aesthetic-360'), caption: "Flipkart's 360° product view." },
        analysis: [
          'Amazon Shopping uses clear product images, simple layouts, and attractive banners, making browsing feel smooth and easy.',
          'Flipkart uses colorful deal banners, clean product cards, and well-structured categories. These visual elements make the app look appealing and help users quickly understand how to shop.',
          "Meesho's interface is simple, with bright product images and easy navigation. The attractive presentation makes the app feel easy to explore, especially for new users.",
          'Some Flipkart products also offer a 360° rotation view, so users can see the product from different angles. This attractive, interactive design makes the app feel easier and more enjoyable to use.',
        ],
      },
      {
        type: 'text',
        heading: 'Learnings',
        paragraphs: [
          'Comparing three apps side by side showed that even market leaders apply UX laws unevenly. Small details such as a sticky buy button, a skeleton loader or a celebratory order screen noticeably change how an experience feels.',
          'This analysis gave me a practical checklist I now use when reviewing my own designs: reduce choices, keep key actions within reach, make important changes obvious, and end every flow on a positive note.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'careband',
    name: 'Use Care Band',
    cardTitle: 'Ccare Band Connect',
    thumb: img('care-hero'),
    category: 'Product Design · Wearable',
    summary:
      'A smart wearable safety device designed to support individuals with cognitive and memory-related conditions who may unintentionally wander or get lost.',
    theme: { accent: '#2A1C3A', accentSoft: '#F3EEF8', onAccent: '#FFFFFF', highlight: '#E0457B' },
    behance: 'https://www.behance.net/gallery/249718331/Use-Care-Band-Safety-Support-Wearable',
    hero: {
      title: 'Use Care Band – Safety Support Wearable',
      subtitle: 'Product Design for assisted safety',
      image: img('care-hero'),
      imageStyle: 'wide',
    },
    meta: [
      { label: 'Role', value: 'Product Designer · UX Designer', icon: 'user' },
      { label: 'Type', value: 'Product', icon: 'layers' },
      { label: 'Form', value: 'Wearable band with QR identity', icon: 'phone' },
    ],
    overview: [
      'A smart wearable safety device designed to support individuals with cognitive and memory-related conditions who may unintentionally wander or get lost.',
      'People with cognitive and memory-related conditions may unintentionally wander away or become lost. The project explores a wearable safety solution that can provide support while allowing caregivers to better monitor and respond to such situations.',
    ],
    sections: [
      {
        type: 'ideas',
        number: '01',
        heading: 'Ideation',
        intro:
          'I brainstormed different ways a person could carry their identity and safety information without depending on memory. The ideas ranged from clothing to wearables to a single connected app.',
        items: [
          { label: 'Hand band for user', chosen: true },
          { label: 'ID card with QR code' },
          { label: 'Tracking shoes' },
          { label: 'QR code t-shirt design' },
          { label: 'Smart watch with user-related features' },
          { label: 'QR code with tracking device hidden in the shirt collar' },
          { label: 'One app system with all user information' },
        ],
        image: { src: img('care-ideation'), alt: 'Mind map of ideation: hand band, ID card with QR, tracking shoes, smart watch and more' },
      },
      {
        type: 'text',
        number: '02',
        heading: 'Solution',
        paragraphs: [
          'Use Care Band is designed as a wearable safety device that combines assistive technology with a simple, user-focused form. The concept focuses on making safety support more accessible, practical, and comfortable for everyday use.',
        ],
        bullets: [
          'A wrist band was chosen because it is always worn, hard to forget and comfortable for daily use.',
          'A QR identity panel lets anyone who finds the person scan it and reach their caregiver.',
          'The form went from paper sketches to a physical prototype to test fit and comfort.',
        ],
      },
      {
        type: 'figure',
        src: img('care-sketch'),
        alt: 'Pencil sketch of the band next to a 3D printed prototype',
        caption: 'From pencil sketch to physical prototype.',
        frame: 'plain',
      },
      {
        type: 'figure',
        src: img('care-colors'),
        alt: 'Care Band colour variants: white, grey, beige, yellow, blue, mint, pink and olive',
        caption: 'Colour variants so the band feels personal, not medical.',
        frame: 'plain',
      },
      {
        type: 'text',
        heading: 'Learnings',
        paragraphs: [
          'I learned how to approach a sensitive real-world problem through user-centered and product design. The project helped me understand how physical form, usability, accessibility, and technology need to work together when designing for people who require additional support.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'renue',
    name: 'ReNue',
    cardTitle: 'ReNue',
    thumb: img('renue-logo'),
    category: 'Brand Identity · Campaign',
    summary:
      'A sustainable brand that replaces single-use plastic with seed paper bags that can grow into plants, from identity to awareness campaign.',
    theme: { accent: '#4E8949', accentSoft: '#F3F0E8', onAccent: '#FFFFFF', highlight: '#39B54A' },
    hero: {
      title: 'ReNue',
      subtitle: 'Planet or Plastic, You Decide',
      image: img('renue-logo'),
      imageStyle: 'wide',
    },
    meta: [
      { label: 'Role', value: 'Brand & Visual Designer', icon: 'user' },
      { label: 'Type', value: 'Brand Identity · Campaign', icon: 'layers' },
      { label: 'Deliverables', value: 'Logo, Packaging, Social, Billboard', icon: 'phone' },
    ],
    overview: [
      'People often think that once they use plastic items and throw them away, their job is done. But after that, the plastic remains scattered everywhere for a long time. It can neither be reused nor completely destroyed.',
      'This plastic harms the environment, and in many places animals even end up eating it. It is one of the most harmful and painful things for the environment. ReNue offers a simple alternative.',
    ],
    sections: [
      {
        type: 'identity',
        number: '01',
        heading: 'Brand identity',
        intro:
          'The mark combines "Re" with a circular loop that grows into a leaf, a cycle of reuse that ends in new life. It works in colour, black and white, and as repeating patterns.',
        colors: ['#39B54A', '#4E8949', '#72C051'],
        typeface: 'Industry',
        image: { src: img('renue-identity'), alt: 'ReNue logo variations, typeface, colour palette and patterns' },
      },
      {
        type: 'text',
        number: '02',
        heading: 'The problem: daily use of plastic',
        paragraphs: ['Plastic shows up in almost every part of daily life, and most of it is used once and thrown away:'],
        bullets: [
          'Plastic bottles used to drink water and cold drinks.',
          'Use-and-throw glasses.',
          'The blue bag used everywhere to carry big things or as a waste bag.',
          'Plastic bags used by housewives to shop for groceries and vegetables.',
          'Plastic dishes used and thrown away at weddings and small functions.',
          'Plastic boxes premium malls use for good-looking packaging.',
        ],
      },
      {
        type: 'figure',
        src: img('renue-plastic'),
        alt: 'Diagram of daily use of plastic things: bottles, cups, bags, dishes and boxes',
        frame: 'plain',
      },
      {
        type: 'cards',
        heading: 'Concept',
        items: [
          {
            icon: 'bulb',
            title: 'Core idea',
            text: "Don't use plastic. Use seed paper bags, because even if you throw them away they won't cause harm and have a better chance of growing into trees.",
          },
          {
            icon: 'users',
            title: 'Target audience',
            text: 'Who: housewives, students, shopkeepers. Where: urban areas, big malls, online stores.',
          },
          {
            icon: 'target',
            title: 'Challenges',
            text: "Many people don't know about eco-friendly products, and those who do often don't take them seriously. Eco bags are also expensive, so cost is the main challenge.",
          },
        ],
      },
      {
        type: 'text',
        number: '03',
        heading: 'Seed paper products & packaging',
        paragraphs: [
          'The identity was applied to seed-paper shopping bags, envelopes and tags. The hero bag tells the story visually: shop, throw the bag in soil, water it, and it grows into a plant.',
        ],
      },
      {
        type: 'figure',
        src: img('renue-products'),
        alt: 'ReNue seed paper bag, envelope and tag mockups',
        frame: 'plain',
      },
      {
        type: 'figure',
        src: img('renue-bag'),
        alt: 'ReNue kraft seed paper bag hanging on a door handle',
        caption: 'Seed paper bag: shop, plant, grow.',
        frame: 'plain',
      },
      {
        type: 'text',
        number: '04',
        heading: 'Social media & awareness campaign',
        paragraphs: [
          'Social posts such as "Choose Greenery" and "Plastic vs Planet" build awareness online, while the "Planet or Plastic, You Decide" campaign puts the choice directly in front of people on billboards.',
        ],
      },
      {
        type: 'figure',
        src: img('renue-social'),
        alt: 'Three ReNue social media posts',
        caption: 'Social media posts.',
        frame: 'plain',
      },
      {
        type: 'figure',
        src: img('renue-campaign'),
        alt: 'Awareness campaign: Planet or Plastic, You Decide',
        caption: 'Awareness campaign key visual.',
        frame: 'plain',
      },
      {
        type: 'figure',
        src: img('renue-billboard'),
        alt: 'Campaign key visual on a billboard',
        caption: 'Out-of-home billboard.',
        frame: 'plain',
      },
    ],
  },
];
