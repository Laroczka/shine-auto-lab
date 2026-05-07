/* ============================================================
   SHINE AUTO DETAILING — app.js
   Modules: I18n | Router | Header | ServiceCards | ScrollAnimations |
            PriceCalc | BookingForm | AdminPanel | CRM
============================================================ */

'use strict';

/* ─── CONSTANTS ──────────────────────────────────────────── */
const ADMIN_PASSWORD = 'admin123';
const STORAGE_KEY    = 'shine_crm_bookings';
const SESSION_KEY    = 'shine_admin_authed';
const LANG_KEY       = 'shine_lang';

const STATUS_ORDER = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

/* Price bases for calculator (in CAD) */
const PRICE_BASE = {
  detail:  175,
  paint1:  500,
  paint2:  650,
  paint3:  900,
  ceramic: 600,
};

/* Vehicle size multipliers */
const VEHICLE_MULTIPLIERS = {
  'Sedan':              1.0,
  'Coupe':              1.0,
  'Hatchback':          1.0,
  'Sports Car / Exotic':1.0,
  'SUV / Crossover':    1.2,
  'Truck / Pickup':     1.35,
  'Minivan / Van':      1.35,
  'Other':              1.0,
};

/* English labels for storing in CRM (always English, language-independent) */
const SERVICE_EN_LABELS = {
  'detail':              'Shine Auto Detail',
  'paint1':              'Paint Correction — 1-Step',
  'paint2':              'Paint Correction — 2-Step',
  'paint3':              'Paint Correction — 3-Step',
  'ceramic':             'Ceramic Coating',
  'seats-shampoo':       'Seats Shampoo',
  'carpet-extraction':   'Carpet Extraction',
  'salt-removal':        'Salt Removal',
  'tar-removal':         'Tar Removal',
  'steam-cleaning':      'Steam Cleaning',
  'windshield-treatment':'Windshield Treatment',
  'hard-wax':            'Hard Wax',
  'headlights-restore':  'Headlights Restore',
};

