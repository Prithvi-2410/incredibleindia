import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, X, Send, Sparkles, Compass, 
  MapPin, Calendar, IndianRupee, Utensils, Shield, RefreshCw 
} from 'lucide-react';
import destinationsData from '../data/destinations.json';
import citiesData from '../data/cities.json';
import statesData from '../data/states.json';

// Embedded Google Gemini API Key configured directly in code
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `
You are the official Incredible India AI Travel Concierge.
Your role is to help users discover, plan, and explore travel experiences across INDIA.

PERSONALITY:
- Friendly, welcoming, knowledgeable, and conversational.
- Sound like a helpful local travel expert, not a robotic AI.
- Enthusiastic about Indian culture, destinations, food, festivals, heritage, nature, adventure, and experiences.
- Keep responses clear, useful, and visually easy to scan (use bullet points, bold titles, and emojis).
- Never overwhelm the user with unnecessary information.

FACTS ABOUT INDIA:
- India has 28 States and 8 Union Territories as of 2026.
- The website dataset features 302 top destinations across 211 cities and 6 cultural zones (Northern, Southern, Eastern, Western, Central, North East).

CORE CAPABILITIES:
1. DESTINATION DISCOVERY: Suggest cities, states, UTs, heritage monuments, beaches, peaks, spiritual shrines, wildlife sanctuaries, and hidden gems. Explain WHY they fit and what can be experienced there.
2. CITY INFORMATION: Overview, top attractions, things to do, famous local food, culture, duration, travel tips.
3. TRIP PLANNING: Create personalized day-by-day itineraries (e.g. Day 1 -> destination + activities, Day 2 -> ...) tailored to days, budget, interests, and season.
4. USER INTERESTS: Seamlessly handle requests like "I want beaches", "Show me adventure", "Romantic trip", "Only 3 days", "Family friendly".
5. BUDGET: Provide realistic approximate budgets. Explicitly remind users that accommodation, transport, and seasonal surges can cause prices to vary.
6. FOOD & CULTURE: Recommend regional culinary dishes, street food, festivals, and handicrafts.
7. TRAVEL TIPS: Weather, best time to visit, transport options, what to pack, and safety tips.
`;

const QUICK_PROMPTS = [
  "Plan a 5-day trip to Rajasthan under ₹20,000",
  "Top pristine beaches in Goa & Andaman",
  "3-day spiritual trail in Varanasi & Ayodhya",
  "Famous food & culinary highlights of Amritsar",
  "Romantic escapes in Himachal & Kashmir",
  "Best wildlife safari to spot Royal Bengal Tigers"
];

