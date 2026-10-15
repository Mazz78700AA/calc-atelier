/* Calc Atelier : données matières et filetages.
   Matières : [famille ISO, nom, Vc carbure min, max, Vc ARS min, max (0 = déconseillé), kc N/mm², masse volumique kg/dm³, Vc taraudage ARS min, max (0 = non applicable)]
   Valeurs indicatives de pratique courante, à confirmer avec le catalogue du fabricant d'outils. */
var CA_MATS = [
  ["P", "S235 / E24 (acier de construction)", 150, 250, 25, 35, 1900, 7.85, 10, 15],
  ["P", "S355 / E36 (acier de construction)", 130, 230, 22, 32, 2000, 7.85, 8, 12],
  ["P", "C22 / XC18 (acier doux)", 150, 250, 25, 35, 1800, 7.85, 10, 15],
  ["P", "E295 / E335 (A50, A60)", 130, 220, 20, 30, 2000, 7.85, 8, 12],
  ["P", "C35 / XC38", 140, 230, 22, 32, 2000, 7.85, 8, 12],
  ["P", "C45 / XC48", 120, 220, 20, 30, 2100, 7.85, 8, 12],
  ["P", "S300 / 11SMn30 (décolletage)", 200, 300, 35, 50, 1500, 7.85, 12, 20],
  ["P", "16MnCr5 / 20NiCrMo2 (cémentation, non traité)", 120, 200, 20, 30, 2100, 7.85, 8, 12],
  ["P", "42CrMo4 / 34CrNiMo6 (traité 28 à 32 HRC)", 100, 180, 15, 22, 2500, 7.85, 5, 8],
  ["P", "100Cr6 (roulement, recuit)", 90, 160, 12, 20, 2300, 7.8, 5, 8],
  ["P", "Acier à ressort 51CrV4 (recuit)", 100, 170, 15, 22, 2300, 7.85, 5, 8],
  ["P", "Acier à outils X40CrMoV5 (recuit)", 80, 150, 12, 18, 2400, 7.8, 4, 6],
  ["P", "Acier à outils X155CrVMo12 (recuit)", 70, 130, 10, 15, 2500, 7.7, 3, 5],
  ["M", "Inox 303 (X8CrNiS18-9, décolletage)", 120, 200, 20, 30, 2000, 7.9, 6, 10],
  ["M", "Inox 304 / 304L (X5CrNi18-10)", 80, 150, 10, 15, 2400, 7.93, 3, 6],
  ["M", "Inox 316 / 316L (X2CrNiMo17-12-2)", 70, 130, 8, 12, 2500, 7.98, 3, 5],
  ["M", "Inox 410 / 420 (X12Cr13, X20Cr13)", 100, 170, 12, 18, 2200, 7.7, 4, 7],
  ["M", "Inox 17-4PH (X5CrNiCuNb16-4)", 60, 120, 8, 12, 2600, 7.75, 3, 5],
  ["M", "Duplex 2205 (X2CrNiMoN22-5-3)", 50, 100, 6, 10, 2700, 7.8, 2, 4],
  ["K", "Fonte grise EN-GJL-250 (FGL 250)", 100, 200, 15, 25, 1100, 7.2, 8, 14],
  ["K", "Fonte GS EN-GJS-500-7 (FGS)", 100, 180, 12, 20, 1500, 7.1, 6, 10],
  ["K", "Fonte GS EN-GJS-700-2", 80, 140, 8, 14, 1800, 7.1, 4, 8],
  ["N", "Aluminium pur 1050 (A5)", 300, 800, 100, 250, 500, 2.71, 12, 25],
  ["N", "Aluminium 2017A (AU4G)", 250, 600, 80, 200, 750, 2.8, 10, 20],
  ["N", "Aluminium 5083 (AG4,5MC)", 250, 500, 80, 150, 650, 2.66, 10, 20],
  ["N", "Aluminium 6061 / 6082 (AGS)", 300, 700, 100, 200, 700, 2.7, 10, 25],
  ["N", "Aluminium 7075 (AZ5G)", 250, 600, 80, 180, 800, 2.81, 10, 20],
  ["N", "Aluminium de fonderie AlSi (AS7, AS9)", 200, 500, 60, 120, 800, 2.68, 8, 15],
  ["N", "Aluminium de fonderie très siliceux (AS12 et plus)", 150, 300, 40, 80, 900, 2.68, 6, 10],
  ["N", "Cuivre pur (Cu-ETP)", 150, 300, 40, 80, 1400, 8.96, 8, 15],
  ["N", "Laiton CuZn39Pb3 (décolletage)", 200, 400, 60, 120, 780, 8.47, 10, 25],
  ["N", "Laiton CuZn37 (sans plomb)", 150, 250, 40, 80, 900, 8.4, 8, 15],
  ["N", "Bronze CuSn8 / CuSn12", 100, 200, 30, 60, 1100, 8.8, 6, 12],
  ["N", "Bronze d'aluminium CuAl10Fe", 80, 150, 15, 30, 1700, 7.6, 4, 8],
  ["N", "Cupro-béryllium CuBe2", 80, 150, 15, 30, 1500, 8.25, 5, 8],
  ["N", "Magnésium AZ31 / AZ91 (risque d'incendie des copeaux fins)", 400, 1000, 150, 300, 350, 1.77, 15, 30],
  ["N", "Zinc / Zamak 5", 200, 400, 60, 120, 700, 6.6, 10, 20],
  ["S", "Titane pur grade 2", 60, 120, 10, 20, 1300, 4.51, 4, 8],
  ["S", "Titane TA6V (Ti-6Al-4V)", 40, 90, 6, 12, 1400, 4.43, 3, 5],
  ["S", "Inconel 718", 25, 60, 3, 6, 2900, 8.19, 1.5, 3],
  ["S", "Inconel 625", 25, 60, 3, 6, 2800, 8.44, 1.5, 3],
  ["S", "Hastelloy C276", 20, 50, 3, 5, 2900, 8.89, 1.5, 3],
  ["S", "Monel 400", 40, 80, 6, 10, 2200, 8.8, 3, 5],
  ["H", "Acier trempé 45 à 55 HRC", 50, 100, 0, 0, 3000, 7.85, 0, 0],
  ["H", "Acier trempé 55 à 62 HRC (CBN conseillé)", 30, 70, 0, 0, 3500, 7.85, 0, 0],
  ["X", "POM (Delrin, acétal)", 200, 400, 100, 200, 350, 1.41, 10, 20],
  ["X", "PA6 / PA66 (nylon)", 150, 300, 80, 150, 300, 1.14, 10, 20],
  ["X", "PTFE (téflon)", 200, 400, 100, 200, 150, 2.2, 10, 20],
  ["X", "PEEK", 150, 300, 80, 150, 400, 1.32, 8, 15],
  ["X", "PVC rigide", 150, 300, 80, 150, 250, 1.4, 10, 20],
  ["X", "PMMA (plexiglas)", 150, 300, 80, 150, 250, 1.19, 8, 15],
  ["X", "Polycarbonate (PC)", 150, 300, 80, 150, 300, 1.2, 8, 15],
  ["X", "ABS", 150, 300, 80, 150, 250, 1.05, 8, 15],
  ["X", "PE-HD", 200, 400, 100, 200, 200, 0.95, 10, 20],
  ["X", "PP (polypropylène)", 200, 400, 100, 200, 200, 0.91, 10, 20],
  ["X", "Composite carbone / époxy (très abrasif)", 150, 300, 0, 0, 600, 1.55, 0, 0],
  ["X", "Verre / époxy G10, FR4 (très abrasif)", 100, 250, 0, 0, 1000, 1.85, 0, 0],
  ["X", "Graphite (poussière : aspiration obligatoire)", 200, 500, 0, 0, 200, 1.8, 0, 0]
].map(function (r, i) {
  return { id: "m" + i, g: r[0], n: r[1], car: [r[2], r[3]], hss: [r[4], r[5]], kc: r[6], rho: r[7], tap: [r[8], r[9]] };
});