/* ─── TRANSLATIONS ───────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    'nav.services': 'Services',
    'nav.bookNow':  'Book Now',
    'nav.about':    'About',
    // Hero
    'hero.eyebrow':     'Premium Auto Detailing',
    'hero.subtitle':    'Professional detailing that restores, protects, and perfects your vehicle — from a meticulous hand wash to full paint correction and ceramic coating.',
    'hero.badge':       'Mobile service — we come to you',
    'hero.bookNow':     'Book Now',
    'hero.ourServices': 'Our Services',
    'hero.scroll':      'Scroll',
    // Services section
    'services.tag':      'What We Offer',
    'services.title':    'Services',
    'services.subtitle': 'Every vehicle deserves meticulous care. We offer a full range of detailing services tailored to your vehicle\'s needs and goals.',
    // Card 1 — Shine Auto Detail
    'service.detail.price':           'Starting at $175',
    'service.detail.name':            'Shine Auto Detail',
    'service.detail.tagline':         'Our comprehensive detailing package — inside and out, head to toe.',
    'service.detail.expand':          'View Included',
    'service.detail.priceNote':       'Price varies by vehicle size',
    'service.detail.book':            'Book This',
    'service.detail.include.prewash': 'Pre-wash treatment',
    'service.detail.include.handwash':'Hand wash',
    'service.detail.include.iron':    'Iron removal',
    'service.detail.include.rims':    'Rim & tire cleaning',
    'service.detail.include.garbage': 'Garbage removal',
    'service.detail.include.mats':    'Rubber mat cleaning',
    'service.detail.include.vacuum':  'Vacuum & fabric shampoo',
    'service.detail.include.leather': 'Leather conditioning',
    'service.detail.include.plastic': 'Plastic protection',
    'service.detail.include.windows': 'Window & mirror cleaning',
    'service.detail.include.doorjamb':'Door jamb & trunk cleaning',
    // Card 2 — Paint Correction
    'service.paint.price':           'Starting at $500',
    'service.paint.name':            'Paint Correction',
    'service.paint.tagline':         'Eliminate swirls, scratches, and oxidation. Three levels of correction available.',
    'service.paint.expand':          'View Details',
    'service.paint.priceNote':       'Price varies by vehicle size & correction level',
    'service.paint.book':            'Book This',
    'service.paint.1step':           '1-Step',
    'service.paint.1stepDesc':       'Light polish — removes light swirls and minor surface scratches',
    'service.paint.2step':           '2-Step',
    'service.paint.2stepDesc':       'Medium polish — targets deeper swirls and moderate paint defects',
    'service.paint.3step':           '3-Step',
    'service.paint.3stepDesc':       'Full correction — maximum paint restoration and clarity',
    'service.paint.includes':        'All correction packages include:',
    'service.paint.include.wash':    'Two-step wash',
    'service.paint.include.iron':    'Iron & tar removal',
    'service.paint.include.clay':    'Clay bar treatment',
    // Card 3 — Ceramic Coating
    'service.ceramic.price':              'Starting at $600',
    'service.ceramic.name':              'Ceramic Coating',
    'service.ceramic.tagline':           'Long-lasting protection that bonds to your paint — hydrophobic, UV-resistant, and self-cleaning.',
    'service.ceramic.expand':            'View Details',
    'service.ceramic.priceNote':         'Price varies by vehicle size & coating layers',
    'service.ceramic.book':              'Book This',
    'service.ceramic.include.formula':   'Professional-grade nano-ceramic formula',
    'service.ceramic.include.applied':   'Applied after full decontamination wash',
    'service.ceramic.include.protection':'Multi-year protection',
    'service.ceramic.include.hydro':     'Hydrophobic & UV-resistant finish',
    'service.ceramic.include.gloss':     'Enhances gloss and depth',
    'service.ceramic.include.contact':   'Contact us to discuss your vehicle and goals',
    // Card 4 — Add-Ons
    'service.addons.price':    'Price on Request',
    'service.addons.name':     'Add-Ons',
    'service.addons.tagline':  'Customize your detail with targeted treatments. Add any of the following to your booking.',
    'service.addons.priceNote':'Inquire for pricing when booking',
    'service.addons.inquire':  'Inquire',
    'addon.seats':      'Seats Shampoo',
    'addon.carpet':     'Carpet Extraction',
    'addon.salt':       'Salt Removal',
    'addon.tar':        'Tar Removal',
    'addon.steam':      'Steam Cleaning',
    'addon.windshield': 'Windshield Treatment',
    'addon.wax':        'Hard Wax',
    'addon.headlights': 'Headlights Restore',
    // Booking section
    'booking.tag':      'Ready to Book?',
    'booking.title':    'Request a Service',
    'booking.subtitle': 'Fill out the form below and we\'ll reach out within 24 hours to confirm your appointment and provide a final price based on your vehicle.',
    // Form labels
    'form.name':              'Full Name',
    'form.namePl':            'Your full name',
    'form.phone':             'Phone',
    'form.email':             'Email',
    'form.vehicle':           'Vehicle Type',
    'form.vehiclePlaceholder':'Select vehicle type',
    'form.service':           'Services',
    'form.mainServices':      'Main Services',
    'form.addOns':            'Add-Ons',
    'form.addOnsNote':        '(price on request)',
    'form.date':              'Preferred Date',
    'form.address':           'Service Address',
    'form.addressPlaceholder':'Street address, city — where should we come?',
    'form.addressHint':       'We\'re fully mobile — just tell us where to find you.',
    'form.notes':             'Additional Notes',
    'form.notesPl':           'Vehicle make, model, year, specific concerns, add-on requests…',
    'form.submit':            'Submit Request',
    'form.disclaimer':        'We\'ll confirm pricing and availability within 24 hours.',
    // Vehicle options
    'vehicle.sedan':    'Sedan',
    'vehicle.coupe':    'Coupe',
    'vehicle.hatchback':'Hatchback',
    'vehicle.suv':      'SUV / Crossover',
    'vehicle.truck':    'Truck / Pickup',
    'vehicle.minivan':  'Minivan / Van',
    'vehicle.sports':   'Sports Car / Exotic',
    'vehicle.other':    'Other',
    // Service checkboxes
    'mainservice.detail':        'Shine Auto Detail',
    'mainservice.detail.from':   'from $175',
    'mainservice.paint1':        'Paint Correction — 1-Step',
    'mainservice.paint1.from':   'from $500',
    'mainservice.paint2':        'Paint Correction — 2-Step',
    'mainservice.paint2.from':   'from $500+',
    'mainservice.paint3':        'Paint Correction — 3-Step',
    'mainservice.paint3.from':   'from $500+',
    'mainservice.ceramic':       'Ceramic Coating',
    'mainservice.ceramic.from':  'from $600',
    // Price calculator
    'calc.title':      'Price Estimate',
    'calc.noService':  'Select a service above to see an estimate.',
    'calc.addonsNote': '+ Add-ons: Price on Request',
    'calc.total':      'Estimated Total',
    'calc.disclaimer': 'Estimates are based on starting rates. Final pricing confirmed after vehicle inspection.',
    'calc.request':    'Price on Request',
    'calc.sizeNote':   'Size adjustment applied',
    'expand.hide':     'Hide Details',
    // Success state
    'success.title':   'Request Received!',
    'success.msg':     'Thank you for choosing Shine. We\'ll reach out within 24 hours to confirm your appointment and provide final pricing.',
    'success.another': 'Submit Another Request',
    // Validation errors
    'err.name':    'Please enter your full name.',
    'err.phone':   'Please enter a valid phone number.',
    'err.email':   'Please enter a valid email address.',
    'err.vehicle': 'Please select a vehicle type.',
    'err.service': 'Please select at least one service.',
    'err.date':    'Please select a preferred date.',
    'err.address': 'Please enter the service address (where we should come).',
    // About section
    'about.tag':           'About Shine',
    'about.title':         'Detail-Obsessed.<br>Results-Driven.',
    'about.p1':            'At Shine, we treat every vehicle as if it were our own. From a first-time detail to a full paint correction and ceramic coating, our process is methodical, precise, and built around lasting results.',
    'about.p2':            'Great detailing isn\'t just a clean car — it\'s about protecting your investment and restoring pride of ownership. We use professional-grade products and proven techniques to deliver results you can see and feel.',
    'about.p3':            'We\'re a fully mobile detailing service. No need to drive anywhere — we come to your location, whether that\'s your driveway, workplace, or building parking.',
    'about.book':          'Book a Service',
    'about.notices':       'Important to Know',
    'about.notice1.title': 'Fabric Headliners',
    'about.notice1.body':  'We do not perform deep cleaning of fabric headliners to avoid damage to the material.',
    'about.notice2.title': 'Glove Boxes',
    'about.notice2.body':  'Glove boxes are cleaned only if emptied by the client prior to the appointment.',
    'about.notice3.title': 'Pricing',
    'about.notice3.body':  'All prices listed are starting rates. Final pricing depends on vehicle size, condition, and selected services.',
    // Footer
    'footer.tagline': 'Premium Auto Detailing · Mobile Service',
    'footer.services':'Services',
    'footer.bookNow': 'Book Now',
    'footer.about':   'About',
    'footer.privacy': 'Privacy Policy',
    'footer.rights':  'All rights reserved.',
    // Admin panel
    'admin.title':       'Admin Access',
    'admin.sub':         'CRM & Bookings Dashboard',
    'admin.pw':          'Password',
    'admin.pwPlaceholder':'Enter password',
    'admin.access':      'Access CRM',
    'admin.back':        '← Back to site',
    'admin.export':      'Export CSV',
    'admin.logout':      'Log Out',
    'admin.filterLabel': 'Filter by status',
    'admin.filterAll':   'All Statuses',
    'admin.sortLabel':   'Sort by',
    'admin.sortDateDesc':'Date Received (Newest)',
    'admin.sortDateAsc': 'Date Received (Oldest)',
    'admin.sortName':    'Client Name (A–Z)',
    'admin.sortPreferred':'Preferred Date (Soonest)',
    'admin.col.date':    'Date Received',
    'admin.col.name':    'Client Name',
    'admin.col.contact': 'Contact',
    'admin.col.service': 'Service',
    'admin.col.vehicle': 'Vehicle',
    'admin.col.address': 'Service Address',
    'admin.col.preferred':'Preferred Date',
    'admin.col.status':  'Status',
    'admin.col.actions': 'Actions',
    'admin.action.delete':'Delete',
    'admin.empty':       'No bookings yet. Requests submitted through the website will appear here.',
    'admin.stat.total':  'Total',
    // Privacy page
    'privacy.back':      '← Back to Shine',
    'privacy.title':     'Privacy Policy',
    'privacy.intro':     'At Shine Auto Detailing, we respect your privacy. This page explains how we handle the information you provide when submitting a service request.',
    'privacy.s1.title':  'What We Collect',
    'privacy.s1.body':   'When you submit a service request through our website, we collect your name, phone number, email address, vehicle type, service address, preferred date, and any additional notes you provide. We also collect your service selections to prepare your booking.',
    'privacy.s2.title':  'How We Use Your Information',
    'privacy.s2.body':   'Your information is used solely to contact you regarding your service request, confirm your appointment, and provide accurate pricing. We do not sell, share, or distribute your personal information to third parties.',
    'privacy.s3.title':  'Data Storage',
    'privacy.s3.body':   'All booking data submitted through our website is stored locally in your browser\'s localStorage. This means your data stays on the device you used to submit the request and is not transmitted to any external server. Our internal CRM accesses this data through the same browser session.',
    'privacy.s4.title':  'Your Rights',
    'privacy.s4.body':   'You have the right to request deletion of your personal information at any time. To do so, please contact us at shine.auto.lab25@gmail.com and we will promptly remove your data from our records.',
    'privacy.s5.title':  'Contact',
    'privacy.s5.body':   'For any privacy-related questions, please reach out to us at shine.auto.lab25@gmail.com or call +1 438 376 7637.',
    'privacy.updated':   'Last updated: May 2025',
  },

  fr: {
    'nav.services': 'Services',
    'nav.bookNow':  'Réserver',
    'nav.about':    'À propos',
    // Hero
    'hero.eyebrow':     'Détailing Auto Premium',
    'hero.subtitle':    'Un détailing professionnel qui restaure, protège et perfectionne votre véhicule — du lavage à la main minutieux à la correction de peinture et au revêtement céramique.',
    'hero.badge':       'Service mobile — nous venons chez vous',
    'hero.bookNow':     'Réserver',
    'hero.ourServices': 'Nos Services',
    'hero.scroll':      'Défiler',
    // Services section
    'services.tag':      'Ce Que Nous Offrons',
    'services.title':    'Services',
    'services.subtitle': 'Chaque véhicule mérite des soins méticuleux. Nous offrons une gamme complète de services de détailing adaptés aux besoins de votre véhicule.',
    // Card 1
    'service.detail.price':           'À partir de 175 $',
    'service.detail.name':            'Détailing Complet Shine',
    'service.detail.tagline':         'Notre forfait de détailing complet — intérieur et extérieur, de la tête aux pieds.',
    'service.detail.expand':          'Voir ce qui est inclus',
    'service.detail.priceNote':       'Prix selon la taille du véhicule',
    'service.detail.book':            'Réserver',
    'service.detail.include.prewash': 'Prétraitement avant lavage',
    'service.detail.include.handwash':'Lavage à la main',
    'service.detail.include.iron':    'Décontamination ferreuse',
    'service.detail.include.rims':    'Nettoyage des jantes et pneus',
    'service.detail.include.garbage': 'Enlèvement des déchets',
    'service.detail.include.mats':    'Nettoyage des tapis en caoutchouc',
    'service.detail.include.vacuum':  'Aspirateur et shampooing tissu',
    'service.detail.include.leather': 'Conditionnement du cuir',
    'service.detail.include.plastic': 'Protection des plastiques',
    'service.detail.include.windows': 'Nettoyage vitres et miroirs',
    'service.detail.include.doorjamb':'Nettoyage des montants et coffre',
    // Card 2
    'service.paint.price':           'À partir de 500 $',
    'service.paint.name':            'Correction de Peinture',
    'service.paint.tagline':         'Éliminez les tourbillons, rayures et oxydation. Trois niveaux de correction disponibles.',
    'service.paint.expand':          'Voir les détails',
    'service.paint.priceNote':       'Prix selon la taille et le niveau de correction',
    'service.paint.book':            'Réserver',
    'service.paint.1step':           '1 étape',
    'service.paint.1stepDesc':       'Polissage léger — élimine les micro-rayures et tourbillons légers',
    'service.paint.2step':           '2 étapes',
    'service.paint.2stepDesc':       'Polissage moyen — cible les tourbillons plus profonds',
    'service.paint.3step':           '3 étapes',
    'service.paint.3stepDesc':       'Correction complète — restauration maximale de la peinture',
    'service.paint.includes':        'Tous les forfaits incluent :',
    'service.paint.include.wash':    'Lavage en deux étapes',
    'service.paint.include.iron':    'Décontamination fer et goudron',
    'service.paint.include.clay':    'Traitement au clay bar',
    // Card 3
    'service.ceramic.price':              'À partir de 600 $',
    'service.ceramic.name':              'Revêtement Céramique',
    'service.ceramic.tagline':           'Protection durable qui se lie à votre peinture — hydrophobe, résistante aux UV et auto-nettoyante.',
    'service.ceramic.expand':            'Voir les détails',
    'service.ceramic.priceNote':         'Prix selon la taille du véhicule et les couches',
    'service.ceramic.book':              'Réserver',
    'service.ceramic.include.formula':   'Formule nano-céramique professionnelle',
    'service.ceramic.include.applied':   'Appliqué après décontamination complète',
    'service.ceramic.include.protection':'Protection multi-années',
    'service.ceramic.include.hydro':     'Finition hydrophobe et résistante aux UV',
    'service.ceramic.include.gloss':     'Améliore le brillant et la profondeur',
    'service.ceramic.include.contact':   'Contactez-nous pour discuter de votre véhicule',
    // Card 4
    'service.addons.price':    'Sur Demande',
    'service.addons.name':     'Options Supplémentaires',
    'service.addons.tagline':  'Personnalisez votre détailing avec des traitements ciblés.',
    'service.addons.priceNote':'Renseignez-vous lors de la réservation',
    'service.addons.inquire':  'Renseigner',
    'addon.seats':      'Shampooing Sièges',
    'addon.carpet':     'Extraction Tapis',
    'addon.salt':       'Enlèvement Sel',
    'addon.tar':        'Enlèvement Goudron',
    'addon.steam':      'Nettoyage Vapeur',
    'addon.windshield': 'Traitement Pare-brise',
    'addon.wax':        'Cire Dure',
    'addon.headlights': 'Restauration Phares',
    // Booking section
    'booking.tag':      'Prêt à Réserver ?',
    'booking.title':    'Demander un Service',
    'booking.subtitle': 'Remplissez le formulaire et nous vous contacterons dans les 24 heures pour confirmer votre rendez-vous et le prix final.',
    // Form labels
    'form.name':              'Nom Complet',
    'form.namePl':            'Votre nom complet',
    'form.phone':             'Téléphone',
    'form.email':             'Courriel',
    'form.vehicle':           'Type de Véhicule',
    'form.vehiclePlaceholder':'Sélectionnez le type',
    'form.service':           'Services',
    'form.mainServices':      'Services Principaux',
    'form.addOns':            'Options Supplémentaires',
    'form.addOnsNote':        '(sur demande)',
    'form.date':              'Date Préférée',
    'form.address':           'Adresse de Service',
    'form.addressPlaceholder':'Adresse, ville — où devons-nous venir ?',
    'form.addressHint':       'Nous sommes entièrement mobiles — dites-nous simplement où vous trouver.',
    'form.notes':             'Notes Supplémentaires',
    'form.notesPl':           'Marque, modèle, année, préoccupations spécifiques…',
    'form.submit':            'Envoyer la Demande',
    'form.disclaimer':        'Nous confirmerons le prix et la disponibilité dans les 24 heures.',
    // Vehicle options
    'vehicle.sedan':    'Berline',
    'vehicle.coupe':    'Coupé',
    'vehicle.hatchback':'Compacte',
    'vehicle.suv':      'VUS / Crossover',
    'vehicle.truck':    'Camion / Pickup',
    'vehicle.minivan':  'Minifourgonnette / Fourgon',
    'vehicle.sports':   'Voiture Sport / Exotique',
    'vehicle.other':    'Autre',
    // Service checkboxes
    'mainservice.detail':        'Détailing Complet Shine',
    'mainservice.detail.from':   'à partir de 175 $',
    'mainservice.paint1':        'Correction Peinture — 1 Étape',
    'mainservice.paint1.from':   'à partir de 500 $',
    'mainservice.paint2':        'Correction Peinture — 2 Étapes',
    'mainservice.paint2.from':   'à partir de 500 $+',
    'mainservice.paint3':        'Correction Peinture — 3 Étapes',
    'mainservice.paint3.from':   'à partir de 500 $+',
    'mainservice.ceramic':       'Revêtement Céramique',
    'mainservice.ceramic.from':  'à partir de 600 $',
    // Price calculator
    'calc.title':      'Estimation du Prix',
    'calc.noService':  'Sélectionnez un service pour voir une estimation.',
    'calc.addonsNote': '+ Options : Sur Demande',
    'calc.total':      'Total Estimé',
    'calc.disclaimer': 'Les estimations sont basées sur les tarifs de départ. Le prix final est confirmé après inspection du véhicule.',
    'calc.request':    'Sur Demande',
    'calc.sizeNote':   'Ajustement de taille appliqué',
    'expand.hide':     'Masquer les détails',
    // Success
    'success.title':   'Demande Reçue !',
    'success.msg':     'Merci d\'avoir choisi Shine. Nous vous contacterons dans les 24 heures pour confirmer votre rendez-vous et le prix final.',
    'success.another': 'Soumettre une Autre Demande',
    // Validation errors
    'err.name':    'Veuillez entrer votre nom complet.',
    'err.phone':   'Veuillez entrer un numéro de téléphone valide.',
    'err.email':   'Veuillez entrer une adresse courriel valide.',
    'err.vehicle': 'Veuillez sélectionner le type de véhicule.',
    'err.service': 'Veuillez sélectionner au moins un service.',
    'err.date':    'Veuillez sélectionner une date préférée.',
    'err.address': 'Veuillez entrer l\'adresse de service (où nous devons venir).',
    // About
    'about.tag':           'À Propos de Shine',
    'about.title':         'Obsédés par les Détails.<br>Axés sur les Résultats.',
    'about.p1':            'Chez Shine, nous traitons chaque véhicule comme si c\'était le nôtre. Du premier détailing à la correction de peinture complète, notre processus est méthodique, précis et axé sur des résultats durables.',
    'about.p2':            'Un bon détailing ne consiste pas seulement à avoir une voiture propre — il s\'agit de protéger votre investissement et de restaurer la fierté de la propriété. Nous utilisons des produits professionnels et des techniques éprouvées.',
    'about.p3':            'Nous sommes un service de détailing entièrement mobile. Pas besoin de conduire — nous venons à votre emplacement, que ce soit votre allée, votre lieu de travail ou votre stationnement.',
    'about.book':          'Réserver un Service',
    'about.notices':       'Important à Savoir',
    'about.notice1.title': 'Plafonniers en Tissu',
    'about.notice1.body':  'Nous n\'effectuons pas de nettoyage en profondeur des plafonniers en tissu pour éviter d\'endommager le matériau.',
    'about.notice2.title': 'Boîtes à Gants',
    'about.notice2.body':  'Les boîtes à gants ne sont nettoyées que si elles ont été vidées par le client avant le rendez-vous.',
    'about.notice3.title': 'Tarification',
    'about.notice3.body':  'Tous les prix indiqués sont des tarifs de départ. Le prix final dépend de la taille, de l\'état et des services sélectionnés.',
    // Footer
    'footer.tagline': 'Détailing Auto Premium · Service Mobile',
    'footer.services':'Services',
    'footer.bookNow': 'Réserver',
    'footer.about':   'À propos',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.rights':  'Tous droits réservés.',
    // Admin
    'admin.title':       'Accès Administrateur',
    'admin.sub':         'Tableau de Bord CRM',
    'admin.pw':          'Mot de Passe',
    'admin.pwPlaceholder':'Entrez le mot de passe',
    'admin.access':      'Accéder au CRM',
    'admin.back':        '← Retour au site',
    'admin.export':      'Exporter CSV',
    'admin.logout':      'Se Déconnecter',
    'admin.filterLabel': 'Filtrer par statut',
    'admin.filterAll':   'Tous les Statuts',
    'admin.sortLabel':   'Trier par',
    'admin.sortDateDesc':'Date Reçue (Plus Récente)',
    'admin.sortDateAsc': 'Date Reçue (Plus Ancienne)',
    'admin.sortName':    'Nom du Client (A–Z)',
    'admin.sortPreferred':'Date Préférée (Plus Proche)',
    'admin.col.date':    'Date Reçue',
    'admin.col.name':    'Nom du Client',
    'admin.col.contact': 'Contact',
    'admin.col.service': 'Service',
    'admin.col.vehicle': 'Véhicule',
    'admin.col.address': 'Adresse de Service',
    'admin.col.preferred':'Date Préférée',
    'admin.col.status':  'Statut',
    'admin.col.actions': 'Actions',
    'admin.action.delete':'Supprimer',
    'admin.empty':       'Aucune réservation pour l\'instant. Les demandes soumises apparaîtront ici.',
    'admin.stat.total':  'Total',
    // Privacy page
    'privacy.back':      '← Retour à Shine',
    'privacy.title':     'Politique de Confidentialité',
    'privacy.intro':     'Chez Shine Auto Detailing, nous respectons votre vie privée. Cette page explique comment nous gérons les informations que vous fournissez lors d\'une demande de service.',
    'privacy.s1.title':  'Ce Que Nous Collectons',
    'privacy.s1.body':   'Lors de la soumission d\'une demande de service, nous collectons votre nom, numéro de téléphone, adresse courriel, type de véhicule, adresse de service, date préférée et toute note supplémentaire fournie.',
    'privacy.s2.title':  'Utilisation de vos Informations',
    'privacy.s2.body':   'Vos informations sont utilisées uniquement pour vous contacter concernant votre demande de service, confirmer votre rendez-vous et fournir une tarification précise. Nous ne vendons ni ne partageons vos informations personnelles.',
    'privacy.s3.title':  'Stockage des Données',
    'privacy.s3.body':   'Toutes les données de réservation sont stockées localement dans le localStorage de votre navigateur. Elles restent sur l\'appareil utilisé pour soumettre la demande et ne sont pas transmises à un serveur externe.',
    'privacy.s4.title':  'Vos Droits',
    'privacy.s4.body':   'Vous avez le droit de demander la suppression de vos informations personnelles à tout moment. Contactez-nous à shine.auto.lab25@gmail.com et nous retirerons promptement vos données.',
    'privacy.s5.title':  'Contact',
    'privacy.s5.body':   'Pour toute question relative à la confidentialité, contactez-nous à shine.auto.lab25@gmail.com ou appelez le +1 438 376 7637.',
    'privacy.updated':   'Dernière mise à jour : mai 2025',
  },

  ua: {
    'nav.services': 'Послуги',
    'nav.bookNow':  'Замовити',
    'nav.about':    'Про нас',
    // Hero
    'hero.eyebrow':     'Преміум Детейлінг',
    'hero.subtitle':    'Професійний детейлінг, що відновлює, захищає та вдосконалює ваш автомобіль — від ретельного ручного миття до повної корекції лакофарбового покриття та керамічного захисту.',
    'hero.badge':       'Мобільний сервіс — приїжджаємо до вас',
    'hero.bookNow':     'Замовити',
    'hero.ourServices': 'Наші Послуги',
    'hero.scroll':      'Гортати',
    // Services section
    'services.tag':      'Що Ми Пропонуємо',
    'services.title':    'Послуги',
    'services.subtitle': 'Кожен автомобіль заслуговує на ретельний догляд. Ми пропонуємо повний спектр послуг детейлінгу, адаптованих до потреб вашого авто.',
    // Card 1
    'service.detail.price':           'Від $175',
    'service.detail.name':            'Детейлінг Shine',
    'service.detail.tagline':         'Наш комплексний пакет детейлінгу — зовні та зсередини, з голови до хвоста.',
    'service.detail.expand':          'Що входить',
    'service.detail.priceNote':       'Ціна залежить від розміру авто',
    'service.detail.book':            'Замовити',
    'service.detail.include.prewash': 'Попереднє оброблення',
    'service.detail.include.handwash':'Ручне миття',
    'service.detail.include.iron':    'Видалення залізного пилу',
    'service.detail.include.rims':    'Чищення дисків і шин',
    'service.detail.include.garbage': 'Видалення сміття',
    'service.detail.include.mats':    'Чищення гумових килимків',
    'service.detail.include.vacuum':  'Пилосос та шампунь тканин',
    'service.detail.include.leather': 'Кондиціонування шкіри',
    'service.detail.include.plastic': 'Захист пластику',
    'service.detail.include.windows': 'Чищення вікон і дзеркал',
    'service.detail.include.doorjamb':'Чищення дверних прорізів і багажника',
    // Card 2
    'service.paint.price':           'Від $500',
    'service.paint.name':            'Корекція Лакофарбового Покриття',
    'service.paint.tagline':         'Усунення завитків, подряпин і окислення. Доступні три рівні корекції.',
    'service.paint.expand':          'Докладніше',
    'service.paint.priceNote':       'Ціна залежить від розміру авто та рівня корекції',
    'service.paint.book':            'Замовити',
    'service.paint.1step':           '1 крок',
    'service.paint.1stepDesc':       'Легке полірування — видаляє легкі завитки та дрібні подряпини',
    'service.paint.2step':           '2 кроки',
    'service.paint.2stepDesc':       'Середнє полірування — усуває глибші завитки та дефекти',
    'service.paint.3step':           '3 кроки',
    'service.paint.3stepDesc':       'Повна корекція — максимальне відновлення лакофарбового покриття',
    'service.paint.includes':        'До всіх пакетів входить:',
    'service.paint.include.wash':    'Двоетапне миття',
    'service.paint.include.iron':    'Видалення заліза та смоли',
    'service.paint.include.clay':    'Обробка глиною',
    // Card 3
    'service.ceramic.price':              'Від $600',
    'service.ceramic.name':              'Керамічне Покриття',
    'service.ceramic.tagline':           'Тривалий захист, що зчіплюється з лаком — гідрофобний, стійкий до UV та самоочисний.',
    'service.ceramic.expand':            'Докладніше',
    'service.ceramic.priceNote':         'Ціна залежить від розміру авто та кількості шарів',
    'service.ceramic.book':              'Замовити',
    'service.ceramic.include.formula':   'Професійна нано-керамічна формула',
    'service.ceramic.include.applied':   'Наноситься після повної деконтамінації',
    'service.ceramic.include.protection':'Багаторічний захист',
    'service.ceramic.include.hydro':     'Гідрофобне та UV-стійке покриття',
    'service.ceramic.include.gloss':     'Підсилює блиск і глибину кольору',
    'service.ceramic.include.contact':   'Зв\'яжіться з нами для обговорення',
    // Card 4
    'service.addons.price':    'За Запитом',
    'service.addons.name':     'Додаткові Послуги',
    'service.addons.tagline':  'Персоналізуйте свій детейлінг цільовими процедурами. Додайте будь-що до замовлення.',
    'service.addons.priceNote':'Ціна уточнюється при бронюванні',
    'service.addons.inquire':  'Уточнити',
    'addon.seats':      'Шампунь сидінь',
    'addon.carpet':     'Екстракція килимів',
    'addon.salt':       'Видалення солі',
    'addon.tar':        'Видалення смоли',
    'addon.steam':      'Парочищення',
    'addon.windshield': 'Обробка лобового скла',
    'addon.wax':        'Тверда воскова політура',
    'addon.headlights': 'Відновлення фар',
    // Booking
    'booking.tag':      'Готові Замовити?',
    'booking.title':    'Замовити Послугу',
    'booking.subtitle': 'Заповніть форму, і ми зв\'яжемося з вами протягом 24 годин для підтвердження запису та уточнення ціни.',
    // Form
    'form.name':              'Повне Ім\'я',
    'form.namePl':            'Ваше повне ім\'я',
    'form.phone':             'Телефон',
    'form.email':             'Електронна Пошта',
    'form.vehicle':           'Тип Автомобіля',
    'form.vehiclePlaceholder':'Виберіть тип авто',
    'form.service':           'Послуги',
    'form.mainServices':      'Основні Послуги',
    'form.addOns':            'Додаткові Послуги',
    'form.addOnsNote':        '(за запитом)',
    'form.date':              'Бажана Дата',
    'form.address':           'Адреса Обслуговування',
    'form.addressPlaceholder':'Вулиця, місто — де нам вас знайти?',
    'form.addressHint':       'Ми повністю мобільні — просто скажіть нам, де ви знаходитесь.',
    'form.notes':             'Додаткові Примітки',
    'form.notesPl':           'Марка, модель, рік, особливі побажання…',
    'form.submit':            'Надіслати Запит',
    'form.disclaimer':        'Ми підтвердимо ціну та наявність протягом 24 годин.',
    // Vehicle options
    'vehicle.sedan':    'Седан',
    'vehicle.coupe':    'Купе',
    'vehicle.hatchback':'Хетчбек',
    'vehicle.suv':      'Позашляховик / Кросовер',
    'vehicle.truck':    'Вантажівка / Пікап',
    'vehicle.minivan':  'Мінівен / Фургон',
    'vehicle.sports':   'Спорткар / Екзотика',
    'vehicle.other':    'Інше',
    // Service checkboxes
    'mainservice.detail':        'Детейлінг Shine',
    'mainservice.detail.from':   'від $175',
    'mainservice.paint1':        'Корекція Лаку — 1 крок',
    'mainservice.paint1.from':   'від $500',
    'mainservice.paint2':        'Корекція Лаку — 2 кроки',
    'mainservice.paint2.from':   'від $500+',
    'mainservice.paint3':        'Корекція Лаку — 3 кроки',
    'mainservice.paint3.from':   'від $500+',
    'mainservice.ceramic':       'Керамічне Покриття',
    'mainservice.ceramic.from':  'від $600',
    // Calc
    'calc.title':      'Розрахунок Вартості',
    'calc.noService':  'Виберіть послугу вище, щоб побачити орієнтовну ціну.',
    'calc.addonsNote': '+ Додаткові послуги: За запитом',
    'calc.total':      'Орієнтовна Сума',
    'calc.disclaimer': 'Оцінки базуються на початкових тарифах. Остаточна ціна підтверджується після огляду авто.',
    'calc.request':    'За запитом',
    'calc.sizeNote':   'Застосовано коефіцієнт розміру',
    'expand.hide':     'Сховати деталі',
    // Success
    'success.title':   'Запит Отримано!',
    'success.msg':     'Дякуємо за вибір Shine. Ми зв\'яжемося з вами протягом 24 годин для підтвердження запису та фінальної ціни.',
    'success.another': 'Надіслати Ще Один Запит',
    // Validation
    'err.name':    'Будь ласка, введіть своє повне ім\'я.',
    'err.phone':   'Будь ласка, введіть дійсний номер телефону.',
    'err.email':   'Будь ласка, введіть дійсну електронну адресу.',
    'err.vehicle': 'Будь ласка, виберіть тип автомобіля.',
    'err.service': 'Будь ласка, виберіть принаймні одну послугу.',
    'err.date':    'Будь ласка, виберіть бажану дату.',
    'err.address': 'Будь ласка, введіть адресу обслуговування.',
    // About
    'about.tag':           'Про Shine',
    'about.title':         'Прагнемо Досконалості.<br>Орієнтовані на Результат.',
    'about.p1':            'У Shine ми ставимося до кожного автомобіля як до власного. Від першого детейлінгу до повної корекції лаку та керамічного захисту — наш процес методичний, точний і орієнтований на тривалі результати.',
    'about.p2':            'Хороший детейлінг — це не просто чисте авто. Це захист ваших інвестицій і відновлення гордості від власності. Ми використовуємо професійні продукти та перевірені техніки.',
    'about.p3':            'Ми повністю мобільний сервіс детейлінгу. Не потрібно нікуди їхати — ми приїжджаємо до вас: до дому, на роботу або на парковку.',
    'about.book':          'Замовити Послугу',
    'about.notices':       'Важливо Знати',
    'about.notice1.title': 'Тканинний Стельовий Матеріал',
    'about.notice1.body':  'Ми не проводимо глибоке чищення тканинних стель, щоб уникнути пошкодження матеріалу.',
    'about.notice2.title': 'Бардачки',
    'about.notice2.body':  'Бардачки чистяться лише якщо клієнт попередньо їх спорожнив.',
    'about.notice3.title': 'Ціноутворення',
    'about.notice3.body':  'Усі вказані ціни є початковими тарифами. Кінцева ціна залежить від розміру, стану авто та обраних послуг.',
    // Footer
    'footer.tagline': 'Преміум Детейлінг · Мобільний Сервіс',
    'footer.services':'Послуги',
    'footer.bookNow': 'Замовити',
    'footer.about':   'Про нас',
    'footer.privacy': 'Політика Конфіденційності',
    'footer.rights':  'Усі права захищені.',
    // Admin
    'admin.title':       'Доступ Адміністратора',
    'admin.sub':         'Панель CRM та Бронювань',
    'admin.pw':          'Пароль',
    'admin.pwPlaceholder':'Введіть пароль',
    'admin.access':      'Увійти до CRM',
    'admin.back':        '← Назад на сайт',
    'admin.export':      'Експорт CSV',
    'admin.logout':      'Вийти',
    'admin.filterLabel': 'Фільтр за статусом',
    'admin.filterAll':   'Всі Статуси',
    'admin.sortLabel':   'Сортувати за',
    'admin.sortDateDesc':'Дата отримання (найновіші)',
    'admin.sortDateAsc': 'Дата отримання (найстаріші)',
    'admin.sortName':    'Ім\'я клієнта (А–Я)',
    'admin.sortPreferred':'Бажана дата (найближча)',
    'admin.col.date':    'Дата Отримання',
    'admin.col.name':    'Ім\'я Клієнта',
    'admin.col.contact': 'Контакт',
    'admin.col.service': 'Послуга',
    'admin.col.vehicle': 'Автомобіль',
    'admin.col.address': 'Адреса Обслуговування',
    'admin.col.preferred':'Бажана Дата',
    'admin.col.status':  'Статус',
    'admin.col.actions': 'Дії',
    'admin.action.delete':'Видалити',
    'admin.empty':       'Замовлень ще немає. Запити, надіслані через сайт, з\'являться тут.',
    'admin.stat.total':  'Всього',
    // Privacy page
    'privacy.back':      '← Назад до Shine',
    'privacy.title':     'Політика Конфіденційності',
    'privacy.intro':     'У Shine Auto Detailing ми поважаємо вашу конфіденційність. Ця сторінка пояснює, як ми обробляємо інформацію, яку ви надаєте під час запиту на послугу.',
    'privacy.s1.title':  'Що Ми Збираємо',
    'privacy.s1.body':   'Під час надсилання запиту на послугу ми збираємо ваше ім\'я, номер телефону, електронну адресу, тип автомобіля, адресу обслуговування, бажану дату та будь-які додаткові нотатки.',
    'privacy.s2.title':  'Як Ми Використовуємо Ваші Дані',
    'privacy.s2.body':   'Ваші дані використовуються виключно для зв\'язку з вами щодо запиту на послугу, підтвердження запису та надання точної ціни. Ми не продаємо і не передаємо ваші персональні дані третім особам.',
    'privacy.s3.title':  'Зберігання Даних',
    'privacy.s3.body':   'Усі дані про бронювання зберігаються локально у localStorage вашого браузера. Вони залишаються на пристрої, з якого ви надіслали запит, і не передаються на зовнішні сервери.',
    'privacy.s4.title':  'Ваші Права',
    'privacy.s4.body':   'Ви маєте право в будь-який час запросити видалення своїх персональних даних. Для цього зв\'яжіться з нами за адресою shine.auto.lab25@gmail.com.',
    'privacy.s5.title':  'Контакт',
    'privacy.s5.body':   'З будь-яких питань щодо конфіденційності звертайтеся до нас: shine.auto.lab25@gmail.com або +1 438 376 7637.',
    'privacy.updated':   'Останнє оновлення: травень 2025',
  },
};

/* ─── UTILITIES ──────────────────────────────────────────── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusClass(status) {
  return 'status-badge--' + status.toLowerCase();
}

/* ─── STORAGE ────────────────────────────────────────────── */
const Storage = {
  getBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  },
  addBooking(booking) {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    this.saveBookings(bookings);
  },
  updateStatus(id, status) {
    const bookings = this.getBookings();
    const b = bookings.find(b => b.id === id);
    if (b) { b.status = status; this.saveBookings(bookings); }
  },
  deleteBooking(id) {
    const bookings = this.getBookings().filter(b => b.id !== id);
    this.saveBookings(bookings);
  },
};

