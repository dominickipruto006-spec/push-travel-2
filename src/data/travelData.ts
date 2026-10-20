import { TourPackage, Destination, BigFiveAnimal, FAQItem, TravelService, GalleryItem } from '../types/travel';

export const HERO_IMAGE = '/images/hero_east_africa_safari_1792408898976.jpg';
export const KENYA_IMAGE = '/images/safari_kenya_landcruiser_1792408899417.jpg';
export const TANZANIA_IMAGE = '/images/safari_tanzania_cheetah_1792408900022.jpg';
export const RWANDA_IMAGE = '/images/safari_rwanda_gorilla_1792408899583.jpg';
export const ELEPHANTS_IMAGE = '/images/safari_elephants_herd_1792408900303.jpg';
export const HQ_BUILDING_IMAGE = '/images/push_world_hq_building_1792409720815.jpg';
export const LUXURY_RESORT_IMAGE = '/images/luxury_safari_resort_hotel_1792409720916.jpg';
export const BEACH_RESORT_IMAGE = '/images/tropical_diani_beach_resort_1792409721534.jpg';
export const FLIGHT_TRAVEL_IMAGE = '/images/corporate_flight_travel_luxury_1792409721772.jpg';
export const TWO_LIONS_BANNER = '/images/dest_two_male_lions_banner_1792410470858.jpg';
export const HELLS_GATE_IMAGE = '/images/dest_hells_gate_cycling_1792410472229.jpg';
export const OLPEJETA_IMAGE = '/images/dest_olpejeta_rhino_horn_1792410472237.jpg';
export const LEWA_IMAGE = '/images/dest_reticulated_giraffes_1792410472378.jpg';

// Newly Uploaded Gallery Images
export const GALLERY_ELEPHANTS_DUST = '/images/gallery_elephant_mother_calf_1792411022869.jpg';
export const GALLERY_ZEBRA_GREEN = '/images/gallery_zebra_portrait_green_1792411023701.jpg';
export const GALLERY_ZEBRAS_GOLDEN = '/images/gallery_zebras_herd_golden_grass_1792411023300.jpg';
export const GALLERY_RHINO_OXPECKERS = '/images/gallery_white_rhino_oxpeckers_1792411040565.jpg';
export const GALLERY_GAZELLE_SUNRISE = '/images/gallery_thomsons_gazelle_golden_hour_1792411040835.jpg';
export const GALLERY_CHEETAH_TREE = '/images/gallery_cheetah_in_acacia_tree_1792411041895.jpg';

export const LIONESS_HERO_IMAGE = '/images/hero_lioness_golden_sunlight_1792411418879.jpg';
export const TOURS_WELCOME_RHINO_IMAGE = '/images/tours_welcome_rhino_1792411995498.jpg';
export const TOURS_WELCOME_ELEPHANT_IMAGE = '/images/tours_welcome_elephant_savanna_1792411669198.jpg';

// Newly Uploaded Hero Rotating Slides
export const HERO_ELEPHANT_HERD = '/images/hero_elephant_herd_1792412419393.jpg';
export const HERO_ROARING_LIONESS = '/images/hero_roaring_lioness_1792412436415.jpg';
export const HERO_TWO_LIONESSES = '/images/hero_two_lionesses_1792412455797.jpg';
export const HERO_RIFT_GORGE = '/images/hero_rift_gorge_1792412471428.jpg';

// Official Push World Travel Logo Image (transparent background, no black box)
export const PUSH_WORLD_LOGO_IMAGE = '/images/push_world_logo_transparent.png';

export const COMPANY_INFO = {
  name: 'Push World Travel Ltd',
  legalName: 'Push World Travel Limited',
  tagline: 'Your World. Our Journey.',
  slogan: 'Think Travel, Think Push World',
  phone: '0725 356 926',
  phoneFormatted: '0725 356 926 (Call & WhatsApp)',
  phoneTel: '+254725356926',
  email: 'pushworldtravel@gmail.com',
  workingHours: {
    description: 'Available throughout the week, our team is dedicated to crafting tailored itineraries and handling all your safari booking details seamlessly.',
    monFri: '09:00 AM – 05:00 PM',
    sat: '09:00 AM – 01:00 PM',
    sun: 'Office Closed',
  },
  offices: [
    {
      country: 'KENYA',
      address: 'Push Building, Thome, Northern Bypass, Nairobi',
      isHeadquarters: true,
      phone: '0725 356 926',
    },
  ],
  socials: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    tripadvisor: 'https://tripadvisor.com',
  },
};

export const SAFARI_REGIONS = [
  {
    id: 'kenya',
    country: 'Kenya',
    title: 'Kenya Safaris',
    image: KENYA_IMAGE,
    description: 'Home to the iconic Maasai Mara, Amboseli herds, and breathtaking Great Rift Valley vistas.',
    toursCount: 14,
  },
  {
    id: 'tanzania',
    country: 'Tanzania',
    title: 'Tanzania Safaris',
    image: TANZANIA_IMAGE,
    description: 'Vast Serengeti endless plains, Ngorongoro Crater amphitheater, and Zanzibar spice beaches.',
    toursCount: 12,
  },
  {
    id: 'rwanda',
    country: 'Rwanda',
    title: 'Rwanda Safaris',
    image: RWANDA_IMAGE,
    description: 'Encounter gentle mountain gorillas amidst misty volcanic rainforests and clean green hills.',
    toursCount: 6,
  },
  {
    id: 'uganda',
    country: 'Uganda',
    title: 'Uganda Safaris',
    image: RWANDA_IMAGE,
    description: 'The Pearl of Africa featuring Bwindi impenetrable gorilla sanctuary, Queen Elizabeth Park, and Murchison Falls.',
    toursCount: 8,
  },
  {
    id: 'kenya-tanzania',
    country: 'Multi-Country',
    title: 'Kenya-Tanzania Safaris',
    image: ELEPHANTS_IMAGE,
    description: 'The classic dual circuit following the Great Wildebeest Migration across Mara River and Serengeti.',
    toursCount: 9,
  },
  {
    id: 'multi-country',
    country: 'Multi-Country',
    title: 'Multi-Country Safaris',
    image: HERO_IMAGE,
    description: 'Cross-border grand expeditions uniting wildlife savannahs, primate trekking, and Indian Ocean retreats.',
    toursCount: 7,
  },
];

