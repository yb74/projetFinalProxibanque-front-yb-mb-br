export interface VirementData {
    montant: number; // Montant du virement
    typeVirement: 'compteCourantVersCompteCourant' | 'compteCourantVersCompteEpargne' | 'compteEpargneVersCompteCourant'; // Type de virement
    idEmetteur: number; // ID de l'émetteur
    idRecepteur: number;
  }
  