/* ─── I18N ───────────────────────────────────────────────── */
const I18n = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem(LANG_KEY);
    this.currentLang = (saved && TRANSLATIONS[saved]) ? saved : 'en';
    this.applyLanguage(this.currentLang);
    this.initSwitchers();
  },

  t(key) {
    const lang = TRANSLATIONS[this.currentLang];
    if (lang && lang[key] !== undefined) return lang[key];
    const en = TRANSLATIONS['en'];
    if (en && en[key] !== undefined) return en[key];
    return key;
  },

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    this.applyLanguage(lang);
    this.updateSwitcherState();
    // Re-render dynamic content
    ServiceCards.updateLabels();
    PriceCalc.update();
    // Re-render admin if active
    const adminCRM = document.getElementById('admin-crm');
    if (adminCRM && !adminCRM.hidden) {
      AdminPanel.renderStats();
      AdminPanel.renderTable();
    }
  },

  applyLanguage(lang) {
    // Set html lang attribute
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;

    // Update textContent for [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = this.t(key);
    });

    // Update innerHTML for [data-i18n-html] elements (allows <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = this.t(el.dataset.i18nHtml);
    });

    // Update placeholders for [data-i18n-placeholder]
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.dataset.i18nPlaceholder);
    });

    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  },

  initSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
    });
    this.updateSwitcherState();
  },

  updateSwitcherState() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === this.currentLang));
    });
  },
};