// 9 Strictly Defined Services offered by Push World Travel
export const PUSH_WORLD_SERVICES: TravelService[] = [
  {
    id: 'safari-packages',
    title: 'Safari and Holiday Packages',
    shortDescription: 'Tailored wildlife expeditions, beach getaways, primate trekking, and multi-country circuits across East Africa and beyond.',
    iconName: 'Compass',
    image: KENYA_IMAGE,
    deliverables: [
      'Tailor-made itineraries for solo, couple, family & group travel',
      'Exclusive 4x4 pop-up roof Land Cruisers with licensed naturalist guides',
      'Handpicked safari lodges, private conservancies & boutique camps',
    ],
  },
  {
    id: 'flight-bookings',
    title: 'Flight Bookings',
    shortDescription: 'Domestic bush airstrip charters, scheduled regional flights, and competitive international airline ticketing in economy, business, and first class.',
    iconName: 'Plane',
    image: FLIGHT_TRAVEL_IMAGE,
    deliverables: [
      'Direct partnerships with major international and African carriers',
      'Bush hopper flights connecting Nairobi to Mara, Serengeti & Zanzibar',
      '24/7 rebooking assistance, seat selection & baggage support',
    ],
  },
  {
    id: 'hotel-reservations',
    title: 'Hotel, Resort, Vacation Home & BnB Reservations',
    shortDescription: 'Direct booking privileges across world-class safari lodges, beachfront luxury resorts, private villas, and curated urban hotels.',
    iconName: 'Hotel',
    image: LUXURY_RESORT_IMAGE,
    deliverables: [
      'Preferential contracted partner rates with leading hotel chains',
      'Private holiday homes, serviced apartments & eco-lodges',
      'Special room upgrades, honeymoon treats & complimentary breakfast',
    ],
  },
  {
    id: 'luxury-travel',
    title: 'Luxury and Premium Travel Arrangements',
    shortDescription: 'Discreet, bespoke VIP concierge services featuring private aviation, exclusive-use concessions, helicopter scenic flights, and personal butlers.',
    iconName: 'Crown',
    image: LUXURY_RESORT_IMAGE,
    deliverables: [
      'Private fly-in safaris and exclusive-use private safari villas',
      'Helicopter transfers to remote wildlife spots and mountain peaks',
      'Dedicated 24/7 private VIP travel concierge',
    ],
  },
  {
    id: 'custom-trip-planning',
    title: 'Custom Trip Planning',
    shortDescription: 'End-to-end personalized travel design tailored around your exact travel dates, pacing, interests, accessibility needs, and travel style.',
    iconName: 'Sliders',
    image: HERO_IMAGE,
    deliverables: [
      '1-on-1 itinerary consultation with certified safari planners',
      'Pacing customized for photographers, families, or honeymooners',
      'Comprehensive pre-departure briefing and packing guide',
    ],
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel and Team-Building Arrangements',
    shortDescription: 'Turnkey MICE solutions, executive retreats, corporate offsites, and structured team-building adventures across scenic destinations.',
    iconName: 'Briefcase',
    image: HQ_BUILDING_IMAGE,
    deliverables: [
      'Corporate conference facilities and luxury retreat venues',
      'Facilitated team-building outdoor challenges and bush dinners',
      'Centralized invoicing, travel policy compliance & logistics',
    ],
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance Assistance',
    shortDescription: 'Comprehensive guidance on international travel insurance, emergency medical evacuation coverage, trip cancellation, and baggage protection.',
    iconName: 'ShieldCheck',
    image: KENYA_IMAGE,
    deliverables: [
      'Partnership with AMREF Flying Doctors for airborne wilderness evacuation',
      'Advice on comprehensive international medical coverage',
      'Assistance with claim filing and travel document verification',
    ],
  },
  {
    id: 'airport-transfers',
    title: 'Airport Transfers & Ground Transportation',
    shortDescription: 'Punctual, private airport pick-up and drop-offs, VIP chauffeur services, and private 4x4 vehicle charter throughout East Africa.',
    iconName: 'Car',
    image: HQ_BUILDING_IMAGE,
    deliverables: [
      'Meet-and-greet service at JKIA Nairobi, Kilimanjaro (JRO) & Kigali',
      'Chauffeured luxury vans and rugged four-wheel-drive safari cruisers',
      'Air-conditioned, GPS-tracked vehicles with professional vetted drivers',
    ],
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance & Travel Documentation Guidance',
    shortDescription: 'Reliable guidance through eVisa applications, East Africa Tourist Visa protocols, passport validity rules, and vaccination requirements.',
    iconName: 'FileCheck',
    image: FLIGHT_TRAVEL_IMAGE,
    deliverables: [
      'Step-by-step eVisa filing for Kenya (eTA), Tanzania, Uganda & Rwanda',
      'Guidance on the single East Africa Tourist Visa (Kenya/Uganda/Rwanda)',
      'Up-to-date Yellow Fever and entry health protocol advisories',
    ],
  },
];