export default function AiChatBot({ isOpen, onClose, onSelectCity }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Namaste! 🙏 Welcome to your Incredible India Travel Concierge. I am your personal guide across India's 28 States and 8 Union Territories. Whether you're planning a 5-day royal tour through Rajasthan, craving tranquil beaches in Goa, or looking for spiritual tranquility in Varanasi, tell me what you'd love to experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Comprehensive Local Travel Knowledge Fallback
  const generateExpertResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Rajasthan Itinerary (Under 20,000 or general)
    if (q.includes('rajasthan') || (q.includes('5-day') && (q.includes('20,000') || q.includes('budget') || q.includes('trip')))) {
      return `### 🏰 5-Day Royal Rajasthan Itinerary (Approx. Budget: ₹18,000 - ₹22,000)

**Best Season:** October to March  
**Route:** Jaipur (Pink City) & Jodhpur (Blue City)

* **Day 1: Arrival in Jaipur — The Pink City Heritage**  
  * **Morning:** Explore the hilltop ramparts of **Amber Fort** & mirror halls of Sheesh Mahal.  
  * **Afternoon:** Photograph **Hawa Mahal** (Palace of Winds) & tour the royal City Palace.  
  * **Evening:** Authentic Rajasthani Thali (Dal Baati Churma, Gatte ki Sabzi) at Chokhi Dhani.  
  * *Stay:* Heritage haveli near Bani Park (~₹1,500/night).

* **Day 2: Jaipur Astronomy & Panoramic Fortresses**  
  * **Morning:** Visit **Jantar Mantar** UNESCO astronomical observatory.  
  * **Afternoon:** Panoramic view from **Nahargarh Fort** overlooking the city.  
  * **Evening:** Shop for block-print textiles, blue pottery, and silver jewelry in Johari Bazaar.

* **Day 3: Scenic Drive / Train to Jodhpur (The Blue City)**  
  * **Morning:** 4.5-hr train/cab ride to Jodhpur. Check-in near Clock Tower.  
  * **Afternoon:** Stroll through the labyrinthine blue alleys of Navchokiya.  
  * **Evening:** Sunset views over the desert plains from Jaswant Thada marble cenotaph.

* **Day 4: Majestic Mehrangarh & Royal Gastronomy**  
  * **Morning:** Explore **Mehrangarh Fort**, one of India's largest and most imposing fortresses.  
  * **Afternoon:** Savor legendary Mirchi Vada, Mawa Kachori, and Makhaniya Lassi.  
  * **Evening:** Rooftop dinner overlooking the illuminated fortress.

* **Day 5: Desert Heritage & Departure**  
  * **Morning:** Visit Umaid Bhawan Palace museum and Mandore Gardens.  
  * **Afternoon:** Return journey with unforgettable royal memories.

💰 **Estimated Budget Breakdown:**  
* Budget Stays (4 nights): ₹6,000 – ₹7,500  
* Inter-city & Local Transport: ₹4,500 – ₹6,000  
* Meals & Street Delights: ₹3,500 – ₹4,500  
* Monument Passes & Activities: ₹2,000 – ₹2,500  
* **Total per person (twin sharing): ~₹16,000 - ₹20,500.**  
*(Note: Prices can vary based on season, advance bookings, and hotel category).*`;
    }

    // 2. Beaches
    if (q.includes('beach') || q.includes('goa') || q.includes('andaman')) {
      return `### 🏖️ Top Sun-Kissed Beaches & Coastal Escapes in India

1. **Radhanagar Beach (Havelock Island, Andaman & Nicobar)**  
   * **Why Visit:** Consistently voted among Asia's most pristine beaches. Powder-soft white sands, turquoise waters, and ancient mahua tree fringes.  
   * **Activities:** Scuba diving, snorkeling in Elephant Beach coral reefs, tranquil bioluminescent night walks.

2. **Palolem & Agonda Beach (South Goa)**  
   * **Why Visit:** Golden crescent bay shaded by coconut groves. Far more peaceful and scenic than bustling North Goa.  
   * **Experiences:** Dolphin boat rides, bohemian beach shacks, fresh Goan fish curry, silent noise headphone parties.

3. **Varkala Beach & Cliff (Kerala)**  
   * **Why Visit:** Dramatic red laterite cliffs dropping directly into the Arabian Sea with natural mineral springs.  
   * **Experiences:** Ayurvedic yoga retreats, cliffside seafood cafes, sunset meditation.

4. **Kovalam Beach (Kerala) & Promenade Beach (Puducherry)**  
   * **Highlights:** Iconic striped lighthouse in Kovalam, French colonial coastal boulevards in Puducherry.

💡 **Travel Tip:** Best visited between November and April for crystal clear seas and balmy evening breezes!`;
    }

    // 3. Spiritual / Varanasi / Ayodhya
    if (q.includes('varanasi') || q.includes('ayodhya') || q.includes('spiritual') || q.includes('temple')) {
      return `### 🕉️ 3-Day Sacred Ganges Spiritual Trail (Varanasi & Ayodhya)

* **Day 1: Varanasi — The Eternal City of Light**  
  * **Dawn (5:30 AM):** Sunrise boat ride along the Ganges past Manikarnika and Dashashwamedh Ghats. Witness morning chants and temple bells.  
  * **Midday:** Darshan at **Kashi Vishwanath Jyotirlinga** & explore ancient Banaras alleys.  
  * **Evening:** Witness the grandeur of the Grand Ganga Maha Aarti from a boat or river steps.

* **Day 2: Sarnath & Sacred Heritage**  
  * **Morning:** Visit **Sarnath** where Lord Buddha preached his first sermon after enlightenment; see the Ashoka Pillar.  
  * **Afternoon:** Sip clay-cup saffron Malaiyo and hot Banarasi Kachori-Jalebi.  
  * **Evening:** Train or scenic 3.5-hr drive to Ayodhya.

* **Day 3: Sacred Ayodhya on the Saryu River**  
  * **Morning:** Darshan at the grand **Shri Ram Janmabhoomi Mandir** and historic Hanuman Garhi.  
  * **Evening:** Serene sunset Aarti along the Ram Ki Paidi ghats on the holy Saryu River.

💡 **Cultural Tip:** Wear modest traditional attire at temples. Early mornings offer the deepest spiritual serenity!`;
    }

    // 4. Food & Cuisine
    if (q.includes('food') || q.includes('amritsar') || q.includes('kolkata') || q.includes('cuisine') || q.includes('taste')) {
      return `### 🍛 Iconic Culinary Experiences Across India

1. **Amritsar (Punjab): The Capital of Warm Hospitality**  
   * **Amritsari Kulcha:** Crisp tandoori flatbread stuffed with spiced potatoes and onions, topped with melting white butter.  
   * **Langar at Golden Temple:** The world's largest community kitchen serving nourishing Dal, Roti, and Kheer with love to 100,000+ daily visitors.  
   * **Sweet Finish:** Giant glass of rich malai lassi at Ahuja Lassi or Gian Chand Milk Bar.

2. **Kolkata (West Bengal): The Gastronomic Paradise**  
   * **Kolkata Biryani:** Fragrant aromatic rice layered with tender meat, saffron, and the iconic golden spiced potato.  
   * **Kathi Rolls:** Flaky parathas rolled with grilled kebabs, green chilies, and lime (invented at Nizam's).  
   * **Desserts:** Fresh warm Rasgulla, baked Sandesh, and terracotta cups of Mishti Doi.

3. **Hyderabad (Telangana): Imperial Royal Feasts**  
   * Authentic slow-cooked **Dum Biryani** infused with kewra, saffron, and rich spices.

4. **Kerala Coastal Bounty**  
   * Appam with vegetable stew, Karimeen Pollichathu (fish wrapped in banana leaf), and Malabar parotta.`;
    }

    // 5. Mountains / Romance / Adventure
    if (q.includes('mountain') || q.includes('himachal') || q.includes('kashmir') || q.includes('romantic') || q.includes('hills')) {
      return `### 🏔️ Breathtaking Himalayan Escapes

1. **Gulmarg & Pahalgam (Jammu & Kashmir)**  
   * **Why Visit:** Gulmarg Gondola (world's highest ski cable car), meadow of flowers, snow-capped Apharwat Peak, and cozy cedarwood cottages.  
   * **Romantic Experience:** Stay in a heritage handcrafted cedar houseboat on Dal Lake in Srinagar.

2. **Spiti Valley & Manali (Himachal Pradesh)**  
   * **Why Visit:** High-altitude mountain desert, 1000-year-old Key Monastery, and pristine Chandratal Lake under starry skies.  
   * **Adventure:** Rohtang Pass, river rafting in Beas, and world's highest post office at Hikkim.

3. **Chopta & Tungnath (Uttarakhand)**  
   * **Why Visit:** Highest Shiva temple in the world perched at 3,680m with dramatic 360-degree Himalayan vistas of Nanda Devi and Trishul.`;
    }

    // 6. Wildlife / Tigers
    if (q.includes('wildlife') || q.includes('tiger') || q.includes('safari') || q.includes('national park')) {
      return `### 🐅 Premier Wildlife Safaris in India

1. **Bandhavgarh & Kanha National Park (Madhya Pradesh)**  
   * **Why Visit:** Highest density of Royal Bengal Tigers in the world. Dense sal forests inspired Rudyard Kipling's *The Jungle Book*.  
   * **Best Season:** October to May.

2. **Kaziranga National Park (Assam)**  
   * **Why Visit:** UNESCO World Heritage sanctuary harboring two-thirds of the world's Great One-horned Rhinoceros population, along with wild water buffaloes and elephants.

3. **Ranthambore National Park (Rajasthan)**  
   * **Why Visit:** Majestic sight of tigers roaming amidst ancient 10th-century fort ruins and picturesque banyan trees.

💡 **Safari Tip:** Book forest core-zone permits 60 to 90 days in advance via state tourism portals!`;
    }

    // 7. General search or city query
    const matchedCity = citiesData.find(c => q.includes(c.name.toLowerCase()));
    if (matchedCity) {
      return `### 📍 Discover ${matchedCity.name} (${matchedCity.state})

* **Cultural Zone:** ${matchedCity.zone} India (${matchedCity.isUnionTerritory ? 'Union Territory' : 'State'})  
* **Average Traveler Rating:** ⭐ ${matchedCity.avgRating} / 5 (${matchedCity.totalReviewsLakhs} Lakh Reviews)  
* **Cataloged Attractions:** ${matchedCity.placeCount} Key Destinations in Database  

**Overview:**  
${matchedCity.description}

**Key Tourist Sights in ${matchedCity.name}:**  
${matchedCity.places.map(p => `• **${p.name}** (${p.type} • Fee: ${p.entranceFee} • Visit: ${p.timeNeededHrs}h)`).join('\n')}

**Best Time to Visit:** ${matchedCity.bestTimes.join(', ')}  
**Airport Connectivity:** ${matchedCity.places[0]?.airportNearby ? 'Within 50 km' : 'Scenic highway link (>50 km)'}  

💡 *Would you like a day-by-day itinerary or hotel recommendations for ${matchedCity.name}?*`;
    }

    // Default expert response
    return `### 🇮🇳 Incredible India Travel Insights

Thank you for your question about exploring India! Here are top recommendations based on your inquiry:

* **Iconic Experiences:**  
  * **Heritage:** Taj Mahal (Agra), Amber Fort (Jaipur), Hampi (Karnataka), Qutub Minar (Delhi).  
  * **Spiritual:** Golden Temple (Amritsar), Dashashwamedh Ghat (Varanasi), Mahakaleshwar (Ujjain), Somnath Temple (Gujarat).  
  * **Wild & Scenic:** Jim Corbett, Kaziranga (Assam), Munnar Tea Terraces (Kerala), Pangong Tso (Ladakh).

* **Planning Factors to Keep in Mind:**  
  * **Duration:** 3 to 5 days is ideal for a regional circuit (e.g. Golden Triangle: Delhi-Agra-Jaipur).  
  * **Best Season:** October through March offers pleasant weather across most of North, Central, and South India.  
  * **Cuisine:** Every 100 kilometers brings distinct spices, preparations, and sweets!

💡 *Would you like me to tailor a specific day-by-day itinerary, suggest budget estimates, or recommend off-beat hidden gems for this trip?*`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    let responded = false;

    // Call live Google Gemini API using candidate models (gemini-3.1-flash-lite, gemini-3.5-flash)
    if (GEMINI_API_KEY) {
      const candidateModels = [
        'gemini-3.1-flash-lite',
        'gemini-3.5-flash'
      ];

      for (const model of candidateModels) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [
                      { text: SYSTEM_PROMPT },
                      ...newMessages.map((m) => ({
                        text: `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`
                      }))
                    ]
                  }
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1000,
                }
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (replyText) {
              setMessages([...newMessages, { role: 'assistant', text: replyText }]);
              responded = true;
              break;
            }
          }
        } catch (e) {
          // Continue to next candidate or fallback
        }
      }
    }

    if (!responded) {
      setTimeout(() => {
        const replyText = generateExpertResponse(userText);
        setMessages([...newMessages, { role: 'assistant', text: replyText }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[480px] sm:max-h-[720px] h-full sm:h-[650px] bg-slate-950 border border-amber-500/40 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-2xl">
      
      {/* Header - Clean, No API Key Box */}
      <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
          </div>
          <div>
            <h3 className="font-display-royal text-sm font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>Bharat AI Travel Guide</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-sans font-normal border border-amber-500/30">
                28 States • 8 UTs
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Personalized Itineraries & Cultural Intelligence
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">
              {m.role === 'user' ? 'You' : 'Bharat AI Travel Guide'}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-slate-900/80 p-3 rounded-2xl w-fit border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Consulting regional itineraries & data...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/80 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(prompt);
            }}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 text-[10px] text-slate-300 hover:text-amber-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask about cities, 5-day itineraries, budgets, food..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-amber-400 text-white text-xs placeholder:text-slate-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-transform font-bold"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