/* ─── ROUTER ─────────────────────────────────────────────── */
const Router = {
  isAdmin() {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') === 'admin' || window.location.pathname.endsWith('/admin');
  },
  init() {
    const mainContent = document.getElementById('main-content');
    const siteHeader  = document.getElementById('site-header');
    const siteFooter  = document.querySelector('.site-footer');
    const adminPanel  = document.getElementById('admin-panel');

    if (this.isAdmin()) {
      mainContent.hidden = true;
      siteHeader.hidden  = true;
      siteFooter.hidden  = true;
      adminPanel.hidden  = false;
      AdminPanel.init();
    } else {
      mainContent.hidden = false;
      siteHeader.hidden  = false;
      siteFooter.hidden  = false;
      adminPanel.hidden  = true;
    }
  },
};

/* ─── HEADER ─────────────────────────────────────────────── */
const Header = {
  init() {
    const header    = document.getElementById('site-header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    // Sticky scroll behaviour
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Footer year (also set here as fallback)
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  },
};

/* ─── SERVICE CARDS (expand / collapse) ─────────────────── */
const ServiceCards = {
  init() {
    document.querySelectorAll('.service-expand-btn').forEach(btn => {
      const labelEl  = btn.querySelector('.expand-label');
      const i18nKey  = labelEl.dataset.i18n; // original "expand" key e.g. "service.detail.expand"
      const hideKey  = i18nKey.replace('.expand', '.hide') || null;
      btn.dataset.expandKey = i18nKey;

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const targetId = btn.getAttribute('aria-controls');
        const details  = document.getElementById(targetId);

        btn.setAttribute('aria-expanded', String(!expanded));
        details.hidden = expanded;

        if (expanded) {
          // Now collapsed — show "view" label
          labelEl.textContent = I18n.t(i18nKey);
        } else {
          // Now expanded — show "hide" label
          labelEl.textContent = I18n.t('expand.hide');
        }
      });
    });
  },

  // Re-apply labels after language change
  updateLabels() {
    document.querySelectorAll('.service-expand-btn').forEach(btn => {
      const labelEl   = btn.querySelector('.expand-label');
      const expandKey = btn.dataset.expandKey;
      const expanded  = btn.getAttribute('aria-expanded') === 'true';
      if (!expandKey) return;
      labelEl.textContent = expanded ? I18n.t('expand.hide') : I18n.t(expandKey);
    });
  },
};