// Travel Packages with NO PRICING (clean and product-focused)
export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'mara-fly-in-3d',
    title: '3-Day Classic Maasai Mara Big Cats Safari',
    countries: ['Kenya'],
    durationDays: 3,
    durationNights: 2,
    category: 'Safari & Wildlife',
    tag: 'Best Seller',
    image: HERO_IMAGE,
    overview: 'Experience the world-renowned Maasai Mara National Reserve. Maximum game drive time in custom 4x4 pop-up roof Land Cruisers with licensed naturalist guides.',
    highlights: [
      'Guaranteed Big Five game drives with experienced safari guides',
      'Option for Sunrise Hot Air Balloon flight with champagne bush breakfast',
      'Visit to an authentic Maasai cultural village',
      'All meals, park fees, and 4x4 Land Cruiser transport included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara National Reserve',
        description: 'Depart Nairobi early morning, descending down the breathtaking Great Rift Valley escarpment. Arrive in time for lunch at your luxury tented camp. Embark on your first exhilarating afternoon game drive searching for lions, cheetahs, and elephants.',
        accommodation: 'Mara Sopa Lodge / Luxury Tented Camp',
        mealPlan: 'Lunch & Dinner',
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Wildlife Exploration',
        description: 'Spend an entire day traversing the golden plains with picnic lunch on the banks of the Mara River. Witness hippos, crocodiles, and expansive herds. Sunset game drive as predators begin their dusk hunts.',
        accommodation: 'Mara Sopa Lodge / Luxury Tented Camp',
        mealPlan: 'Breakfast, Picnic Lunch & Dinner',
      },
      {
        day: 3,
        title: 'Morning Game Drive & Return to Nairobi',
        description: 'Early morning game drive capturing wildlife during prime activity. Enjoy full breakfast before a leisurely drive back to Nairobi or airport drop-off for onward flights.',
        accommodation: 'End of Tour / Hotel Drop-off',
        mealPlan: 'Breakfast',
      },
    ],
    inclusions: [
      'Transport in custom 4x4 Safari Land Cruiser with pop-up roof',
      'Services of a professional English/Multilingual Safari Guide',
      'All National Park entrance fees and government levies',
      'Full board accommodation (2 nights luxury tented camp)',
      'Complimentary bottled drinking water, Wi-Fi, and binoculars on board',
    ],
    exclusions: [
      'International flights and visas',
      'Optional Maasai Village visit',
      'Optional Hot Air Balloon Safari',
      'Personal travel insurance and tips',
    ],
  },
  {
    id: 'serengeti-ngorongoro-5d',
    title: '5-Day Serengeti & Ngorongoro Crater Wonders',
    countries: ['Tanzania'],
    durationDays: 5,
    durationNights: 4,
    category: 'Safari & Wildlife',
    tag: 'Popular',
    image: TANZANIA_IMAGE,
    overview: 'Traverse the legendary endless plains of Serengeti National Park and descend 600 meters into the Ngorongoro Crater, the eighth wonder of the world.',
    highlights: [
      'Full day exploration of the UNESCO-protected Ngorongoro caldera',
      'High density of lions, cheetahs, and elusive leopards in Central Serengeti',
      'Visit Lake Manyara with its tree-climbing lions and flamingo flocks',
      'Stay in authentic mid-range or luxury safari lodges',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arusha to Lake Manyara National Park',
        description: 'Pick up from Arusha. Drive to Lake Manyara National Park for afternoon game viewing, spotting flamingos, baboon troops, and tree-climbing lions.',
        accommodation: 'Lake Manyara Serena Safari Lodge',
        mealPlan: 'Lunch & Dinner',
      },
      {
        day: 2,
        title: 'Lake Manyara to Serengeti National Park',
        description: 'Ascend the crater highlands and descend into the vast Serengeti. Game drive en route to central Serengeti with abundant year-round wildlife.',
        accommodation: 'Serengeti Heritage Tented Camp',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 3,
        title: 'Full Day in Serengeti National Park',
        description: 'Extensive morning and late-afternoon game drives following predator tracks and wildebeest migrations.',
        accommodation: 'Serengeti Heritage Tented Camp',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 4,
        title: 'Serengeti to Ngorongoro Conservation Area',
        description: 'Morning game drive in Serengeti, then transit to the rim of Ngorongoro with panoramic view of the volcanic bowl.',
        accommodation: 'Ngorongoro Rhino Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 5,
        title: 'Ngorongoro Crater Descent & Return to Arusha',
        description: 'Early morning descent into the crater floor for world-class Big Five wildlife viewing, including black rhinos. Return to Arusha by evening.',
        accommodation: 'Arusha Hotel or Kilimanjaro Airport (JRO)',
        mealPlan: 'Breakfast & Picnic Lunch',
      },
    ],
    inclusions: [
      'All Crater service fees and National Park entrance permits',
      'Custom 4x4 Land Cruiser with fridge and radio communication',
      '4 nights full-board accommodation',
      'Government taxes and tourism levies',
    ],
    exclusions: ['Visa fees', 'Alcoholic drinks', 'Driver-guide gratuities'],
  },
  {
    id: 'kenya-tanzania-combo-8d',
    title: '8-Day Great East African Migration & Amboseli Grand Circuit',
    countries: ['Kenya', 'Tanzania', 'Multi-Country'],
    durationDays: 8,
    durationNights: 7,
    category: 'Luxury Escapes',
    tag: 'Flagship Tour',
    image: ELEPHANTS_IMAGE,
    overview: 'The definitive East African safari combining Amboseli views of Kilimanjaro, Lake Nakuru rhinos, Maasai Mara big cats, and the endless Serengeti savannas.',
    highlights: [
      'Cross border seamlessly with Push World Travel licensed guides',
      'Views of Mount Kilimanjaro with massive elephant tuskers in foreground',
      'Both Maasai Mara & Serengeti in a single comprehensive journey',
      'Full descent into Ngorongoro Crater floor',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Morning drive to Amboseli. Afternoon game drive among large elephant families against the backdrop of snow-capped Kilimanjaro.',
        accommodation: 'Amboseli Serena Safari Lodge',
        mealPlan: 'Lunch & Dinner',
      },
      {
        day: 2,
        title: 'Amboseli to Lake Nakuru National Park',
        description: 'Transit through the Great Rift Valley to Lake Nakuru. Sanctuary game drive for endangered rhinos and Rothschild giraffes.',
        accommodation: 'Lake Nakuru Sopa Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 3,
        title: 'Lake Nakuru to Maasai Mara Reserve',
        description: 'Journey to the legendary Maasai Mara. Afternoon game viewing across undulating grasslands.',
        accommodation: 'Mara Ashnil Camp',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 4,
        title: 'Full Day Maasai Mara Safari',
        description: 'Comprehensive day game drive exploring Mara River crossing points, predator prides, and open savanna.',
        accommodation: 'Mara Ashnil Camp',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 5,
        title: 'Maasai Mara to Serengeti via Isebania Border',
        description: 'Border crossing assistance with our Kenya and Tanzania teams. Enter Northern Serengeti for an afternoon game drive.',
        accommodation: 'Serengeti Simba Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 6,
        title: 'Serengeti Wildlife Tracking',
        description: 'Search for cheetahs on kopjes, tree leopards, and vast herds of herbivores.',
        accommodation: 'Serengeti Simba Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 7,
        title: 'Serengeti to Ngorongoro Conservation Area',
        description: 'Drive along Olduvai Gorge region towards the Ngorongoro Crater rim. Rest and sunset dinner on the rim.',
        accommodation: 'Ngorongoro Serena Safari Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 8,
        title: 'Ngorongoro Crater Tour & Drop-off in Arusha/Nairobi',
        description: 'Early crater descent for black rhino and lion sightings. Drive to Arusha or shuttle to Nairobi.',
        accommodation: 'Departure',
        mealPlan: 'Breakfast & Picnic Lunch',
      },
    ],
    inclusions: [
      'Cross-border logistics & dedicated 4x4 safari vehicles',
      '7 nights luxury safari lodge accommodation',
      'All concession fees, crater permits, and national park passes',
      'Dedicated safari guide with 10+ years field experience',
    ],
    exclusions: ['Visa for Kenya & Tanzania', 'Travel insurance', 'Alcoholic beverages'],
  },
  {
    id: 'kenya-beach-bush-7d',
    title: '7-Day Amboseli, Tsavo & Diani Beach Tropical Holiday',
    countries: ['Kenya'],
    durationDays: 7,
    durationNights: 6,
    category: 'Beach Holidays',
    tag: 'Bush to Beach',
    image: BEACH_RESORT_IMAGE,
    overview: 'The ideal balance: exciting safari game drives in Amboseli and Tsavo followed by blissful white-sand beach relaxation on Diani Beach overlooking turquoise waters.',
    highlights: [
      'Elephants of Amboseli and red dust lions of Tsavo West',
      'Shetani lava flow and Mzima Springs underwater hippo viewing hide',
      '3 relaxing nights on award-winning Diani Beach',
      'Standard Gauge Railway or coastal flight transfer',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Drive southeast towards Mount Kilimanjaro. Afternoon game drive in Amboseli.',
        accommodation: 'Ol Tukai Lodge Amboseli',
        mealPlan: 'Lunch & Dinner',
      },
      {
        day: 2,
        title: 'Amboseli to Tsavo West National Park',
        description: 'Morning game drive, then proceed to Tsavo West. Visit Mzima Springs.',
        accommodation: 'Kilaguni Serena Safari Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 3,
        title: 'Tsavo West to Diani Beach Resort',
        description: 'Morning game drive exiting the park, drive to the Indian Ocean coast and check into your beachfront resort.',
        accommodation: 'Diani Sea Resort / Baobab Beach Resort',
        mealPlan: 'Breakfast & All-Inclusive Dinner',
      },
      {
        day: 4,
        title: 'Diani Beach Sun & Ocean Leisure',
        description: 'Full day enjoying powdery white sands, swimming in the warm Indian Ocean.',
        accommodation: 'Diani Sea Resort',
        mealPlan: 'All Inclusive',
      },
      {
        day: 5,
        title: 'Diani Beach Water Sports & Relaxation',
        description: 'Snorkeling, kite surfing, or serene spa treatment by the ocean breeze.',
        accommodation: 'Diani Sea Resort',
        mealPlan: 'All Inclusive',
      },
      {
        day: 6,
        title: 'Diani Beach Leisure & Sunset Cruise',
        description: 'Final full day of tropical coastal bliss.',
        accommodation: 'Diani Sea Resort',
        mealPlan: 'All Inclusive',
      },
      {
        day: 7,
        title: 'Mombasa / Ukunda Transfer for Departure',
        description: 'Transfer to Moi International Airport or SGR train terminal for your return journey.',
        accommodation: 'Departure',
        mealPlan: 'Breakfast',
      },
    ],
    inclusions: [
      'Safari lodge & all-inclusive beach resort accommodation',
      '4x4 Land Cruiser safari vehicle and experienced guide',
      'Park fees for Amboseli & Tsavo West',
      'Coast transfer logistics',
    ],
    exclusions: ['Optional marine excursions', 'Gratuities', 'Personal shopping'],
  },
  {
    id: 'rwanda-gorilla-trek-4d',
    title: '4-Day Volcanoes Gorilla Trekking & Golden Monkeys',
    countries: ['Rwanda'],
    durationDays: 4,
    durationNights: 3,
    category: 'Gorilla Trekking',
    tag: 'Bucket List',
    image: RWANDA_IMAGE,
    overview: 'One of the world’s most poignant wildlife encounters: trekking endangered mountain gorillas through the misty slopes of Volcanoes National Park in Rwanda.',
    highlights: [
      'Official Rwanda Development Board (RDB) Gorilla Trekking Permit included',
      'Golden Monkey tracking through lush bamboo forests',
      'Kigali Genocide Memorial & cultural city tour',
      'Scenic drive through the rolling "Land of a Thousand Hills"',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kigali & Transfer to Musanze',
        description: 'Meet our Push World Travel guide at Kigali International Airport. Visit Kigali Genocide Memorial, then scenic drive to Volcanoes National Park.',
        accommodation: 'Mountain Gorilla View Lodge',
        mealPlan: 'Dinner',
      },
      {
        day: 2,
        title: 'The Gorilla Trekking Day of a Lifetime',
        description: 'Briefing at Kinigi headquarters. Trek into the rainforest accompanied by expert rangers. Spend a magical, uninterrupted hour with a gorilla family.',
        accommodation: 'Mountain Gorilla View Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 3,
        title: 'Golden Monkey Trekking & Cultural Village',
        description: 'Morning trek to observe playful, endangered Golden Monkeys. Afternoon cultural village immersion.',
        accommodation: 'Mountain Gorilla View Lodge',
        mealPlan: 'Breakfast, Lunch & Dinner',
      },
      {
        day: 4,
        title: 'Return to Kigali & Airport Transfer',
        description: 'Panoramic journey back to Kigali, souvenir artisan market visit, and airport transfer for outbound flight.',
        accommodation: 'Departure',
        mealPlan: 'Breakfast & Lunch',
      },
    ],
    inclusions: [
      'Official Gorilla Trekking Permit',
      'Golden Monkey tracking permit',
      'All ground transfers in 4x4 vehicle',
      '3 nights luxury lodge accommodation with all meals',
    ],
    exclusions: ['Porter hire fee', 'Personal tips', 'Alcoholic drinks'],
  },
  {
    id: 'international-dubai-getaway-5d',
    title: '5-Day Dubai & Arabian Dunes Luxury Escape',
    countries: ['International'],
    durationDays: 5,
    durationNights: 4,
    category: 'International Getaways',
    tag: 'Worldwide Travel',
    image: FLIGHT_TRAVEL_IMAGE,
    overview: 'Complete international holiday package featuring luxury 5-star hotel stays, desert dune safaris, private yacht cruises, and VIP shopping excursions.',
    highlights: [
      '5-star luxury downtown hotel accommodation',
      'VIP 4x4 Desert Safari with barbecue dinner and dune bashing',
      'Private sunset marina yacht cruise with skyline views',
      'Burj Khalifa observatory fast-track tickets included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Private Hotel Transfer',
        description: 'Welcome by Push World Travel airport representative, chauffeured transfer to your luxury downtown hotel.',
        accommodation: 'Address Downtown / JW Marriott Marquis',
        mealPlan: 'Dinner',
      },
      {
        day: 2,
        title: 'Dubai Modern City Tour & Burj Khalifa',
        description: 'Private guided architectural tour, Dubai Mall, and top of the Burj Khalifa observation decks.',
        accommodation: 'Address Downtown',
        mealPlan: 'Breakfast',
      },
      {
        day: 3,
        title: 'Arabian Desert 4x4 Safari & Bedouin Camp',
        description: 'Exhilarating red sand dune bashing, sandboarding, camel rides, and Arabic culinary barbecue dinner.',
        accommodation: 'Address Downtown',
        mealPlan: 'Breakfast & Desert BBQ Dinner',
      },
      {
        day: 4,
        title: 'Private Yacht Cruise & Souk Gold Shopping',
        description: 'Morning leisure and shopping, followed by a private sunset yacht cruise along Dubai Marina and Palm Jumeirah.',
        accommodation: 'Address Downtown',
        mealPlan: 'Breakfast',
      },
      {
        day: 5,
        title: 'Departure Transfer',
        description: 'Private transfer to Dubai International Airport (DXB) for your onward flight.',
        accommodation: 'Departure',
        mealPlan: 'Breakfast',
      },
    ],
    inclusions: [
      '4 nights 5-star luxury hotel accommodation',
      'Private airport and excursion transfers',
      'VIP Desert Safari and private yacht charter',
      'All entry permits and guided tours',
    ],
    exclusions: ['International flights', 'UAE tourist visa if applicable', 'Personal expenses'],
  },
];

