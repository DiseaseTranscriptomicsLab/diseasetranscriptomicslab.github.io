/* ================================================================
   LAB NEWS - js/news-data.js

   Add or edit news items below. Each item appears as a card in
   the News section (4 most recent on the main page, all on news.html).

   Required:
     date    - display string, e.g. "June 2026"
     title   - short headline
     summary - 1-2 sentence teaser shown on the card

   Optional:
     image    - URL to the card thumbnail (first / best image)
     imageAlt - alt text for the thumbnail
     images   - array of {src, alt} objects shown as a gallery in the modal
     content  - full HTML shown in the pop-up modal

   Items are listed most-recent-first.
   ================================================================ */

const LAB_NEWS = [

  /* ── 2026 ─────────────────────────────────────────────────── */

  {
    date:     "8 June 2026",
    title:    "markeR published in NAR Genomics & Bioinformatics",
    summary:  "Our peer-reviewed article on markeR - an R toolkit for evaluating gene sets as phenotypic markers - is out in NAR Genomics & Bioinformatics.",
    image:    "assets/news/bafkreigifqhty6ujjeo6vvt66v5laywhzmeipgnhgo6i7qq7t353ninsyu.jpg",
    imageAlt: "markeR paper cover",
    content: `
      <p>
        Finally out - our peer-reviewed article is published in
        <strong>NAR Genomics &amp; Bioinformatics</strong>!
      </p>
      <p>
        <em>"Exploring molecular signatures of senescence with markeR,
        an R Toolkit for evaluating gene sets as phenotypic markers"</em>
      </p>
      <p>
        markeR provides a modular, extensible framework for the systematic evaluation
        of gene sets as phenotypic markers using transcriptomic data - tackling
        biological processes like cellular senescence that manifest as diverse
        phenotypes across cell types and conditions.
      </p>
      <p>
        👏 Congratulations to <strong>Rita Martins-Silva</strong> and
        <strong>Alexandre Kaizeler</strong> on this work!
      </p>
      <p>
        <a href="https://academic.oup.com/nargab/article/doi/10.1093/nargab/lqag057/8703711"
           target="_blank" rel="noopener">Read the paper ↗</a>
      </p>
    `,
  },

  {
    date:     "28 March 2026",
    title:    "Lab at the Bioinformatics Open Days at UMinho",
    summary:  "The Lab was well represented at the Bioinformatics Open Days (25-27 March), with Nuno giving a keynote and three members presenting posters.",
    image:    "assets/news/bafkreigf74zxfgbd5uyzh3vtpnrderyilykofrvjmzclcjsyq4v64c7d54.jpg",
    imageAlt: "Lab members at the Bioinformatics Open Days at UMinho",
    images: [
      { src: "assets/news/bafkreigf74zxfgbd5uyzh3vtpnrderyilykofrvjmzclcjsyq4v64c7d54.jpg", alt: "Lab members at UMinho Bioinformatics Open Days" },
      { src: "assets/news/bafkreigbvdsycm5osvucihqcnknygvcud6phkmf77ox6k7d446qc3pbmbe.jpg", alt: "Poster session at UMinho" },
      { src: "assets/news/bafkreiczxvo242xnhq4hbxyhxis34siwvht2jos5jedhfq5vyeogw4rrnu.jpg", alt: "Lab poster presentation" },
      { src: "assets/news/bafkreidpcr67me6qgefhds6zuit4vse7yclmd3j5mj4atchycxah3wpebq.jpg", alt: "Keynote lecture" },
    ],
    content: `
      <p>
        The Lab was well represented at the
        <strong>Bioinformatics Open Days</strong> at the University of Minho
        (25-27 March 2026).
      </p>
      <p>
        Nuno gave a keynote lecture, while Alexandre Kaizeler, Francisca, and
        Rita Martins-Silva presented posters of their ongoing work.
        A great opportunity to connect with the bioinformatics community!
      </p>
    `,
  },

  {
    date:     "19 March 2026",
    title:    "Congratulations to our new Master - Daniel Marques, 20/20!",
    summary:  "Daniel Marques brilliantly defended his MSc dissertation and was awarded a perfect 20/20. We are so proud!",
    image:    "assets/news/bafkreifyr54xkx7rte5wkkych7gs7562enq7cmtsoj63ousfnsnarosjlm.jpg",
    imageAlt: "Daniel Marques MSc defence",
    images: [
      { src: "assets/news/bafkreifyr54xkx7rte5wkkych7gs7562enq7cmtsoj63ousfnsnarosjlm.jpg", alt: "Daniel Marques defence" },
      { src: "assets/news/bafkreibqjeqaq3elrv4b37s4iuy47jzeqcuf3zddzhvurbf7fba5sqfmo4.jpg", alt: "Daniel Marques with supervisors" },
      { src: "assets/news/bafkreigojdzr37d4eba3cwommkco6hrpq4gvh6ruiq2xwst3cdevh557se.jpg", alt: "Celebration after the defence" },
    ],
    content: `
      <p>We are so proud! 🥳</p>
      <p>
        <strong>Daniel Marques</strong> brilliantly defended his MSc dissertation
        and was awarded a perfect <strong>20/20</strong>.
        Congratulations, Daniel! 🤓👏
      </p>
    `,
  },

  {
    date:     "13 March 2026",
    title:    "Nuno introduces the Lab at NOVA Medical School seminar",
    summary:  "On 25 February, Nuno introduced the Lab to new colleagues with a seminar on \"Thinking critically about big data at NOVA Medical School\".",
    image:    "assets/news/bafkreie2amepjy3jsmoalft5ualmxaqptgtfk3zbtwf5fhc4ah2eftakq4.jpg",
    imageAlt: "Nuno giving a seminar at NOVA Medical School",
    images: [
      { src: "assets/news/bafkreie2amepjy3jsmoalft5ualmxaqptgtfk3zbtwf5fhc4ah2eftakq4.jpg", alt: "Nuno giving a seminar at NOVA Medical School" },
      { src: "assets/news/bafkreiahkn2f675hntz4q74t3vtfquehbj2ifevho7irqkuoibm4q7ktme.jpg", alt: "Audience at the NOVA Medical School seminar" },
    ],
    content: `
      <p>
        On 25 February 2026, Nuno introduced the Lab to our new colleagues
        at NOVA Medical School with a seminar entitled
        <em>"Thinking critically about big data at NOVA Medical School"</em>.
      </p>
      <p>
        It was very well attended and very well received.
        We feel very welcome at NMS! 😊
      </p>
    `,
  },

  {
    date:     "13 February 2026",
    title:    "NOVA Medical School highlights Nuno's integration",
    summary:  "NOVA Medical School published a news piece highlighting the integration of Nuno Barbosa Morais and the strengthening of data science research at NMS.",
    image:    "assets/news/bafkreia4jnd63oy6s3fi76h6zslyyw365pkc24oofxczmp46vdmjmh4ge4.jpg",
    imageAlt: "NOVA Medical School news article",
    content: `
      <p>
        NOVA Medical School published a news piece highlighting the integration of
        <strong>Nuno Barbosa Morais</strong> and the strengthening of
        data science research at NMS.
      </p>
      <p>
        <a href="https://www.nms.unl.pt/en-us/faculty/news-and-events/news/detail/newsid/19658"
           target="_blank" rel="noopener">Read the full article at NMS ↗</a>
      </p>
    `,
  },

  {
    date:     "11 February 2026",
    title:    "Happy International Day of Women and Girls in Science!",
    summary:  "On the International Day of Women and Girls in Science, we celebrate the extraordinary women in our lab who drive our science forward every day.",
    image:    "assets/news/bafkreidv7ko2w7viis6hztd3wz26avmixjjxfg4nytkrazxrpnucid3dga.jpg",
    imageAlt: "Lab women scientists",
    images: [
      { src: "assets/news/bafkreidv7ko2w7viis6hztd3wz26avmixjjxfg4nytkrazxrpnucid3dga.jpg", alt: "Lab woman scientist" },
      { src: "assets/news/bafkreifpinybm6vfkwdgdhap4xyyp7hffy5pse4k7mlktkfbf2grdnbrai.jpg", alt: "Lab woman scientist" },
      { src: "assets/news/bafkreigmr6wf3sk4ucyv6ikcdezczovhoyagpy46a2rjru2rhqam6g7ihy.jpg", alt: "Lab woman scientist" },
      { src: "assets/news/bafkreib67nzyijn3t4hju5z6j4p5vk2vzs2zftz7frcgwrgzholug73wke.jpg", alt: "Lab woman scientist" },
    ],
    content: `
      <p>Happy <strong>International Day of Women and Girls in Science</strong>! 👩‍🔬</p>
      <p>
        Today we celebrate the extraordinary women in our lab who drive our
        science forward every single day. We are so lucky to work alongside you!
      </p>
    `,
  },

  {
    date:     "7 February 2026",
    title:    "Nuno lectures at ISCTE Critical Thinking for Decision Making course",
    summary:  "Nuno returns as a lecturer for the pioneering ISCTE EE Postgraduate Course in Critical Thinking for Decision Making, coordinated by José Maria Pimentel.",
    image:    "assets/news/bafkreigw5vnwpa6n6f3if4cmte6i3gwbnczhidnt46mwmn4u2zkyghczaa.jpg",
    imageAlt: "ISCTE Critical Thinking course",
    content: `
      <p>
        Nuno will, proudly and enthusiastically, repeat as one of the lecturers
        of the pioneering <strong>ISCTE EE Postgraduate Course in Critical Thinking
        for Decision Making</strong>, brilliantly coordinated by José Maria Pimentel.
      </p>
      <p>
        <a href="https://execed.iscte-iul.pt/en/applied-online-program-pensamento-critico-para-tomada-de-decisao"
           target="_blank" rel="noopener">Course details ↗</a>
      </p>
    `,
  },

  {
    date:     "6 February 2026",
    title:    "Francisca receives Oncology Research Grant on World Cancer Day",
    summary:  "Francisca's PhD project was awarded an Oncology Research Grant by the Portuguese League Against Cancer and the Benfica Foundation to support her work on rectal cancer biomarkers.",
    image:    "assets/news/bafkreihuexeiyedpf7fmjph46k3esofpwags4pxx3le47gyihzhdclmuja.jpg",
    imageAlt: "Francisca receives oncology research grant",
    content: `
      <p>
        On <strong>World Cancer Day</strong>, we are thrilled to share that
        Francisca's PhD project was awarded an
        <strong>Oncology Research Grant</strong> by the Portuguese League Against
        Cancer (Southern Regional Center) and the Benfica Foundation! 🙏🦀⚕️💪
      </p>
      <p>
        The grant will support her work on testing predictive biomarkers of
        therapeutic response in rectal cancer. Congratulations, Francisca!
      </p>
    `,
  },

  {
    date:     "30 January 2026",
    title:    "Lab shines at CAML & GIMM PhD Meeting - Rita wins Best Poster award",
    summary:  "Alexandre Kaizeler, Rita Martins-Silva, and Francisca presented at the CAML & GIMM PhD Meeting. Rita won the Best Poster Presentation award for 4th-year PhD students!",
    image:    "assets/news/bafkreih6oaewmr6cd4wfrftxldgkb34lh7fgfne6pvv3avbnzm5utudpue.jpg",
    imageAlt: "Lab members at the CAML & GIMM PhD Meeting",
    images: [
      { src: "assets/news/bafkreih6oaewmr6cd4wfrftxldgkb34lh7fgfne6pvv3avbnzm5utudpue.jpg", alt: "Lab members at CAML & GIMM PhD Meeting" },
      { src: "assets/news/bafkreibfgbedyf2ymhfniwju6s5unkm77s24gd6sbfkplyxhbwbpv5imgi.jpg", alt: "Poster presentation at CAML & GIMM" },
      { src: "assets/news/bafkreigeib4dacw66vmx2vipwynri7iaqvf2um36atbrfislworqeetvza.jpg", alt: "Rita Martins-Silva best poster award" },
      { src: "assets/news/bafkreif7xji5qd7s6zy5jzty6b6jgznqmhfhyewp4ifyifxjuzhhtidiry.jpg", alt: "Awards ceremony" },
    ],
    content: `
      <p>
        We are so proud of the Lab's participation in the
        <strong>CAML &amp; GIMM PhD Meeting</strong>!
      </p>
      <p>
        Alexandre Kaizeler, Rita Martins-Silva, and Francisca all eloquently
        presented their work to their colleagues. 👏
      </p>
      <p>
        And a special congratulations to <strong>Rita Martins-Silva</strong>,
        who won the <strong>Best Poster Presentation</strong> award for a
        4th-year PhD student! 🥇
      </p>
    `,
  },

  {
    date:     "11 December 2025",
    title:    "markeR preprint now on bioRxiv",
    summary:  "Our preprint on markeR - an R toolkit for evaluating gene sets as phenotypic markers of senescence - is now available on bioRxiv.",
    image:    "assets/news/bafkreicia5jvqrzlpowkuehu7tz6k4r2nbzc3ulojklrccrlw5vrzykozi.jpg",
    imageAlt: "markeR preprint thumbnail",
    content: `
      <p>Our preprint is now on <strong>bioRxiv</strong>! 💻🧬📰</p>
      <p>
        <em>"Exploring molecular signatures of senescence with markeR,
        an R toolkit for evaluating gene sets as phenotypic markers"</em>
      </p>
      <p>
        markeR provides a systematic framework for evaluating gene sets as
        phenotypic markers using transcriptomic data, designed around
        biological processes like cellular senescence that manifest as
        diverse phenotypes across cell types and conditions.
      </p>
      <p>
        👏 Congratulations to <strong>Rita Martins-Silva</strong>!
      </p>
      <p>
        <a href="https://www.biorxiv.org/content/10.64898/2025.12.05.692517v1"
           target="_blank" rel="noopener">Read the preprint ↗</a>
      </p>
    `,
  },

  /* ── 2025 ─────────────────────────────────────────────────── */

  {
    date:     "May 2025",
    title:    "Congratulations to Mariana - PhD defended!",
    summary:  "Mariana brilliantly defended her PhD Thesis. The whole lab is incredibly proud of her achievement!",
    content: `
      <p>
        Mariana brilliantly defended her PhD Thesis in May 2025!
        The whole lab is incredibly proud of her achievement.
        Congratulations, Mariana! 🎉👏
      </p>
    `,
  },

  /* ── 2024 ─────────────────────────────────────────────────── */

  {
    date:     "October 2024",
    title:    "Diana joins the Lab as BIOMICS Project Manager",
    summary:  "Diana joined the Lab as Project Manager of BIOMICS, our Horizon Europe Twinning grant aimed at fostering excellent research and innovation in biomedical data science.",
    content: `
      <p>
        <strong>Diana</strong> joined the Lab as Project Manager of
        <a href="https://cordis.europa.eu/project/id/101159926" target="_blank" rel="noopener">BIOMICS</a>,
        our new Twinning grant from Horizon Europe
        aimed at "Fostering Excellent Research, Training and Innovation in
        Biomedical Data Science". Welcome, Diana! 🎉
      </p>
    `,
  },

  {
    date:     "June-July 2024",
    title:    "Maria and Daniel join the Lab for their Masters theses",
    summary:  "Maria and Daniel joined the Lab to develop their Masters theses, respectively in Regenerative and Precision Medicine (IST) and Biomedical Research (ULisboa).",
    content: `
      <p>
        <strong>Maria</strong> and <strong>Daniel</strong> joined the Lab
        to develop their Masters theses - Maria in
        <a href="https://tecnico.ulisboa.pt/en/education/courses/masters-programmes/bioengenharia-medicina-regenerativa-e-de-precisao/"
           target="_blank" rel="noopener">Regenerative and Precision Medicine at IST</a>
        and Daniel in
        <a href="https://www.medicina.ulisboa.pt/en/biomedical-research"
           target="_blank" rel="noopener">Biomedical Research at the Lisbon Medical School</a>.
        Welcome! 🎉
      </p>
    `,
  },

  {
    date:     "June 2024",
    title:    "Nuno receives the University of Lisbon / CGD 2024 Scientific Award",
    summary:  "Nuno received the University of Lisbon / Caixa Geral de Depósitos 2024 Scientific Award in Biomedical Sciences - recognising collective work across the lab.",
    content: `
      <p>
        Nuno received the
        <a href="https://shorturl.at/8jblP" target="_blank" rel="noopener">
        University of Lisbon / Caixa Geral de Depósitos 2024 Scientific Award</a>
        in Biomedical Sciences.
      </p>
      <p>
        The award is individual but bibliometric - and therefore recognises the
        collective work of everyone in the lab. Thank you all! 🙏
      </p>
    `,
  },

  {
    date:     "June 2024",
    title:    "Nuno A. wins the João Lobo Antunes Merit PhD Thesis Award",
    summary:  "Nuno Agostinho was the winner of the 5th edition of the João Lobo Antunes Merit PhD Thesis Award. Congratulations!",
    content: `
      <p>
        <strong>Nuno Agostinho</strong> was the winner of the 5th edition of the
        <strong>João Lobo Antunes Merit PhD Thesis Award</strong>.
        Congratulations, Nuno! 🏆🎉
      </p>
    `,
  },

  {
    date:     "March 2024",
    title:    "voyAGEr published in eLife",
    image:    "assets/news/voyAGEr.jpg",
    imageAlt: "voyAGEr graphical abstract showing age-related gene expression analysis across human tissues",
    summary:  "The Version of Record of our article on voyAGEr, our web app for exploratory analyses of age-related gene expression alterations in human tissues, is now published in eLife.",
    content: `
      <p>
        The Version of Record of our article on
        <a href="https://compbio.imm.medicina.ulisboa.pt/app/voyAGEr"
           target="_blank" rel="noopener">voyAGEr</a>,
        our web app for exploratory analyses of age-related gene expression
        alterations in human tissues, is now
        <a href="https://elifesciences.org/articles/88623" target="_blank" rel="noopener">
        published in <em>eLife</em></a>. 🎉
      </p>
    `,
  },

  {
    date:     "February 2024",
    title:    "betAS published in RNA",
    image:    "assets/news/betAS.jpg",
    imageAlt: "betAS graphical abstract illustrating PSI-based alternative splicing analysis with beta distribution model",
    summary:  "Our article on betAS, our web app for intuitive analysis and visualisation of differential alternative splicing, is now published online in RNA.",
    content: `
      <p>
        Our article on
        <a href="https://compbio.imm.medicina.ulisboa.pt/app/betAS"
           target="_blank" rel="noopener">betAS</a>,
        our web app for intuitive analysis and visualisation of
        differential alternative splicing, is now
        <a href="https://doi.org/10.1261/rna.079764.123" target="_blank" rel="noopener">
        published online in <em>RNA</em></a>. 📄🎉
      </p>
    `,
  },

  /* ── 2023 ─────────────────────────────────────────────────── */

  {
    date:     "May 2023",
    title:    "Congratulations to Nuno A. - PhD defended!",
    summary:  "Nuno Agostinho brilliantly defended his PhD Thesis. A huge milestone and a great achievement!",
    content: `
      <p>
        <strong>Nuno Agostinho</strong> brilliantly defended his PhD Thesis in May 2023!
        A huge milestone and a great achievement. Congratulations, Nuno! 🎉👏
      </p>
    `,
  },

  {
    date:     "March 2023",
    title:    "Francisca starts her PhD in the Lab",
    summary:  "Francisca started her PhD in our Lab, being part of the LisbonBioMed programme. Welcome!",
    content: `
      <p>
        <strong>Francisca</strong> started her PhD in our Lab, being part of the
        <a href="https://lisbonbiomed.imm.medicina.ulisboa.pt/"
           target="_blank" rel="noopener">LisbonBioMed</a> programme. Welcome! 🎉
      </p>
    `,
  },

  /* ── 2022 ─────────────────────────────────────────────────── */

  {
    date:     "March 2022",
    title:    "Rita and Alex start their PhDs in the Lab",
    summary:  "Rita and Alex started their PhDs in our Lab, being part of the LisbonBioMed programme. Welcome!",
    content: `
      <p>
        <strong>Rita</strong> and <strong>Alex</strong> started their PhDs
        in our Lab, being part of the
        <a href="https://lisbonbiomed.imm.medicina.ulisboa.pt/"
           target="_blank" rel="noopener">LisbonBioMed</a> programme. Welcome! 🎉
      </p>
    `,
  },

  /* ── 2021 ─────────────────────────────────────────────────── */

  {
    date:     "March 2021",
    title:    "Congratulations to Marie - PhD defended!",
    summary:  "Marie brilliantly defended her PhD Thesis. A huge milestone - congratulations!",
    content: `
      <p>
        <strong>Marie</strong> brilliantly defended her PhD Thesis in March 2021!
        A huge milestone and a wonderful achievement. Congratulations, Marie! 🎉👏
      </p>
    `,
  },

  {
    date:     "December 2020",
    title:    "Marie's paper on Alzheimer's and Parkinson's molecular phenotypes published",
    image:    "assets/news/Bordone.jpg",
    imageAlt: "Graphical abstract showing cell-type proportion analysis in Alzheimer's and Parkinson's disease brains",
    summary:  "Marie's paper on unraveling targetable systemic and cell-type-specific molecular phenotypes of Alzheimer's and Parkinson's brains with digital cytometry is now published in Frontiers in Neuroscience.",
    content: `
      <p>
        Marie's article
        <em>"Unraveling Targetable Systemic and Cell-Type-Specific Molecular Phenotypes
        of Alzheimer's and Parkinson's Brains With Digital Cytometry"</em>
        has just been published in <em>Frontiers in Neuroscience</em>. Congratulations, Marie! 🎉
      </p>
      <p>
        <a href="https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2020.607215/full"
           target="_blank" rel="noopener">Read the paper ↗</a>
      </p>
    `,
  },

  /* ── 2020 ─────────────────────────────────────────────────── */

  {
    date:     "January 2020",
    title:    "psichomics stem cell analysis book chapter published",
    summary:  "Our book chapter \"Interactive Alternative Splicing Analysis of Human Stem Cells Using psichomics\" is published in Methods in Molecular Biology.",
    content: `
      <p>
        Our book chapter
        <em>"Interactive Alternative Splicing Analysis of Human Stem Cells Using psichomics"</em>
        is published in <em>Methods in Molecular Biology</em> (Stem Cell Transcriptional Networks). 📄🎉
      </p>
      <p>
        <a href="https://doi.org/10.1007/978-1-0716-0301-7_10"
           target="_blank" rel="noopener">Read the chapter ↗</a>
      </p>
    `,
  },

  /* ── 2019 ─────────────────────────────────────────────────── */

  {
    date:     "November 2019",
    title:    "Nuno awarded 6-year FCT Assistant Researcher contract",
    summary:  "Nuno was awarded a 6-year Assistant Researcher contract in FCT's Individual Call to Scientific Employment Stimulus.",
    content: `
      <p>
        Nuno was awarded a <strong>6-year Assistant Researcher contract</strong>
        in FCT's Individual Call to Scientific Employment Stimulus. 🎉
      </p>
    `,
  },

  {
    date:     "September 2019",
    title:    "ESRP2 and alternative splicing in prostate cancer published in eLife",
    summary:  "Our collaborative work with the Elliott Lab - \"Androgen-regulated transcription of ESRP2 drives alternative splicing patterns in prostate cancer\" - is published in eLife.",
    content: `
      <p>
        Our collaborative work with the <strong>Elliott Lab</strong>,
        <em>"Androgen-regulated transcription of ESRP2 drives alternative splicing
        patterns in prostate cancer"</em>,
        has just been published in <em>eLife</em>. 🎉
      </p>
      <p>
        <a href="https://elifesciences.org/articles/47678"
           target="_blank" rel="noopener">Read the paper ↗</a>
      </p>
    `,
  },

  {
    date:     "March 2019",
    title:    "Pan-cancer centrosome amplification paper published in PLoS Computational Biology",
    summary:  "Our article on the pan-cancer association of a centrosome amplification gene expression signature with genomic alterations and clinical outcome is published in PLoS Computational Biology.",
    content: `
      <p>
        Our article
        <em>"Pan-cancer association of a centrosome amplification gene expression signature
        with genomic alterations and clinical outcome"</em>
        has just been published in
        <a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006832"
           target="_blank" rel="noopener"><em>PLoS Computational Biology</em></a>. 📄🎉
      </p>
      <p>
        <a href="https://doi.org/10.1371/journal.pcbi.1006832"
           target="_blank" rel="noopener">Read the paper ↗</a>
      </p>
    `,
  },

  {
    date:     "September 2019",
    title:    "Mariana wins 1st prize Young ICSA Poster Award in Athens",
    summary:  "Mariana won the 1st prize of the Young ICSA Poster Award at ICSA 2019 - “Cellular Senescence: the bright &amp; dark side” in Athens.",
    images: [
      { src: "assets/news/icsa2019-award.jpg", alt: "Mariana at ICSA 2019 with her award" },
      { src: "assets/news/icsa2019-poster.jpg", alt: "Mariana's poster at ICSA 2019" },
    ],
    image:    "assets/news/icsa2019-award.jpg",
    imageAlt: "Mariana at ICSA 2019 with her award",
    content: `
      <p>
        <strong>Mariana</strong> won the <strong>1st prize of the Young ICSA Poster Award</strong>
        at the
        <a href="https://www.icsa2019-athens.gr/" target="_blank" rel="noopener">
        ICSA 2019 conference - "Cellular Senescence: the bright &amp; dark side"</a>
        in Athens, Greece. 🏆🎉
      </p>
      <p>Congratulations, Mariana! Well deserved.</p>
    `,
  },

];