/* ─── SCROLL ANIMATIONS (Intersection Observer) ─────────── */
const ScrollAnimations = {
  init() {
    const elements = document.querySelectorAll('.js-animate');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  },
};

/* ─── PRICE CALCULATOR ───────────────────────────────────── */
const PriceCalc = {
  update() {
    const vehicleVal = document.getElementById('f-vehicle')?.value || '';
    const multiplier = VEHICLE_MULTIPLIERS[vehicleVal] || 1.0;

    const selectedMain   = Array.from(document.querySelectorAll('.cb-main:checked')).map(cb => cb.value);
    const selectedAddons = document.querySelectorAll('.cb-addon:checked').length > 0;

    const calcEmpty    = document.getElementById('calc-empty');
    const calcLines    = document.getElementById('calc-lines');
    const calcAddon    = document.getElementById('calc-addons-note');
    const calcTotalRow = document.getElementById('calc-total-row');
    const calcTotalVal = document.getElementById('calc-total-value');

    if (!calcEmpty) return;

    const hasAny = selectedMain.length > 0 || selectedAddons;

    if (!hasAny) {
      calcEmpty.hidden    = false;
      calcLines.hidden    = true;
      calcAddon.hidden    = true;
      calcTotalRow.hidden = true;
      return;
    }

    calcEmpty.hidden = true;
    calcLines.hidden = false;

    let total = 0;
    const lineItems = selectedMain.map(key => {
      const base  = PRICE_BASE[key] || 0;
      const price = Math.round(base * multiplier);
      total += price;
      return { name: I18n.t('mainservice.' + key), price };
    });

    // Build size note
    let sizeNote = '';
    if (selectedMain.length > 0 && vehicleVal && multiplier !== 1.0) {
      sizeNote = ` <span class="calc-multiplier">(×${multiplier} — ${escapeHtml(vehicleVal)})</span>`;
    }

    calcLines.innerHTML = lineItems.map(item => `
      <div class="calc-line">
        <span class="calc-line-name">${escapeHtml(item.name)}</span>
        <span class="calc-line-price">$${item.price}</span>
      </div>`).join('') + (sizeNote && selectedMain.length > 0
        ? `<div class="calc-size-note">${I18n.t('calc.sizeNote')}${sizeNote}</div>` : '');

    if (selectedAddons) {
      calcAddon.hidden      = false;
      calcAddon.textContent = I18n.t('calc.addonsNote');
    } else {
      calcAddon.hidden = true;
    }

    if (selectedMain.length > 0) {
      calcTotalRow.hidden        = false;
      calcTotalVal.textContent   = '$' + total + (multiplier !== 1.0 || selectedAddons ? '+' : '');
    } else {
      calcTotalRow.hidden = true;
    }
  },
};