// Curated Travel Gallery Items (Updated with authentic wildlife uploads and coastal/beach photography)
export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-elephant-calf',
    title: 'African Elephant Mother & Snuggling Calf',
    category: 'Wildlife & Safaris',
    location: 'Amboseli, Kenya',
    imageUrl: GALLERY_ELEPHANTS_DUST,
    caption: 'Mother elephant tossing dust with her trunk as her baby calf nestles close by.',
  },
  {
    id: 'gal-zebra-portrait',
    title: 'Plains Zebra on Savannah Grassland',
    category: 'Wildlife & Safaris',
    location: 'Maasai Mara, Kenya',
    imageUrl: GALLERY_ZEBRA_GREEN,
    caption: 'Majestic plains zebra standing alert on lush green grassland.',
  },
  {
    id: 'gal-zebras-golden',
    title: 'Zebra Herd Traversing Golden Grassland',
    category: 'Wildlife & Safaris',
    location: 'Serengeti Plains, East Africa',
    imageUrl: GALLERY_ZEBRAS_GOLDEN,
    caption: 'Herd of zebras marching through golden savannah grasses under the expansive blue sky.',
  },
  {
    id: 'gal-white-rhino',
    title: 'White Rhinoceros with Oxpeckers',
    category: 'Wildlife & Safaris',
    location: 'Ol Pejeta Conservancy, Kenya',
    imageUrl: GALLERY_RHINO_OXPECKERS,
    caption: 'African white rhino accompanied by symbiotic red-billed oxpecker birds on its back.',
  },
  {
    id: 'gal-gazelle-sunrise',
    title: 'Thomson\'s Gazelle in Sunrise Glow',
    category: 'Wildlife & Safaris',
    location: 'Maasai Mara, Kenya',
    imageUrl: GALLERY_GAZELLE_SUNRISE,
    caption: 'Graceful gazelle standing illuminated by golden morning rim light.',
  },
  {
    id: 'gal-cheetah-tree',
    title: 'African Cheetah in Acacia Tree',
    category: 'Wildlife & Safaris',
    location: 'Serengeti, Tanzania',
    imageUrl: GALLERY_CHEETAH_TREE,
    caption: 'Cheetah perched high in thorny acacia branches scanning the open plains.',
  },
  {
    id: 'gal-diani-beach',
    title: 'Pristine Diani Beach Turquoise Waters',
    category: 'Beaches & Coast',
    location: 'South Coast, Kenya',
    imageUrl: BEACH_RESORT_IMAGE,
    caption: 'Powdery white sands and crystal turquoise water on award-winning Diani Beach.',
  },
  {
    id: 'gal-coastal-resort',
    title: 'Coastal Luxury Ocean Resort',
    category: 'Beaches & Coast',
    location: 'Swahili Coastline, Kenya',
    imageUrl: LUXURY_RESORT_IMAGE,
    caption: 'Boutique oceanfront resort infinity deck overlooking the Indian Ocean.',
  },
];