var CA_GROUPS = {
  P: "Aciers (P)",
  M: "Inox (M)",
  K: "Fontes (K)",
  N: "Aluminium, cuivreux et autres non-ferreux (N)",
  S: "Titane et superalliages (S)",
  H: "Aciers trempés (H)",
  X: "Plastiques, composites, graphite"
};

function caImp(name, dmm, tpi) { return [name, Math.round(dmm * 1000) / 1000, Math.round(25.4 / tpi * 1000) / 1000]; }

var CA_FAMS = [
  ["m", "Métrique ISO (pas gros)"],
  ["mf", "Métrique ISO (pas fin)"],
  ["unc", "UNC (pouce, pas gros)"],
  ["unf", "UNF (pouce, pas fin)"],
  ["g", "Gaz BSP (G)"]
];

var CA_TH = {
  m: [["M2", 2, 0.4], ["M2,5", 2.5, 0.45], ["M3", 3, 0.5], ["M4", 4, 0.7], ["M5", 5, 0.8], ["M6", 6, 1], ["M8", 8, 1.25], ["M10", 10, 1.5], ["M12", 12, 1.75], ["M14", 14, 2], ["M16", 16, 2], ["M18", 18, 2.5], ["M20", 20, 2.5], ["M22", 22, 2.5], ["M24", 24, 3], ["M27", 27, 3], ["M30", 30, 3.5], ["M36", 36, 4], ["M42", 42, 4.5], ["M48", 48, 5]],
  mf: [["M6x0,75", 6, 0.75], ["M8x1", 8, 1], ["M10x1", 10, 1], ["M10x1,25", 10, 1.25], ["M12x1,25", 12, 1.25], ["M12x1,5", 12, 1.5], ["M14x1,5", 14, 1.5], ["M16x1,5", 16, 1.5], ["M18x1,5", 18, 1.5], ["M20x1,5", 20, 1.5], ["M22x1,5", 22, 1.5], ["M24x2", 24, 2], ["M27x2", 27, 2], ["M30x2", 30, 2], ["M33x2", 33, 2], ["M36x3", 36, 3]],
  unc: [caImp("UNC n°6-32", 3.505, 32), caImp("UNC n°8-32", 4.166, 32), caImp("UNC n°10-24", 4.826, 24), caImp("UNC 1/4-20", 6.35, 20), caImp("UNC 5/16-18", 7.938, 18), caImp("UNC 3/8-16", 9.525, 16), caImp("UNC 7/16-14", 11.113, 14), caImp("UNC 1/2-13", 12.7, 13), caImp("UNC 9/16-12", 14.288, 12), caImp("UNC 5/8-11", 15.875, 11), caImp("UNC 3/4-10", 19.05, 10), caImp("UNC 7/8-9", 22.225, 9), caImp("UNC 1-8", 25.4, 8)],
  unf: [caImp("UNF n°6-40", 3.505, 40), caImp("UNF n°8-36", 4.166, 36), caImp("UNF n°10-32", 4.826, 32), caImp("UNF 1/4-28", 6.35, 28), caImp("UNF 5/16-24", 7.938, 24), caImp("UNF 3/8-24", 9.525, 24), caImp("UNF 7/16-20", 11.113, 20), caImp("UNF 1/2-20", 12.7, 20), caImp("UNF 9/16-18", 14.288, 18), caImp("UNF 5/8-18", 15.875, 18), caImp("UNF 3/4-16", 19.05, 16), caImp("UNF 7/8-14", 22.225, 14), caImp("UNF 1-12", 25.4, 12)],
  g: [caImp("G 1/8", 9.728, 28), caImp("G 1/4", 13.157, 19), caImp("G 3/8", 16.662, 19), caImp("G 1/2", 20.955, 14), caImp("G 5/8", 22.911, 14), caImp("G 3/4", 26.441, 14), caImp("G 1", 33.249, 11), caImp("G 1 1/4", 41.91, 11), caImp("G 1 1/2", 47.803, 11), caImp("G 2", 59.614, 11)]
};