/* ─── BOOKING FORM ───────────────────────────────────────── */
const BookingForm = {
  form:    null,
  success: null,

  init() {
    this.form    = document.getElementById('booking-form');
    this.success = document.getElementById('booking-success');
    if (!this.form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('f-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      if (this.validate()) this.submit();
    });

    // Clear errors on input for standard fields
    this.form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input',  () => this.clearError(input));
      input.addEventListener('change', () => {
        this.clearError(input);
        // Vehicle change → recalculate price
        if (input.id === 'f-vehicle') PriceCalc.update();
      });
    });

    // Checkbox interactions: clear error + update price calc
    this.form.querySelectorAll('.cb-main, .cb-addon').forEach(cb => {
      cb.addEventListener('change', () => {
        this.clearServiceError();
        PriceCalc.update();
      });
    });

    // "Submit another" button
    const btnAnother = document.getElementById('btn-book-another');
    if (btnAnother) {
      btnAnother.addEventListener('click', () => {
        this.success.hidden = true;
        this.form.hidden    = false;
        this.form.reset();
        PriceCalc.update();
        this.form.querySelector('.form-input').focus();
      });
    }
  },

  validate() {
    let valid = true;

    const rules = [
      { id: 'f-name',    test: v => v.trim().length >= 2,                          msg: I18n.t('err.name') },
      { id: 'f-phone',   test: v => /^[\d\s\+\-\(\)]{7,20}$/.test(v.trim()),      msg: I18n.t('err.phone') },
      { id: 'f-email',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),  msg: I18n.t('err.email') },
      { id: 'f-vehicle', test: v => v !== '',                                       msg: I18n.t('err.vehicle') },
      { id: 'f-date',    test: v => v !== '',                                       msg: I18n.t('err.date') },
      { id: 'f-address', test: v => v.trim().length >= 5,                          msg: I18n.t('err.address') },
    ];

    rules.forEach(({ id, test, msg }) => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!test(input.value)) {
        this.showError(input, msg);
        valid = false;
      }
    });

    // Validate at least one service checkbox
    const anyService = this.form.querySelectorAll('.cb-main:checked, .cb-addon:checked').length > 0;
    if (!anyService) {
      const errEl = document.getElementById('service-error');
      if (errEl) errEl.textContent = I18n.t('err.service');
      const fgService = document.getElementById('fg-service');
      if (fgService) fgService.classList.add('has-service-error');
      valid = false;
    }

    return valid;
  },

  showError(input, msg) {
    input.classList.add('has-error');
    const errEl = input.parentElement.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  },

  clearError(input) {
    input.classList.remove('has-error');
    const errEl = input.parentElement.querySelector('.form-error');
    if (errEl) errEl.textContent = '';
  },

  clearServiceError() {
    const errEl = document.getElementById('service-error');
    if (errEl) errEl.textContent = '';
    const fgService = document.getElementById('fg-service');
    if (fgService) fgService.classList.remove('has-service-error');
  },

  submit() {
    const data = new FormData(this.form);

    const selectedMain   = Array.from(this.form.querySelectorAll('.cb-main:checked')).map(cb => cb.value);
    const selectedAddons = Array.from(this.form.querySelectorAll('.cb-addon:checked')).map(cb => cb.value);
    const allServices    = [...selectedMain, ...selectedAddons].map(v => SERVICE_EN_LABELS[v] || v);

    const booking = {
      id:             uid(),
      dateReceived:   new Date().toISOString(),
      clientName:     data.get('clientName').trim(),
      clientPhone:    data.get('clientPhone').trim(),
      clientEmail:    data.get('clientEmail').trim(),
      serviceType:    allServices,           // array of EN labels
      vehicleType:    data.get('vehicleType'),
      serviceAddress: data.get('serviceAddress').trim(),
      preferredDate:  data.get('preferredDate'),
      notes:          data.get('notes').trim(),
      status:         'New',
    };

    Storage.addBooking(booking);

    this.form.hidden    = true;
    this.success.hidden = false;
  },
};