export const BIG_FIVE: BigFiveAnimal[] = [
  {
    id: 'lion',
    name: 'African Lion',
    swahiliName: 'Simba',
    scientificName: 'Panthera leo',
    funFact: 'Lion prides are female-led coalitions that hunt cooperatively under cover of twilight and dawn.',
    bestParks: ['Maasai Mara (Kenya)', 'Serengeti (Tanzania)', 'Tsavo East (Kenya)'],
    diet: 'Carnivorous (Wildebeest, Zebras, Buffalo)',
    conservationStatus: 'Vulnerable',
    image: HERO_IMAGE,
  },
  {
    id: 'elephant',
    name: 'African Elephant',
    swahiliName: 'Tembo',
    scientificName: 'Loxodonta africana',
    funFact: 'Amboseli is globally famous for its free-ranging elephants with Mount Kilimanjaro as a majestic backdrop.',
    bestParks: ['Amboseli National Park (Kenya)', 'Tarangire (Tanzania)', 'Tsavo West (Kenya)'],
    diet: 'Herbivorous (Grasses, foliage, bark, fruits)',
    conservationStatus: 'Endangered',
    image: ELEPHANTS_IMAGE,
  },
  {
    id: 'leopard',
    name: 'African Leopard',
    swahiliName: 'Chui',
    scientificName: 'Panthera pardus pardus',
    funFact: 'Masters of stealth and camouflage, leopards frequently hoist heavy kills up into acacia trees.',
    bestParks: ['Samburu (Kenya)', 'Serengeti (Tanzania)', 'Maasai Mara (Kenya)'],
    diet: 'Carnivorous (Antelopes, baboons, warthogs)',
    conservationStatus: 'Vulnerable',
    image: TANZANIA_IMAGE,
  },
  {
    id: 'rhino',
    name: 'Black & White Rhinoceros',
    swahiliName: 'Kifaru',
    scientificName: 'Diceros bicornis / Ceratotherium simum',
    funFact: 'Ol Pejeta Conservancy and Lake Nakuru are the premier sanctuaries protecting both black and white rhino species.',
    bestParks: ['Lake Nakuru (Kenya)', 'Ol Pejeta Conservancy (Kenya)', 'Ngorongoro Crater (Tanzania)'],
    diet: 'Browsers & Grazers (Shrubs, grasses)',
    conservationStatus: 'Critically Endangered (Black Rhino)',
    image: KENYA_IMAGE,
  },
  {
    id: 'buffalo',
    name: 'Cape Buffalo',
    swahiliName: 'Nyati',
    scientificName: 'Syncerus caffer',
    funFact: 'Known as the "Black Death" of the savannah for their fierce defense tactics and formidable fused horns.',
    bestParks: ['Ngorongoro Crater (Tanzania)', 'Maasai Mara (Kenya)', 'Lake Nakuru (Kenya)'],
    diet: 'Herbivorous (Coarse savannah tall grasses)',
    conservationStatus: 'Near Threatened',
    image: ELEPHANTS_IMAGE,
  },
];

