export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Pour un visuel à l'unité, comptez 3 à 5 jours ouvrés. Pour un pack complet ou un projet de communication global, on prévoit ensemble un planning sur 2 à 3 semaines selon la charge.",
  },
  {
    question: "Combien d'allers-retours sont inclus ?",
    answer:
      "Chaque création inclut 2 séries de retours sans surcoût. Au-delà, on ajuste ensemble selon les besoins — l'objectif reste un livrable qui te ressemble vraiment.",
  },
  {
    question: "Acceptez-vous tous les secteurs d'activité ?",
    answer:
      "Je travaille principalement avec des restaurants, des coachs sportifs, des commerces locaux et de l'événementiel. Si ton secteur est ailleurs, on en discute et on regarde si on est compatibles.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "30% à la commande pour valider le démarrage, le solde à la livraison des fichiers finaux. Virement ou Stripe. Une facture est systématiquement envoyée.",
  },
  {
    question: "Travaillez-vous à distance ou en présentiel ?",
    answer:
      "100% à distance par défaut, ce qui me permet d'accompagner des clients partout en France. Sur Saint-Étienne, Lyon et la région Auvergne-Rhône-Alpes, on peut se voir pour les projets qui le justifient.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "On commence chaque projet par un brief précis pour aligner la vision. Les retours sont là pour ajuster, et je m'engage à arriver à un livrable qui sert vraiment ton business.",
  },
];