/* ─── ADMIN PANEL ────────────────────────────────────────── */
const AdminPanel = {
  filterStatus: '',
  sortBy: 'date-desc',

  init() {
    const loginSection = document.getElementById('admin-login');
    const crmSection   = document.getElementById('admin-crm');

    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      loginSection.hidden = true;
      crmSection.hidden   = false;
      this.initCRM();
    } else {
      loginSection.hidden = false;
      crmSection.hidden   = true;
      this.initLogin();
    }
  },

  initLogin() {
    const form  = document.getElementById('admin-login-form');
    const errEl = document.getElementById('admin-pw-error');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const pw = document.getElementById('admin-pw').value;

      if (pw === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        document.getElementById('admin-login').hidden = true;
        document.getElementById('admin-crm').hidden   = false;
        this.initCRM();
      } else {
        errEl.textContent = 'Incorrect password. Please try again.';
        document.getElementById('admin-pw').classList.add('has-error');
        document.getElementById('admin-pw').value = '';
        document.getElementById('admin-pw').focus();
      }
    });

    document.getElementById('admin-pw').addEventListener('input', () => {
      errEl.textContent = '';
      document.getElementById('admin-pw').classList.remove('has-error');
    });
  },

  initCRM() {
    const filterSelect = document.getElementById('crm-filter-status');
    const sortSelect   = document.getElementById('crm-sort-by');

    filterSelect.addEventListener('change', () => {
      this.filterStatus = filterSelect.value;
      this.renderTable();
    });

    sortSelect.addEventListener('change', () => {
      this.sortBy = sortSelect.value;
      this.renderTable();
    });

    document.getElementById('btn-export-csv').addEventListener('click', () => {
      this.exportCSV();
    });

    document.getElementById('btn-admin-logout').addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.reload();
    });

    this.renderStats();
    this.renderTable();
  },

  getFilteredSorted() {
    let bookings = Storage.getBookings();

    if (this.filterStatus) {
      bookings = bookings.filter(b => b.status === this.filterStatus);
    }

    switch (this.sortBy) {
      case 'date-asc':
        bookings.sort((a, b) => new Date(a.dateReceived) - new Date(b.dateReceived));
        break;
      case 'name-asc':
        bookings.sort((a, b) => a.clientName.localeCompare(b.clientName));
        break;
      case 'preferred-date-asc':
        bookings.sort((a, b) => (a.preferredDate || '').localeCompare(b.preferredDate || ''));
        break;
      default:
        bookings.sort((a, b) => new Date(b.dateReceived) - new Date(a.dateReceived));
    }

    return bookings;
  },

  renderStats() {
    const all    = Storage.getBookings();
    const counts = {};
    counts[I18n.t('admin.stat.total')] = all.length;
    STATUS_ORDER.forEach(s => { counts[s] = all.filter(b => b.status === s).length; });

    const statsEl = document.getElementById('admin-stats');
    statsEl.innerHTML = Object.entries(counts)
      .map(([label, count]) => `
        <div class="stat-card">
          <span class="stat-count">${count}</span>
          <span class="stat-label">${escapeHtml(label)}</span>
        </div>`)
      .join('');
  },

  renderTable() {
    const tbody    = document.getElementById('crm-tbody');
    const emptyEl  = document.getElementById('crm-empty');
    const bookings = this.getFilteredSorted();

    if (!bookings.length) {
      tbody.innerHTML = '';
      emptyEl.hidden  = false;
      return;
    }

    emptyEl.hidden  = true;
    tbody.innerHTML = bookings.map(b => this.rowHtml(b)).join('');

    tbody.querySelectorAll('.crm-status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        Storage.updateStatus(sel.dataset.id, sel.value);
        this.renderStats();
        this.renderTable();
      });
    });

    tbody.querySelectorAll('.crm-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm(`Delete booking for ${btn.dataset.name}? This cannot be undone.`)) {
          Storage.deleteBooking(btn.dataset.id);
          this.renderStats();
          this.renderTable();
        }
      });
    });
  },

  rowHtml(b) {
    const statusOptions = STATUS_ORDER.map(s =>
      `<option value="${s}"${b.status === s ? ' selected' : ''}>${s}</option>`
    ).join('');

    // Handle legacy string and new array serviceType
    const serviceDisplay = Array.isArray(b.serviceType)
      ? b.serviceType.join(', ')
      : (b.serviceType || '—');

    return `
      <tr>
        <td>${escapeHtml(formatDate(b.dateReceived))}</td>
        <td><span class="td-name">${escapeHtml(b.clientName)}</span></td>
        <td>
          <span class="td-name">${escapeHtml(b.clientPhone)}</span>
          <span class="td-sub">${escapeHtml(b.clientEmail)}</span>
        </td>
        <td class="td-notes" title="${escapeHtml(serviceDisplay)}">${escapeHtml(serviceDisplay)}</td>
        <td>${escapeHtml(b.vehicleType)}</td>
        <td class="td-notes" title="${escapeHtml(b.serviceAddress || '')}">${escapeHtml(b.serviceAddress || '—')}</td>
        <td>${escapeHtml(formatDateShort(b.preferredDate))}</td>
        <td><span class="status-badge ${statusClass(b.status)}">${escapeHtml(b.status)}</span></td>
        <td>
          <div class="crm-actions">
            <select class="crm-status-select" data-id="${escapeHtml(b.id)}"
                    aria-label="Update status for ${escapeHtml(b.clientName)}">
              ${statusOptions}
            </select>
            <button class="crm-delete-btn"
                    data-id="${escapeHtml(b.id)}"
                    data-name="${escapeHtml(b.clientName)}"
                    title="${escapeHtml(I18n.t('admin.action.delete'))}"
                    aria-label="Delete booking for ${escapeHtml(b.clientName)}">
              ${escapeHtml(I18n.t('admin.action.delete'))}
            </button>
          </div>
        </td>
      </tr>`;
  },

  exportCSV() {
    const bookings = Storage.getBookings();
    if (!bookings.length) { alert('No bookings to export.'); return; }

    const headers = [
      'Date Received', 'Client Name', 'Phone', 'Email',
      'Services', 'Vehicle Type', 'Service Address', 'Preferred Date', 'Notes', 'Status',
    ];

    const rows = bookings.map(b => {
      const serviceStr = Array.isArray(b.serviceType)
        ? b.serviceType.join('; ')
        : (b.serviceType || '');
      return [
        formatDate(b.dateReceived),
        b.clientName,
        b.clientPhone,
        b.clientEmail,
        serviceStr,
        b.vehicleType,
        b.serviceAddress || '',
        formatDateShort(b.preferredDate),
        b.notes || '',
        b.status,
      ];
    });

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `shine-crm-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

/* ─── PRIVACY PAGE ───────────────────────────────────────── */
const PrivacyPage = {
  init() {
    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  },
};

/* ─── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const isPrivacyPage = document.body.dataset.page === 'privacy';

  // Always init I18n (works on all pages)
  I18n.init();

  if (isPrivacyPage) {
    PrivacyPage.init();
    return;
  }

  Router.init();

  if (!Router.isAdmin()) {
    Header.init();
    ServiceCards.init();
    ScrollAnimations.init();
    BookingForm.init();
    PriceCalc.update(); // Initial state
  }
});