export const DESTINATIONS: Destination[] = [
  // Kenya Destinations (matching Screenshots 2 & 3)
  {
    id: 'hells-gate',
    name: "Hell's Gate National Park",
    country: 'Kenya',
    tagline: 'Dramatic red sandstone gorges, volcanic towers, and cycling alongside zebras.',
    description: 'One of the few national parks in Africa where you can explore on foot or by bicycle. Walk through dramatic water-gouged canyons, marvel at towering rock spires like Fischer’s Tower, and discover natural hot geysers in the Great Rift Valley.',
    image: HELLS_GATE_IMAGE,
    bestTime: 'June to March (Dry weather ideal for hiking and cycling)',
    wildlife: ['Zebras', 'Giraffes', 'War-thogs', 'Baboons', 'Raptors', 'Klipspringers'],
    highlights: ['Gorge Hiking Trails', 'Bicycle Safaris', 'Fischer’s Tower Rock Climbing', 'Geothermal Spas'],
  },
  {
    id: 'lake-nakuru',
    name: 'Lake Nakuru National park',
    country: 'Kenya',
    tagline: 'World-famous rhino sanctuary, endangered Rothschild giraffes, and flamingo waters.',
    description: 'Nestled on the floor of the Great Rift Valley, Lake Nakuru is surrounded by bushy grasslands and yellow-barked acacia forests. It provides a vital stronghold for critically endangered black and white rhinos and over 450 bird species.',
    image: LEWA_IMAGE,
    bestTime: 'Year-round, with dry months providing easiest game viewing',
    wildlife: ['Black Rhinos', 'White Rhinos', 'Rothschild Giraffes', 'Lions', 'Flamingos', 'Pelicans'],
    highlights: ['Rhino Sanctuary Tracking', 'Baboon Cliff Viewpoint', 'Makalia Waterfalls', 'Bird Watching'],
  },
  {
    id: 'ol-pejeta',
    name: 'Olpejeta Conservancy',
    country: 'Kenya',
    tagline: 'Home to the world’s last two Northern White Rhinos & chimpanzee sanctuary.',
    description: 'A trailblazing 90,000-acre wildlife conservancy at the foot of Mount Kenya with the highest predator density in Kenya outside the Mara. Home to sweetwaters chimpanzee sanctuary and Africa’s most celebrated rhino protection program.',
    image: OLPEJETA_IMAGE,
    bestTime: 'December to March & June to October',
    wildlife: ['Northern White Rhinos', 'Black Rhinos', 'Lions', 'Chimpanzees', 'Cheetahs', 'Grevy’s Zebras'],
    highlights: ['Northern White Rhino Encounter', 'Chimpanzee Sanctuary', 'Night Game Drives', 'Bush Walks'],
  },
  {
    id: 'naibosho',
    name: 'Naibosho Conservancy',
    country: 'Kenya',
    tagline: 'Pristine 50,000-acre Mara eco-system with one of the highest lion densities in Africa.',
    description: 'Mara Naboisho offers an exclusive safari experience directly adjoining the Maasai Mara National Reserve. Strict vehicle limits ensure quiet, authentic wildlife encounters and unforgettable guided walking safaris with local Maasai trackers.',
    image: LEWA_IMAGE,
    bestTime: 'July to October (Great Migration) & Year-round for Big Cats',
    wildlife: ['Lion Prides', 'Cheetahs', 'Leopards', 'Elephants', 'Aardwolves', 'Wild Dogs'],
    highlights: ['Night Game Drives', 'Guided Walking Safaris', 'Authentic Maasai Partnerships', 'Off-road Tracking'],
  },
  {
    id: 'lewa',
    name: 'Lewa Wildlife Conservancy',
    country: 'Kenya',
    tagline: 'UNESCO World Heritage wildlife corridor and global model for community conservation.',
    description: 'Stretching across northern foothills of Mount Kenya, Lewa protects 12% of Kenya’s black rhino population and the world’s single largest endangered population of Grevy’s zebras across rolling savannah grasslands.',
    image: KENYA_IMAGE,
    bestTime: 'January to March & June to September',
    wildlife: ['Black Rhinos', 'White Rhinos', 'Grevy’s Zebras', 'Elephants', 'Lions', 'Leopards'],
    highlights: ['Rhino Tracking on Foot', 'Horseback Safaris', 'Scenic Canopy Canopy Walkway', 'Mount Kenya Views'],
  },
  {
    id: 'tsavo-west',
    name: 'Tsavo West National Park',
    country: 'Kenya',
    tagline: 'Rugged volcanic landscapes, Shetani lava flows, and crystal-clear Mzima Springs.',
    description: 'Characterized by dramatic volcanic cones, dense savannah woodlands, and the famed Mzima Springs where millions of gallons of crystal-clear water gush from volcanic rock, creating an underwater haven for hippos and crocodiles.',
    image: ELEPHANTS_IMAGE,
    bestTime: 'June to October & January to February',
    wildlife: ['Dust-red Elephants', 'Lions', 'Leopards', 'Hippos', 'Crocodiles', 'Lesser Kudus'],
    highlights: ['Mzima Springs Underwater Hide', 'Shetani Lava Flows', 'Ngulia Rhino Sanctuary', 'Chaimu Crater Hike'],
  },
  {
    id: 'tsavo-east',
    name: 'Tsavo East National Park',
    country: 'Kenya',
    tagline: 'The Theater of the Wild: endless flat scrublands and famous red-dust elephant herds.',
    description: 'One of the oldest and largest national parks in Kenya. Renowned for its vast open semi-arid savannas, the 300km-long Yatta Plateau (the world’s longest lava flow), and legendary tuskers bathing in reddish volcanic soils.',
    image: ELEPHANTS_IMAGE,
    bestTime: 'May to October & January to March',
    wildlife: ['Red-dust Elephants', 'Maneless Lions', 'Cheetahs', 'Waterbucks', 'Oryx', 'Gerenuks'],
    highlights: ['Yatta Plateau Lava Ridge', 'Mudanda Rock Viewpoint', 'Aruba Dam Wildlife Gatherings', 'Galana River Rapids'],
  },
  {
    id: 'mombasa-malindi-diani',
    name: 'Mombasa, Malindi & Diani',
    country: 'Kenya',
    tagline: 'Idyllic coastal bliss, historic Swahili culture, marine reserves, and white coral beaches.',
    description: 'Kenya’s tropical coastline blends centuries-old Portuguese and Arab history in Mombasa’s Fort Jesus with the world-renowned powdery white sands and turquoise waters of Diani and Malindi marine national parks.',
    image: BEACH_RESORT_IMAGE,
    bestTime: 'October to April & July to August (Warm sunny beach weather)',
    wildlife: ['Dolphins', 'Whale Sharks', 'Sea Turtles', 'Colobus Monkeys', 'Exotic Coral Reef Fish'],
    highlights: ['Diani Beach Sun & Watersports', 'Wasini Island Dhow Cruise', 'Kisite Mpunguti Snorkeling', 'Fort Jesus UNESCO Tour'],
  },
  {
    id: 'loisaba',
    name: 'Loisaba Conservancy',
    country: 'Kenya',
    tagline: '56,000 acres of untamed wilderness, star-bed sleepouts, and rare northern species.',
    description: 'Perched on the edge of the Laikipia plateau, Loisaba offers dramatic escarpment views, iconic custom star-beds under open African night skies, and thriving populations of wild dogs, lions, and Grevy’s zebras.',
    image: LUXURY_RESORT_IMAGE,
    bestTime: 'June to October & December to March',
    wildlife: ['Wild Dogs', 'Lions', 'Leopards', 'Elephants', 'Grevy’s Zebras', 'Greater Kudus'],
    highlights: ['Loisaba Star Beds', 'Horse & Camel Riding', 'Anti-poaching Sniffer Dog Tracking', 'River Rafting'],
  },
  {
    id: 'masai-mara',
    name: 'Maasai Mara National Reserve',
    country: 'Kenya',
    tagline: 'The undisputed jewel of African wildlife and Great Migration theatre.',
    description: 'Renowned worldwide for its exceptional population of big cats, sprawling golden savannas, and the dramatic annual Mara River crossing of over 1.5 million wildebeest and zebras.',
    image: HERO_IMAGE,
    bestTime: 'July to October (Migration) & Year-round for Big Cats',
    wildlife: ['Lions', 'Cheetahs', 'Leopards', 'Elephants', 'Giraffes', 'Hippos'],
    highlights: ['Mara River Crossings', 'Hot Air Balloon Safaris', 'Maasai Village Encounters'],
  },
  {
    id: 'amboseli',
    name: 'Amboseli National Park',
    country: 'Kenya',
    tagline: 'Home of the African Elephant in the shadow of Mount Kilimanjaro.',
    description: 'Amboseli offers iconic photography: majestic tuskers striding across open plains with the snow-covered peak of Kilimanjaro rising into the sky.',
    image: ELEPHANTS_IMAGE,
    bestTime: 'June to October & January to February (Clear mountain views)',
    wildlife: ['Big Tusker Elephants', 'Lions', 'Cheetahs', 'Pelicans', 'Buffaloes'],
    highlights: ['Kilimanjaro Panoramic Backdrops', 'Observation Hill', 'Elephant Research Center'],
  },

  // Tanzania Destinations
  {
    id: 'serengeti',
    name: 'Serengeti National Park',
    country: 'Tanzania',
    tagline: 'Endless plains holding the most complex mammal migration on earth.',
    description: 'Covering 14,750 square kilometers, the Serengeti offers pristine wilderness, granite kopjes where leopards lounge, and vast herds roaming under limitless skies.',
    image: TANZANIA_IMAGE,
    bestTime: 'December to July (Southern & Northern migration movements)',
    wildlife: ['Wildebeest', 'Lions', 'Cheetahs', 'Zebras', 'Hyenas', 'Wild Dogs'],
    highlights: ['Seronera Valley Game Drives', 'Kopje Predator Stalking', 'Calving Season in Ndutu'],
  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro Conservation Area',
    country: 'Tanzania',
    tagline: 'The world’s largest intact volcanic caldera teeming with wildlife.',
    description: 'An unbroken, 20-kilometer wide volcanic caldera supporting over 25,000 large mammals in an enclosed natural sanctuary, including critically endangered black rhinos.',
    image: TANZANIA_IMAGE,
    bestTime: 'Year-round with steady resident game on the crater floor',
    wildlife: ['Black Rhinos', 'Crater Lions', 'Flamingos', 'Golden Jackals', 'Hippos'],
    highlights: ['Crater Floor Game Drives', 'Lake Magadi Flamingos', 'Olduvai Gorge Archaeology'],
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar Island',
    country: 'Tanzania',
    tagline: 'Pristine turquoise waters, white sand beaches, and historic Stone Town.',
    description: 'The exotic Spice Island in the Indian Ocean, featuring centuries-old Arab and Swahili architecture in Stone Town, world-class coral reef diving, and tropical relaxation.',
    image: BEACH_RESORT_IMAGE,
    bestTime: 'June to October & December to February',
    wildlife: ['Dolphins', 'Green Sea Turtles', 'Red Colobus Monkeys', 'Tropical Fish'],
    highlights: ['Stone Town UNESCO Heritage', 'Spice Plantation Tours', 'Prison Island Giant Tortoises'],
  },

  // Rwanda Destinations
  {
    id: 'volcanoes-np',
    name: 'Volcanoes National Park',
    country: 'Rwanda',
    tagline: 'Misty volcanic peaks and Dian Fossey’s beloved mountain gorillas.',
    description: 'Spanning five dramatic volcanoes cloaked in dense rainforest and bamboo, providing premier gorilla and golden monkey tracking in clean, welcoming Rwanda.',
    image: RWANDA_IMAGE,
    bestTime: 'June to September & December to February',
    wildlife: ['Mountain Gorillas', 'Golden Monkeys', 'Spotted Hyenas', 'Bushbucks'],
    highlights: ['Dian Fossey Tomb Trek', 'Golden Monkey Excursions', 'Musanze Caves Exploration'],
  },

  // Uganda Destinations
  {
    id: 'bwindi',
    name: 'Bwindi Impenetrable Forest',
    country: 'Uganda',
    tagline: 'Ancient primeval forest harboring half the world’s mountain gorillas.',
    description: 'A dense, mist-shrouded jungle spanning over 25,000 years, offering one of humanity’s most thrilling and intimate wildlife encounters on the planet.',
    image: RWANDA_IMAGE,
    bestTime: 'June to August & December to February (Dry trekking conditions)',
    wildlife: ['Mountain Gorillas', 'Chimpanzees', 'Forest Elephants', 'Albertine Rift Endemics'],
    highlights: ['Habituated Gorilla Trekking', 'Batwa Cultural Trail', 'Waterfall Nature Walks'],
  },
];

export const TOP_FOOTER_DESTINATIONS = [
  'Nairobi National Park',
  'Lake Naivasha',
  'Lake Nakuru',
  'Amboseli National Park',
  'Masai Mara National Reserve',
  'Lake Bogoria',
  'Shimba Hills National Reserve',
  'Meru National Park',
  'Aberdare National Park',
  'Taita Hills Wildlife Sanctuary',
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is a tour and travel agency?',
    answer: 'A tour and travel agency is a professional service provider that arranges, coordinates, and manages travel logistics on behalf of clients. At Push World Travel Ltd, we curate complete travel experiences including custom safari vehicles, flight bookings, hotel & luxury lodge reservations, park permits, airport transfers, and 24/7 client dispatch support.',
  },
  {
    id: 'faq-2',
    question: 'What services does a travel agency offer?',
    answer: 'Push World Travel Ltd provides end-to-end travel services including Safari & Holiday Packages, International & Domestic Flight Bookings, Hotel & Resort Reservations, Luxury VIP Concierge Travel, Custom Itinerary Planning, Corporate Travel & Team Building, Travel Insurance Assistance, Airport Transfers & Chauffeur Services, and Visa Assistance.',
  },
  {
    id: 'faq-3',
    question: 'How do I choose a good travel agency in East Africa?',
    answer: 'Look for an established, licensed tour operator with deep local roots, active physical offices (such as our corporate headquarters at Push Building, Thome, Northern Bypass, Nairobi, Kenya), 100% transparent itinerary planning, verified customer reviews on TripAdvisor, and seasoned, certified tour guides.',
  },
  {
    id: 'faq-4',
    question: 'What is a tour package?',
    answer: 'A tour package is a bundled travel plan combining essential travel components into a single organized experience. A typical Push World Travel package includes national park entrance fees, daily game drives with a professional guide, round-trip transport in custom 4x4 Land Cruisers, full-board accommodation, and bottled drinking water throughout your journey.',
  },
  {
    id: 'faq-5',
    question: 'What are some popular holiday tours packages in Kenya?',
    answer: 'Our top-requested packages include: 1) The 3-Day Maasai Mara Big Cats Safari; 2) The 5-Day Amboseli, Lake Nakuru & Maasai Mara Circuit; 3) The 7-Day Bush-to-Beach combining Amboseli, Tsavo, and Diani Beach; and 4) Cross-border 8-Day Kenya-Tanzania Great Migration safaris.',
  },
  {
    id: 'faq-6',
    question: 'What is the role of a tour operator?',
    answer: 'A tour operator directly manages and executes the actual tour on the ground. Unlike a generic online booking portal, Push World Travel owns and maintains our fleet of specialized 4x4 Land Cruisers, directly employs licensed safari driver-guides, negotiates preferred rates with premium luxury camps and lodges, monitors wildlife movements daily to optimize your sightings, and ensures your safety and comfort 24 hours a day.',
  },
  {
    id: 'faq-7',
    question: 'What are some top travel destinations in East Africa?',
    answer: 'East Africa offers unbeatable diversity: Maasai Mara National Reserve (Kenya) for big cats and the Great Migration; Serengeti National Park & Ngorongoro Crater (Tanzania) for boundless savannas and volcanic calderas; Amboseli National Park (Kenya) for giant elephant herds under Mount Kilimanjaro; Volcanoes National Park (Rwanda) and Bwindi Impenetrable Forest (Uganda) for mountain gorilla encounters; and the idyllic turquoise waters of Zanzibar and Diani Beach.',
  },
];

export const WHY_CHOOSE_US_POINTS = [
  {
    id: 'leading-agency',
    title: 'Leading Tours & Travel Operator',
    description: 'Push World Travel is one of the best leading Tours and Travel Companies in Kenya, Africa. Offering the most unique and affordable travel packages in Kenya, Uganda, Rwanda & Tanzania. We provide ultimate safaris from the vast savannahs\' and into the wild jungles.',
  },
  {
    id: 'safari-fleet',
    title: 'Custom 4x4 Vehicles & Gear',
    description: 'We offer all-season holiday tours and safaris upon request. Our tour vehicles are perfectly in new condition and all are four by four (4x4) wheel drives for guaranteed exceptional Safari. Also, they are equipped with modern binoculars, fridge compartments, a charging system, Wi-fi, and Radio calls.',
  },
  {
    id: 'tailored-luxury',
    title: 'Tailored Service & Luxury Camps',
    description: 'We are fast, reliable, friendly and offer personally tailored holiday vacations and safaris to our guests with top-quality lodges, camps, and luxurious tented camps for that wild safari experience. Our safaris are exceptional, try with us and you will love Africa more!',
  },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];
