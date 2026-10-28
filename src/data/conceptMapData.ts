export interface ConceptNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'central' | 'independencia' | 'conflicto' | 'dialogo' | 'integracion' | 'puentes' | 'casos' | 'cosmovisiones';
  x: number;
  y: number;
  level: number; // 0: Root/Synthesis, 1: Typology/Model Header, 2: Key Concept/Bridge, 3: Case/Detail
  summary: string;
  analysis: string[];
  quote: {
    text: string;
    author: string;
    reference: string;
    page: number | string;
  };
  keyTakeaway: string;
  tags: string[];
}

export interface ConceptLink {
  id: string;
  source: string;
  target: string;
  label: string;
  type: 'hierarchy' | 'critique' | 'bridge' | 'contrast' | 'resolution';
}

export const CATEGORIES = {
  central: {
    name: 'Núcleo Central',
    color: '#D97706', // amber-600
    bg: '#FEF3C7', // amber-100
    border: '#F59E0B',
    darkBg: 'rgba(217, 119, 6, 0.15)',
    description: 'Tesis epistemológica central del Dr. Luis Fernando Aragón sobre la tensión dinámica vs contradicción.'
  },
  independencia: {
    name: 'Independencia',
    color: '#0284C7', // sky-600
    bg: '#E0F2FE', // sky-100
    border: '#38BDF8',
    darkBg: 'rgba(2, 132, 199, 0.15)',
    description: 'Postura de esferas no superpuestas (NOMA / Cada quien en lo suyo) y su inviabilidad en la práctica.'
  },
  conflicto: {
    name: 'Conflicto',
    color: '#E11D48', // rose-600
    bg: '#FFE4E6', // rose-100
    border: '#FB7185',
    darkBg: 'rgba(225, 29, 72, 0.15)',
    description: 'El mito de la guerra perenne, sus raíces decimonónicas y las tensiones internas en cada disciplina.'
  },
  cosmovisiones: {
    name: 'Cosmovisiones',
    color: '#7C3AED', // violet-600
    bg: '#EDE9FE', // violet-100
    border: '#A78BFA',
    darkBg: 'rgba(124, 58, 237, 0.15)',
    description: 'El verdadero choque de fondo: Naturalismo Metafísico vs. Teísmo Trascendente.'
  },
  casos: {
    name: 'Casos Históricos',
    color: '#EA580C', // orange-600
    bg: '#FFEDD5', // orange-100
    border: '#FB923C',
    darkBg: 'rgba(234, 88, 12, 0.15)',
    description: 'Galileo Galilei (1633), Lavoisier en la guillotina (1794) y la controversia darwiniana (1859).'
  },
  dialogo: {
    name: 'Diálogo',
    color: '#059669', // emerald-600
    bg: '#D1FAE5', // emerald-100
    border: '#34D399',
    darkBg: 'rgba(5, 150, 105, 0.15)',
    description: 'Conversación entre iguales: preguntas existenciales, purificación recíproca y narrativas complementarias.'
  },
  puentes: {
    name: 'Puentes Filosóficos',
    color: '#4F46E5', // indigo-600
    bg: '#E0E7FF', // indigo-100
    border: '#818CF8',
    darkBg: 'rgba(79, 70, 229, 0.15)',
    description: 'Las tres presuposiciones de la ciencia propuestas por Mariano Artigas: ontológica, epistemológica y ética.'
  },
  integracion: {
    name: 'Integración',
    color: '#0D9488', // teal-600
    bg: '#CCFBF1', // teal-100
    border: '#2DD4BF',
    darkBg: 'rgba(13, 148, 136, 0.15)',
    description: 'Integración personal madura en la vida del científico, vocación de investigar y Fides et Ratio.'
  }
};

export const CONCEPT_NODES: ConceptNode[] = [
  // ==========================================
  // NIVEL 0: NÚCLEO CENTRAL & TESIS EPISTEMOLÓGICA (X: 960)
  // ==========================================
  {
    id: 'core-tesis',
    title: 'Interacción Ciencia y Religión: Tensión Esperable',
    subtitle: 'Tesis central: No hay contradicción intrínseca, sino una tensión dinámica y saludable',
    category: 'central',
    x: 960,
    y: 40,
    level: 0,
    summary: 'El Dr. Luis Fdo. Aragón refuta la idea de una guerra irreconciliable entre la ciencia natural y la religión cristiana, proponiendo que la relación natural entre ambas es una tensión saludable inherente a la búsqueda del conocimiento.',
    analysis: [
      'La ciencia y la religión son dos poderosas fuerzas culturales e intelectuales presentes en la vida cotidiana de millones de personas.',
      'Existe una diferencia tajante entre "tensión" (dinámica fértil donde fuerzas distintas jalan hacia diferentes direcciones impulsando el progreso) y "conflicto" (situación negativa de suma cero donde una busca aniquilar a la otra).',
      'El autor escribe desde la perspectiva vivencial y reflexiva de ser simultáneamente un investigador científico con más de 25 años en ciencias del movimiento humano y un cristiano practicante.'
    ],
    quote: {
      text: 'Mi argumento es que no existe una contradicción inherente entre ellas, sino una tensión esperable... La tensión se entiende como una situación dinámica, saludable, en la cual dos o más fuerzas halan en diferentes direcciones; el conflicto se presenta como una situación indeseable, cuya única resolución ocurrirá cuando una venza a la otra.',
      author: 'Dr. Luis Fernando Aragón',
      reference: 'Revista InterSedes, Vol. 18, No. 37',
      page: '3-4, 14'
    },
    keyTakeaway: 'La coexistencia de ciencia y fe no exige elegir un bando; la tensión intelectual honesta es motor de crecimiento personal y académico.',
    tags: ['Tensión vs Conflicto', 'Epistemología', 'Científico Creyente', 'InterSedes']
  },

  // ==========================================
  // NIVEL 1: MARCO TIPOLÓGICO CLÁSICO (X: 980)
  // ==========================================
  {
    id: 'tipologia-barbour',
    title: 'La Cuádruple Tipología de Ian Barbour',
    subtitle: 'Marco de referencia clásico: Independencia, Conflicto, Diálogo e Integración',
    category: 'central',
    x: 980,
    y: 200,
    level: 1,
    summary: 'Propuesta por Ian Barbour en 1987 ante el Observatorio Vaticano, esta tipología es el mapa conceptual más aceptado para evaluar las relaciones entre ciencia y religión a nivel histórico, epistemológico y cultural.',
    analysis: [
      'Barbour clasifica las posturas en cuatro cuadrantes: Conflicto, Independencia, Diálogo e Integración.',
      'Otros autores plantean variantes equivalentes: John Haught (Conflicto, Contraste, Contacto, Confirmación) y el Instituto de Hermenéutica (Convergencia, Conflicto, Complementariedad, Rechazo).',
      'El artículo evalúa rigurosamente cada uno de los cuatro cuadrantes de Barbour a la luz de la filosofía e historia de la ciencia moderna.'
    ],
    quote: {
      text: 'Barbour (1997) utiliza una tipología de cuatro elementos para el estudio de estas interacciones: conflicto, independencia, diálogo e integración. Es la tipología más ampliamente utilizada en un esfuerzo por resumir y evaluar varios debates clave.',
      author: 'Ian G. Barbour / Luis Fdo. Aragón',
      reference: 'Religion and Science / InterSedes',
      page: '5'
    },
    keyTakeaway: 'El marco de Barbour organiza sistemáticamente siglos de discusión, permitiendo pasar de prejuicios simplistas a una categorización rigurosa.',
    tags: ['Barbour', 'Tipología', 'Clasificación', 'Haught']
  },

  // ==========================================
  // COLUMNA 1: MODELO DE INDEPENDENCIA (X: 50)
  // ==========================================
  {
    id: 'independencia-postulado',
    title: 'Modelo de Independencia: Esferas Separadas',
    subtitle: '«Cada quien en lo suyo»: autonomía total de métodos, objetos y lenguajes (NOMA)',
    category: 'independencia',
    x: 50,
    y: 430,
    level: 1,
    summary: 'Sostiene que la ciencia y la religión son campos completamente autónomos y mutuamente excluyentes, cada uno legítimo en su propio dominio territorial sin áreas de contacto.',
    analysis: [
      'Respaldado formalmente por la Academia Nacional de Ciencias de EE.UU.: la ciencia estudia lo empírico/natural; la religión atiende la fe y el sentido trascendente.',
      'Su atractivo principal es la paz pragmática: pretende evitar que se hagan daño recíproco o que se juzgue a una con los cánones de la otra.',
      'Conocido filosóficamente como el principio de magisterios no superpuestos (NOMA, Stephen Jay Gould).'
    ],
    quote: {
      text: 'La religión y la ciencia son esferas del pensamiento humano separadas y mutuamente excluyentes, cuya presentación en el mismo contexto lleva a malentendidos tanto de las teorías científicas como de las creencias religiosas.',
      author: 'Academia Nacional de Ciencias de EE.UU.',
      reference: 'Citado por Alister McGrath (2010)',
      page: '5'
    },
    keyTakeaway: 'La independencia busca proteger la autonomía, pero aísla artificialmente saberes que inciden en una misma existencia humana.',
    tags: ['NOMA', 'Autonomía', 'Esferas Separadas', 'NAS']
  },
  {
    id: 'independencia-critica',
    title: 'Crítica: Dicotomía y «Esquizofrenia Intelectual»',
    subtitle: 'La realidad es unitaria: es insostenible compartimentar la mente del investigador',
    category: 'independencia',
    x: 50,
    y: 610,
    level: 2,
    summary: 'El autor y pensadores como Charles Coulson y C. S. Lewis demuestran que la independencia fracasa ante el científico individual creyente, quien no puede dividir su vida en compartimentos estancos.',
    analysis: [
      'Charles Coulson (1958) advirtió que marcar un seto fronterizo en la mente presupone una dicotomía existencial insoportable para quien posee ambas lealtades.',
      'C. S. Lewis señaló que la fe impregna la totalidad de la vida: no existen "actividades no religiosas", sino sólo actividades religiosas o irreligiosas.',
      'La tendencia científica actual es la interdisciplinariedad y transdisciplinariedad; decretar la separación rígida de saberes representa un retroceso epistemológico.'
    ],
    quote: {
      text: 'No sería honesto de mi parte que guardara mis convicciones religiosas en una gaveta antes de ingresar al laboratorio y las volviera a recoger antes de partir... La perspectiva de la independencia provocará una esquizofrenia intelectual en aquellos individuos que son a la vez cristianos y científicos.',
      author: 'Dr. Luis Fernando Aragón / Charles Coulson',
      reference: 'Science and the Idea of God / InterSedes',
      page: '6-7'
    },
    keyTakeaway: 'El ser humano busca coherencia integral: separar tajantemente fe y ciencia mutila la experiencia unificada del científico.',
    tags: ['Coulson', 'C. S. Lewis', 'Esquizofrenia Intelectual', 'Interdisciplinariedad']
  },
  {
    id: 'juan-pablo-aislamiento',
    title: 'Inviabilidad Social del Aislamiento',
    subtitle: 'Juan Pablo II: Las opciones de la Iglesia y la ciencia no incluyen el aislamiento',
    category: 'independencia',
    x: 50,
    y: 790,
    level: 3,
    summary: 'La separación no sólo es inviable a nivel personal, sino también a nivel cultural y social: los científicos toman decisiones fundamentadas en valores, y los creyentes asimilan constantemente ideas científicas.',
    analysis: [
      'En su carta de 1988 al Observatorio Vaticano, el Papa Juan Pablo II subraya que la interacción es ineludible.',
      'El dilema real no es si interactúan, sino cómo: si lo harán de forma crítica y con profundidad reflexiva, o con una superficialidad destructiva.',
      'La sabiduría teológica y filosófica ayuda a evitar la absolutización ciega de los datos empíricos más allá de sus límites válidos.'
    ],
    quote: {
      text: 'Porque la verdad del asunto es que la Iglesia y la comunidad científica inevitablemente van a interactuar; sus opciones no incluyen el aislamiento... La única pregunta es si harán esto de manera crítica o irreflexiva, con profundidad y matices o con una superficialidad que degrada el Evangelio.',
      author: 'Papa Juan Pablo II',
      reference: 'Carta al Rev. George V. Coyne',
      page: '7'
    },
    keyTakeaway: 'Cerrarse al diálogo no elimina la influencia recíproca; sólo garantiza que se produzca de forma descuidada y empobrecedora.',
    tags: ['Juan Pablo II', 'Sociedad', 'Valores', 'George Coyne']
  },

  // ==========================================
  // COLUMNA 2: MODELO DEL CONFLICTO (X: 680)
  // ==========================================
  {
    id: 'conflicto-mito',
    title: 'Modelo del Conflicto: El Mito de la Guerra Perenne',
    subtitle: 'Falsa narrativa forjada en el siglo XIX por Draper y White',
    category: 'conflicto',
    x: 680,
    y: 430,
    level: 1,
    summary: 'La creencia popular de que la ciencia y la religión han estado en guerra perenne carece de base histórica seria. Es una invención propagandística de finales del siglo XIX desmentida por los historiadores contemporáneos.',
    analysis: [
      'Popularizada por John William Draper (1874) y Andrew Dickson White (1896) en obras panfletarias que crearon el estereotipo del cristianismo oscurantista.',
      'Historiadores de renombre como Peter Harrison y David Lindberg califican esta tesis formalmente como "el mito del conflicto".',
      'El registro histórico muestra una relación compleja y variada: colaboración, patrocinio institucional, debate intelectual, acomodo mutuo y momentos de tensión fértil.'
    ],
    quote: {
      text: 'Peter Harrison (2010) llega al extremo de llamarlo "el mito del conflicto", luego de explicar que el registro histórico no revela un modelo de guerra constante... La historia recopilada no es una historia de guerra entre la ciencia y la iglesia, tampoco de incesante aprobación, sino de rica complejidad humana (Lindberg).',
      author: 'Peter Harrison / David Lindberg',
      reference: 'The Cambridge Companion to Science and Religion',
      page: '10, 11'
    },
    keyTakeaway: 'El "conflicto perpetuo" es un cliché cultural simplista; la historia documenta alianzas profundas y fecundidad compartida.',
    tags: ['Draper', 'White', 'Harrison', 'Lindberg', 'Mito del Conflicto']
  },
  {
    id: 'cosmovisiones-choque',
    title: 'El Conflicto Raíz: Naturalismo Metafísico vs. Teísmo',
    subtitle: 'El enfrentamiento no es entre métodos, sino entre visiones del cosmos',
    category: 'cosmovisiones',
    x: 680,
    y: 610,
    level: 2,
    summary: 'John Lennox clarifica que la colisión real no es Ciencia versus Religión, sino la pugna entre dos cosmovisiones ontológicas incompatibles: el naturalismo cerrado y la fe en un Dios personal creador.',
    analysis: [
      'Naturalismo Metafísico: dogma filosófico que asume que la materia y energía física son todo lo que existe, pretendiendo ilegítimamente que la ciencia empírica desacredita la metafísica y lo sobrenatural.',
      'Teísmo: cosmovisión que sostiene la existencia de un Creador personal, libre y trascendente que sostiene las leyes del universo.',
      'Confundir ciencia con naturalismo es un error de categoría: el método científico es neutral respecto a la existencia de Dios; su limitación a lo físico es metodológica, no metafísica.'
    ],
    quote: {
      text: 'El verdadero conflicto se da entre dos cosmovisiones diametralmente opuestas: naturalismo y teísmo. El choque es inevitable. La ciencia no es necesariamente naturalista, así como la religión no es necesariamente teísta, por lo cual el conflicto no es necesariamente entre ciencia y religión.',
      author: 'John Lennox / Mariano Artigas',
      reference: 'God\'s Undertaker / The Mind of the Universe',
      page: '16'
    },
    keyTakeaway: 'El cientificismo disfraza una metafísica materialista con el prestigio del laboratorio; desenmascarar este salto conceptual es vital.',
    tags: ['Lennox', 'Naturalismo', 'Teísmo', 'Cientificismo', 'Cosmovisión']
  },
  {
    id: 'caso-galileo',
    title: 'El Caso Galileo: Mitos vs. Realidad Histórica',
    subtitle: 'Juicio de 1633: debate de hermenéutica bíblica y consenso científico ptolemaico',
    category: 'casos',
    x: 680,
    y: 790,
    level: 2,
    summary: 'Lejos de ser un choque maniqueo entre la razón científica y el dogma ciego, el juicio de Galileo involucró complejos factores científicos, teológicos y metodológicos en el contexto de la Contrarreforma.',
    analysis: [
      'Christopher Decaen (2012) evidencia que Galileo defendía una interpretación escrituraria agustiniana abierta, mientras Roma respaldaba la física y cosmología mayoritaria de la comunidad científica aristotélica de la época.',
      'Galileo cometió errores científicos graves: su pretendida prueba irrefutable del heliocentrismo se basaba en el ciclo de las mareas terrestres (predecía 1 marea cada 24h en vez de 2) y rechazó con soberbia la certera teoría lunar de Johannes Kepler.',
      'Roma exigió que la teoría heliocéntrica aportara demostraciones empíricas irrefutables antes de reinterpretar el sentido literal de los pasajes bíblicos.'
    ],
    quote: {
      text: 'Roma le estaba recordando al científico su propia necesidad de rigurosidad intelectual, mientras Galileo defendía la apertura Agustina acerca del significado literal de las Escrituras... El conflicto surgió más del celo irreflexivo de Galileo por la ciencia y de las exigencias de la Iglesia de que una teoría debería ser sólida antes de tomarse como definitiva.',
      author: 'Christopher Decaen / Luis Fdo. Aragón',
      reference: 'Second Spring / InterSedes',
      page: '13-14'
    },
    keyTakeaway: 'Galileo no fue un mártir de la razón contra la fe; fue un episodio humano de orgullo metodológico y tensiones institucionales de época.',
    tags: ['Galileo Galilei', 'Decaen', 'Kepler', 'Mareas', 'San Agustín']
  },
  {
    id: 'caso-lavoisier',
    title: 'Contraste Histórico: Antoine Lavoisier y la Guillotina',
    subtitle: 'La ciencia sofocada por el totalitarismo político ilustrado, no por la religión',
    category: 'casos',
    x: 680,
    y: 970,
    level: 3,
    summary: 'El sesgo en la divulgación resalta el arresto domiciliario de Galileo a los 77 años en su villa toscana, pero silencia que el padre de la química moderna fue decapitado por el Estado revolucionario ilustrado en 1794.',
    analysis: [
      'Antoine Laurent de Lavoisier fue ejecutado a los 51 años por el Tribunal Revolucionario en París por su rol recaudador de impuestos, desestimando su genio con la frase: "La República no tiene necesidad de hombres sabios".',
      'Galileo nunca fue torturado ni ejecutado; murió de vejez en su casa recibiendo pensión papal.',
      'Demuestra que los mayores peligros de sofocación y aniquilación de la ciencia libre han venido históricamente de ideologías políticas, no de la Iglesia.'
    ],
    quote: {
      text: 'Esto contrasta con el hecho de que casi nadie sabe que Antoine Laurent Lavoisier fue sentenciado a muerte en 1794 por el Tribunal Revolucionario en Francia... Se argumentó en el momento que La República no tenía necesidad de hombres sabios. El de Lavoisier fue un claro caso en que la ciencia fue sofocada por la política, no por la religión.',
      author: 'Dr. Luis Fernando Aragón',
      reference: 'Revista InterSedes',
      page: '13'
    },
    keyTakeaway: 'El sesgo historiográfico culpa a la religión de lo que regímenes secularizados y políticos han cometido con mayor crueldad.',
    tags: ['Lavoisier', 'Revolución Francesa', 'Política vs Ciencia', 'Sesgo']
  },
  {
    id: 'debate-evolucion',
    title: 'La Controversia Evolucionista: Darwin y sus Frentes',
    subtitle: 'Tensiones multidireccionales: dentro de la ciencia y dentro de la teología',
    category: 'casos',
    x: 680,
    y: 1150,
    level: 2,
    summary: 'La publicación de El origen de las especies (1859) transformó a la ciencia de aliada de la teología natural a rival percibida, desatando debates internos tanto en la biología como en el cristianismo.',
    analysis: [
      'Darwin no sólo propuso la selección natural, sino que en "El origen del hombre" (1871) desafió la concepción del ser humano como criatura espiritual dotada de un estatus único a imagen de Dios.',
      'Tensión científica interna: la paleobiología y la teoría evolutiva han experimentado fraudes (el Hombre de Piltdown), debates de calibración temporal (Monte Verde) y disputas sobre la suficiencia de la selección natural.',
      'Tensión teológica interna: coexisten posiciones radicales como el Creacionismo de Tierra Joven (6.000 años, 6 días literales), lecturas metafóricas de Génesis, el Diseño Inteligente (Michael Behe, complejidad irreducible) y la Evolución Teísta.'
    ],
    quote: {
      text: 'Varios de los esfuerzos realizados a lo largo de los siguientes 120 años lesionaron la credibilidad del lado religioso... pero la mayoría de las críticas teológicas hacían eco de las objeciones que planteaban, desde adentro de la comunidad científica, los críticos empedernidos de Darwin (Roberts, 2010).',
      author: 'Jon H. Roberts / Luis Fdo. Aragón',
      reference: 'Religious Reactions to Darwin / InterSedes',
      page: '11-14'
    },
    keyTakeaway: 'El debate evolutivo no es una línea de trinchera simple; abarca ricas controversias empíricas y teológicas en constante evolución.',
    tags: ['Darwin', 'Origen de las Especies', 'Behe', 'Complejidad Irreducible', 'Génesis']
  },
  {
    id: 'magisterio-catolico-evolucion',
    title: 'Respuesta Magisterial: Humani Generis a Juan Pablo II',
    subtitle: 'Aceptación de la evolución biológica y rechazo al reduccionismo ontológico',
    category: 'casos',
    x: 680,
    y: 1330,
    level: 3,
    summary: 'La Iglesia Católica no condenó el evolucionismo biológico, pero estableció salvaguardas metafísicas cruciales para defender la dignidad trascendente del ser humano.',
    analysis: [
      'Pío XII (1950, Encíclica Humani Generis): declaró la evolución como hipótesis seria y respetable para la investigación empírica sobre el cuerpo humano.',
      'Juan Pablo II (1996, Mensaje a la Academia Pontificia): reconoció que la evolución es más que una simple hipótesis, pero enfatizó que considerar el espíritu humano como mero epifenómeno de la materia es incompatible con la verdad del hombre.',
      'Benedicto XVI y el Cardenal Schönborn criticaron el cientificismo: la ciencia explica la génesis material, pero la filosofía y teología explican el significado y destino humano.'
    ],
    quote: {
      text: 'Las teorías de la evolución que, debido a las filosofías que las inspiran, consideran el espíritu ya sea como emergente de las fuerzas de la materia viva, o como un simple epifenómeno de dicha materia, son incompatibles con la verdad acerca del hombre.',
      author: 'Papa Juan Pablo II',
      reference: 'Mensaje a la Pontificia Academia de las Ciencias',
      page: '16'
    },
    keyTakeaway: 'La Iglesia distingue entre el hecho biológico de la evolución y las extrapolaciones filosóficas materialistas que despojan al ser humano de su alma.',
    tags: ['Humani Generis', 'Pío XII', 'Juan Pablo II', 'Alma humana', 'Magisterio']
  },

  // ==========================================
  // COLUMNA 3: MODELO DEL DIÁLOGO (X: 1310)
  // ==========================================
  {
    id: 'dialogo-fundamentos',
    title: 'Modelo del Diálogo: Encuentro entre Iguales',
    subtitle: 'McGrath: Narrativas complementarias del «Cómo» empírico y el «Por qué» existencial',
    category: 'dialogo',
    x: 1310,
    y: 430,
    level: 1,
    summary: 'El diálogo reconoce que ninguna disciplina abarca la totalidad de la realidad. Ambas se necesitan mutuamente para comprender plenamente la condición humana y el cosmos.',
    analysis: [
      'Alister McGrath establece tres razones para el diálogo: 1) Ninguna ofrece una narrativa total; 2) Se complementan (la ciencia descubre los mecanismos "cómo", la religión el sentido y significado "por qué"); 3) La ciencia formula preguntas éticas y metafísicas que es incapaz de responder con su propio método.',
      'Juan Pablo II (1988) define el diálogo como una conversación entre iguales con respeto a la integridad propia: "Se nos pide que lleguemos a ser uno. No se nos pide que lleguemos a ser el otro".',
      'Purificación recíproca: La ciencia limpia a la religión de mitos, errores y supersticiones; la religión preserva a la ciencia de la idolatría tecnocrática, la soberbia y los falsos absolutos.'
    ],
    quote: {
      text: 'La ciencia puede purificar a la religión del error y la superstición; la religión puede purificar a la ciencia de la idolatría y los falsos absolutos. Cada una puede llevar a la otra a un mundo más amplio, un mundo en que ambas pueden prosperar... Se nos pide que lleguemos a ser uno. No se nos pide que lleguemos a ser el otro.',
      author: 'Papa Juan Pablo II / Alister McGrath',
      reference: 'Carta al Director del Observatorio Vaticano (1988)',
      page: '17-18'
    },
    keyTakeaway: 'El diálogo fructífero no busca asimilar ni diluir las disciplinas, sino enriquecer la comprensión global de la realidad.',
    tags: ['Diálogo', 'McGrath', 'Juan Pablo II', 'Cómo vs Por qué', 'Purificación Mutua']
  },
  {
    id: 'puentes-filosoficos-artigas',
    title: 'Los Puentes Filosóficos de Mariano Artigas',
    subtitle: 'La filosofía conecta ciencia y teología a través de tres presuposiciones nucleares',
    category: 'puentes',
    x: 1310,
    y: 610,
    level: 2,
    summary: 'El físico y filósofo Mariano Artigas (2001) propuso que el diálogo es posible porque la ciencia descansa sobre presuposiciones que ella no puede justificar experimentalmente, las cuales pertenecen a la filosofía y encuentran su raíz en la fe.',
    analysis: [
      'La ciencia no crea sus propios cimientos: requiere admitir a priori la racionalidad del mundo, la idoneidad de la mente cognoscente y la rectitud ética.',
      'Fenómeno de la "Retrojustificación": Conforme la ciencia avanza victoriosa, valida y amplía continuamente la veracidad de estas tres presuposiciones de fondo.',
      'El progreso científico, lejos de volver obsoletos estos puentes, los robustece y los orienta hacia el reconocimiento de un Creador.'
    ],
    quote: {
      text: 'El diálogo es posible, pero en vista de que estas dos áreas del saber son tan diferentes, se necesitan puentes filosóficos: debido a que la ciencia está fundamentada en presuposiciones que le permiten existir y que caen en el ámbito de la filosofía —la cual puede a su vez conectar la ciencia y la teología—.',
      author: 'Mariano Artigas',
      reference: 'The Mind of the Universe (Templeton Foundation Press)',
      page: '20-21'
    },
    keyTakeaway: 'La filosofía proporciona el lenguaje común y la arquitectura epistémica que enlaza la investigación empírica con la teología.',
    tags: ['Artigas', 'Puentes Filosóficos', 'The Mind of the Universe', 'Retrojustificación']
  },
  {
    id: 'presuposicion-ontologica',
    title: 'Presuposición Ontológica: El Orden Cósmico',
    subtitle: 'La naturaleza posee una inteligibilidad intrínseca y leyes racionales universales',
    category: 'puentes',
    x: 1310,
    y: 790,
    level: 3,
    summary: 'Para que exista el método científico, el universo debe ser un cosmos ordenado y no un caos caprichoso. Esta confianza ontológica nació históricamente de la teología de la Creación.',
    analysis: [
      'Responde a la célebre Pregunta de Joseph Needham: ¿Por qué la ciencia matemática moderna floreció en Occidente y no en China, India o el Islam, a pesar de sus inmensos avances técnicos?',
      'Stanley Jaki demostró que fue la concepción judeocristiana de un Dios soberano, único y racional lo que inculcó la convicción de leyes naturales estables y universales.',
      'Sin la presuposición de un orden racional subyacente, la deducción teórica y el experimento repetible carecerían de sentido.'
    ],
    quote: {
      text: 'La primera se refiere a la inteligibilidad o racionalidad de la naturaleza; se la puede clasificar como ontológica y está estrechamente relacionada con el orden natural... La creencia en un orden natural subyacente fue factor clave que promovió el desarrollo de la ciencia moderna.',
      author: 'Mariano Artigas / Stanley Jaki',
      reference: 'The Mind of the Universe / InterSedes',
      page: '10, 20'
    },
    keyTakeaway: 'El método científico presupone que la realidad tiene estructura inteligible: el cosmos es legible porque procede de una Mente creadora.',
    tags: ['Ontología', 'Inteligibilidad', 'Needham', 'Stanley Jaki', 'Orden Natural']
  },
  {
    id: 'presuposicion-epistemologica',
    title: 'Presuposición Epistemológica: Capacidad Cognitiva Humana',
    subtitle: 'Nuestra mente racional tiene la facultad de descifrar la estructura del cosmos',
    category: 'puentes',
    x: 1310,
    y: 970,
    level: 3,
    summary: 'Asume la correspondencia asombrosa entre las matemáticas formuladas por el intelecto humano y las pautas que rigen los fenómenos físicos de la naturaleza.',
    analysis: [
      'Del Ratzsch (2000) recuerda el pasaje bíblico: "Gloria de Dios es ocultar un asunto, y gloria de los reyes el investigarlo" (Proverbios 25:2).',
      'El mandamiento de Jesús de "Amar a Dios con toda la mente" (Mateo 22:37) consagra la vocación intelectual y científica como un acto de adoración y servicio.',
      'La capacidad de formular hipótesis, contrastarlas y modelar la naturaleza confirma la dignidad de la criatura humana dotada de razón.'
    ],
    quote: {
      text: 'La segunda se refiere a la capacidad humana de conocer el orden natural; se la puede clasificar como epistemológica e incluye las distintas formas de argumentación científica... El quehacer científico intelectualmente honesto es consistente con "amar a Dios con toda la mente".',
      author: 'Mariano Artigas / Del Ratzsch',
      reference: 'Science & its Limits / Mateo 22:37',
      page: '7, 20'
    },
    keyTakeaway: 'Nuestra facultad de conocer la naturaleza no es un accidente ciego; es el reflejo de la semejanza humana con el Logos creador.',
    tags: ['Epistemología', 'Razón', 'Proverbios 25:2', 'Mateo 22:37', 'Del Ratzsch']
  },
  {
    id: 'presuposicion-etica',
    title: 'Presuposición Ética: Los Valores de la Ciencia',
    subtitle: 'Rigor, honestidad intelectual, modestia, cooperación y servicio humano',
    category: 'puentes',
    x: 1310,
    y: 1150,
    level: 3,
    summary: 'La actividad científica no se autorregula sólo con fórmulas numéricas; requiere de un ethos moral inquebrantable que garantice la veracidad de los datos y el respeto a la verdad.',
    analysis: [
      'Artigas enfatiza que la ciencia exige virtudes morales: veracidad, objetividad, repudio del engaño, humildad ante la evidencia empírica y vocación de servicio.',
      'La ciencia empírica no puede deducir experimentalmente sus propios valores éticos; estos se fundamentan en la tradición humanista y teológica.',
      'El científico creyente encuentra en su fe un imperativo categórico para la transparencia, la justicia y el cuidado de los más necesitados.'
    ],
    quote: {
      text: 'La tercera se refiere a los valores implícitos en la actividad científica misma; se la puede clasificar como ética e incluye la búsqueda de la verdad, la rigurosidad, la objetividad, la modestia, el servicio a otras personas y la cooperación.',
      author: 'Mariano Artigas',
      reference: 'The Mind of the Universe',
      page: '20'
    },
    keyTakeaway: 'La ciencia es una empresa moral: la búsqueda de la verdad empírica exige virtudes éticas que el laboratorio presupone pero no engendra.',
    tags: ['Ética', 'Honestidad Intelectual', 'Servicio', 'Valores de la Ciencia']
  },

  // ==========================================
  // COLUMNA 4: MODELO DE INTEGRACIÓN (X: 1940)
  // ==========================================
  {
    id: 'raices-cristianas-ciencia',
    title: 'Raíces Cristianas de la Revolución Científica',
    subtitle: 'Los monjes, las universidades medievales y los dos libros de San Agustín',
    category: 'integracion',
    x: 1940,
    y: 430,
    level: 1,
    summary: 'Fue en el seno de la cristiandad occidental donde nacieron las universidades y floreció la ciencia moderna, motivada por la visión agustiniana del Libro de las Escrituras y el Libro de la Naturaleza.',
    analysis: [
      'Los monjes conservaron manuscritos clásicos durante el medioevo; la Iglesia patrocinó las primeras universidades en Bolonia, París y Oxford (siglo XII).',
      'Pioneros de la revolución científica como Johannes Kepler, Francis Bacon, Robert Boyle e Isaac Newton entendían su investigación como alabanza al Diseñador Supremo.',
      'Los Jesuitas plasmaron en sus constituciones la consigna de "buscar y encontrar a Dios en todas las cosas", impulsando las matemáticas y la astronomía.'
    ],
    quote: {
      text: 'Existen muchos ejemplos de científicos que poseían convicciones religiosas y que encontraron la confirmación de su fe en la belleza y elegancia de los mecanismos que descubrían sus investigaciones... buscaban a Dios en los dos libros de San Agustín: la Biblia y la Naturaleza.',
      author: 'John Hedley Brooke / Lawrence Principe',
      reference: 'Science and Secularization / Cambridge',
      page: '10, 21-22'
    },
    keyTakeaway: 'La ciencia moderna no nació a pesar del cristianismo, sino en su mismo hogar conceptual y con su aliento institucional.',
    tags: ['Revolución Científica', 'Kepler', 'Newton', 'San Agustín', 'Universidades']
  },
  {
    id: 'integracion-errores',
    title: 'Caminos Fallidos hacia la Integración',
    subtitle: 'El «Dios de las lagunas» y el abuso apologético del afinamiento fino',
    category: 'integracion',
    x: 1940,
    y: 610,
    level: 2,
    summary: 'El autor advierte con rigor contra los intentos ingenuos de fundamentar la fe en huecos del conocimiento empírico o en demostraciones deductivas forzadas.',
    analysis: [
      'El Dios de las lagunas: usar vacíos científicos temporales como prueba de Dios es una trampa mortal; Lucrecio ya advirtió en el s. I que cuando la ciencia explica el fenómeno, "los dioses se quedan sin trabajo".',
      'El Afinamiento Fino (Fine-Tuning) como prueba forzosa: aunque las constantes cósmicas (calculadas por Paul Davies) exhiben un balance asombroso para la vida, no constituyen una prueba matemática coactiva de un Dios personal.',
      'El Creacionismo pseudocientífico (geología del diluvio): distorsiona la exégesis bíblica y desprestigia el testimonio intelectual cristiano ante la comunidad académica.'
    ],
    quote: {
      text: 'Cuando los apologistas cristianos pusieron su confianza en una teología natural basada en la ciencia, sus esfuerzos tuvieron a menudo un resultado no deseado, ya sea porque propiciaron una respuesta atea o porque dependían, en forma dañina, de teorías obsoletas.',
      author: 'John Hedley Brooke / Mariano Artigas',
      reference: 'The Cambridge Companion / InterSedes',
      page: '23-25'
    },
    keyTakeaway: 'Fundamentar a Dios en las lagunas de la ciencia es suicida; Dios es el fundamento del orden entero del universo, no el parche de nuestra ignorancia.',
    tags: ['Dios de las lagunas', 'Fine-Tuning', 'Brooke', 'Paul Davies', 'Apologética']
  },
  {
    id: 'propuesta-aragon',
    title: 'Propuesta de Integración Personal del Investigador',
    subtitle: 'El quehacer científico como vocación divina sin esquizofrenia intelectual',
    category: 'integracion',
    x: 1940,
    y: 790,
    level: 3,
    summary: 'La síntesis propuesta por el Dr. Aragón une el rigor del laboratorio con la profundidad de la fe: la ciencia ilumina la maravilla de la creación y la fe nutre de sentido trascendente la vida del científico.',
    analysis: [
      'La ciencia ni demuestra deductivamente a Dios ni puede refutarlo: la ciencia se autolimita metodológicamente al mundo físico cuantificable.',
      'La fe cristiana se edifica sobre bases firmes: la revelación bíblica, la teología, la tradición de la Iglesia, la oración, la experiencia personal y la razón.',
      'Fides et Ratio (Juan Pablo II, 1998): "La fe no teme a la razón, sino que la busca y confía en ella".',
      'Mariano Artigas: El cultivo de la ciencia se transforma en una tarea humana con significado divino, asumida con gratitud y reverencia.'
    ],
    quote: {
      text: 'El quehacer científico adquiere un significado completamente nuevo y fascinante cuando lo vemos como una tarea que Dios nos ha confiado para que cada vez más participemos en su conocimiento y en su dominio sobre el mundo natural. Entonces, el cultivo de la ciencia se vuelve una tarea humana con significado divino.',
      author: 'Mariano Artigas / Dr. Luis Fernando Aragón',
      reference: 'The Mind of the Universe / InterSedes',
      page: '27-28'
    },
    keyTakeaway: 'La síntesis genuina ocurre en el corazón del científico: investigar es cooperar en los designios del Creador con honestidad y amor a la verdad.',
    tags: ['Fides et Ratio', 'Vocación', 'Artigas', 'Síntesis', 'Libertad de Creer']
  },
  {
    id: 'limites-bioetica',
    title: 'Límites Epistémicos y Desafíos Bioéticos',
    subtitle: 'La técnica empírica no puede dictar por sí sola sus imperativos morales',
    category: 'integracion',
    x: 1940,
    y: 970,
    level: 3,
    summary: 'Los colosales avances biotecnológicos (FIV, clonación, terapia génica, armamento) tienen poder para sanar o aniquilar; sus límites exigen la iluminación de la ética y la teología moral.',
    analysis: [
      'La ciencia descubre lo que "se puede hacer", pero no puede determinar lo que "se debe hacer".',
      'El reduccionismo cientificista pretende desterrar el juicio filosófico y religioso, dejando las decisiones éticas a merced del pragmatismo utilitarista o del poder político.',
      'La teología cristiana aporta una defensa incondicional de la dignidad sagrada de la vida humana desde su origen hasta su fin natural.'
    ],
    quote: {
      text: 'Son las aplicaciones prácticas y las extrapolaciones metafísicas de los descubrimientos científicos las que causan gran preocupación, debido al poder que tienen para sanar o matar, para liberar o esclavizar... Estas aplicaciones no pueden depender únicamente de la ciencia empírica. Debe existir también espacio para la contribución de la teología.',
      author: 'Dr. Luis Fernando Aragón / Juan Pablo II',
      reference: 'Revista InterSedes',
      page: '27'
    },
    keyTakeaway: 'La ciencia necesita la brújula moral de la teología y la filosofía para que el poder técnico permanezca siempre al servicio de la dignidad humana.',
    tags: ['Bioética', 'Límites Epistémicos', 'FIV', 'Clonación', 'Dignidad Humana']
  },

  // ==========================================
  // NIVEL FINAL: SÍNTESIS EPISTEMOLÓGICA CONCLUSIVA (X: 830)
  // ==========================================
  {
    id: 'sintesis-epistemologica',
    title: 'Síntesis Epistemológica Conclusiva (Dr. Luis Fdo. Aragón)',
    subtitle: 'La tensión intelectual honesta es motor de crecimiento mutuo y avance civilizatorio',
    category: 'central',
    x: 830,
    y: 1700,
    level: 0,
    summary: 'La verdadera interacción entre ciencia y fe no se resuelve en una aniquilación destructiva (conflicto) ni en un divorcio cobarde (independencia), sino en una tensión honesta, humilde y enriquecedora que fomenta el progreso de todo el saber.',
    analysis: [
      'El científico creyente no experimenta contradicción ontológica, sino una fructífera tensión existencial que estimula la rigurosidad empírica.',
      'La ciencia aporta claridad metodológica sobre el cómo del cosmos físico; la religión y la filosofía aportan el fundamento del sentido, la teleología y los límites éticos.',
      'Como concluye el Dr. Aragón: "No hay que temer a la verdad empírica ni a la fe trascendente: ambas provienen de la misma fuente última de inteligibilidad".'
    ],
    quote: {
      text: 'No existe una contradicción inherente entre ciencia y religión, sino una tensión esperable, saludable y fecunda... La tensión no es un mal a extirpar, sino la dinámica vital que mantiene a ambas despiertas y fieles a su vocación de buscar la verdad completa.',
      author: 'Dr. Luis Fernando Aragón',
      reference: 'Revista InterSedes, Vol. 18, No. 37',
      page: '28-29'
    },
    keyTakeaway: 'La ciencia y la fe se potencian recíprocamente: la razón sin fe cae en el nihilismo; la fe sin razón cae en la superstición.',
    tags: ['Síntesis', 'Tensión Dinámica', 'Verdad Integral', 'InterSedes', 'Aragón']
  }
];

export const CONCEPT_LINKS: ConceptLink[] = [
  // 1. Núcleo central a modelos
  { id: 'l1', source: 'core-tesis', target: 'tipologia-barbour', label: 'se organiza formalmente mediante', type: 'hierarchy' },
  { id: 'l2', source: 'tipologia-barbour', target: 'independencia-postulado', label: 'evalúa Modelo 1: Independencia', type: 'hierarchy' },
  { id: 'l3', source: 'tipologia-barbour', target: 'conflicto-mito', label: 'evalúa Modelo 2: Conflicto', type: 'hierarchy' },
  { id: 'l4', source: 'tipologia-barbour', target: 'dialogo-fundamentos', label: 'evalúa Modelo 3: Diálogo', type: 'hierarchy' },
  { id: 'l5', source: 'tipologia-barbour', target: 'raices-cristianas-ciencia', label: 'evalúa Modelo 4: Integración', type: 'hierarchy' },

  // 2. Columna 1: Independencia (flujo vertical directo sin cruces)
  { id: 'l6', source: 'independencia-postulado', target: 'independencia-critica', label: 'es refutado por', type: 'critique' },
  { id: 'l7', source: 'independencia-critica', target: 'juan-pablo-aislamiento', label: 'se constata socialmente en', type: 'bridge' },

  // 3. Columna 2: Conflicto (flujo vertical directo sin cruces)
  { id: 'l8', source: 'conflicto-mito', target: 'cosmovisiones-choque', label: 'desenmascara raíz en', type: 'critique' },
  { id: 'l9', source: 'cosmovisiones-choque', target: 'caso-galileo', label: 'evidenciado en juicio de', type: 'critique' },
  { id: 'l10', source: 'caso-galileo', target: 'caso-lavoisier', label: 'se contrasta históricamente con', type: 'contrast' },
  { id: 'l11', source: 'caso-lavoisier', target: 'debate-evolucion', label: 'analiza controversia de', type: 'hierarchy' },
  { id: 'l12', source: 'debate-evolucion', target: 'magisterio-catolico-evolucion', label: 'clarificado magisterialmente por', type: 'resolution' },

  // 4. Columna 3: Diálogo (flujo vertical directo sin cruces)
  { id: 'l13', source: 'dialogo-fundamentos', target: 'puentes-filosoficos-artigas', label: 'se cimenta sobre', type: 'bridge' },
  { id: 'l14', source: 'puentes-filosoficos-artigas', target: 'presuposicion-ontologica', label: 'puente 1: inteligibilidad del orden', type: 'bridge' },
  { id: 'l15', source: 'presuposicion-ontologica', target: 'presuposicion-epistemologica', label: 'puente 2: capacidad cognoscente', type: 'bridge' },
  { id: 'l16', source: 'presuposicion-epistemologica', target: 'presuposicion-etica', label: 'puente 3: virtudes y valores', type: 'bridge' },

  // 5. Columna 4: Integración (flujo vertical directo sin cruces)
  { id: 'l17', source: 'raices-cristianas-ciencia', target: 'integracion-errores', label: 'advierte desvíos de', type: 'critique' },
  { id: 'l18', source: 'integracion-errores', target: 'propuesta-aragon', label: 'depura y culmina en', type: 'resolution' },
  { id: 'l19', source: 'propuesta-aragon', target: 'limites-bioetica', label: 'aplica prudencia ética en', type: 'bridge' },

  // 6. Puentes horizontales limpios entre columnas adyacentes en el mismo nivel (CERO cruces)
  { id: 'l20', source: 'cosmovisiones-choque', target: 'puentes-filosoficos-artigas', label: 'se supera mediante', type: 'resolution' },
  { id: 'l21', source: 'presuposicion-ontologica', target: 'propuesta-aragon', label: 'hizo históricamente posible', type: 'bridge' }
];

export interface TourStep {
  step: number;
  nodeId: string;
  title: string;
  tagline: string;
  narrative: string;
}

export const GUIDED_TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    nodeId: 'core-tesis',
    title: '1. El Mito del Conflicto vs. Tensión Esperable',
    tagline: 'El punto de partida del Dr. Aragón',
    narrative: 'Lejos de ser enemigos irreconciliables, la ciencia y la fe viven una tensión saludable y productiva. La tensión empuja hacia el rigor y el crecimiento; el conflicto destructor solo surge cuando una busca aniquilar a la otra.'
  },
  {
    step: 2,
    nodeId: 'independencia-critica',
    title: '2. La Trampa de la Independencia',
    tagline: '¿Es posible "cada quien en lo suyo"?',
    narrative: 'Separar la ciencia y la fe en dos esferas que no se tocan parece cómodo, pero es una ficción. En la vida del científico creyente produce una esquizofrenia insoportable: no podemos encerrar la fe en un cajón al cruzar la puerta del laboratorio.'
  },
  {
    step: 3,
    nodeId: 'cosmovisiones-choque',
    title: '3. El Choque Real: Naturalismo vs. Teísmo',
    tagline: 'El fondo metafísico del debate',
    narrative: 'John Lennox desenmascara que la verdadera guerra nunca ha sido Ciencia vs. Religión, sino una lucha entre dos cosmovisiones metafísicas: el naturalismo materialista cerrado y la fe en un Dios Creador trascendente.'
  },
  {
    step: 4,
    nodeId: 'caso-galileo',
    title: '4. Galileo y Darwin: Historias Revisitadas',
    tagline: 'Desarmando los tópicos simplistas',
    narrative: 'El caso Galileo no fue un choque de ciencia contra fe ciega, sino un conflicto de celo metodológico y teorías de mareas erradas; Lavoisier fue guillotinado por el Estado secular; y en Darwin, la Iglesia Católica aceptó la evolución biológica.'
  },
  {
    step: 5,
    nodeId: 'puentes-filosoficos-artigas',
    title: '5. Los Puentes de Mariano Artigas',
    tagline: 'Ontología, Epistemología y Ética',
    narrative: 'La ciencia necesita tres cimientos que no puede demostrar con tubos de ensayo: que el cosmos es racional (ontología), que nuestra mente puede entenderlo (epistemología) y que la verdad debe buscarse con honestidad (ética).'
  },
  {
    step: 6,
    nodeId: 'propuesta-aragon',
    title: '6. La Integración Personal del Investigador',
    tagline: 'Investigar como vocación divina',
    narrative: 'La verdadera armonía no ocurre en pactos políticos, sino en la persona: investigar el cosmos es colaborar con el Creador. Fe y razón son, como dijo Juan Pablo II, las dos alas con las que el espíritu humano se eleva a la verdad.'
  }
];

export interface ComparativeModel {
  model: string;
  categoryKey: 'independencia' | 'conflicto' | 'dialogo' | 'integracion';
  postulate: string;
  argumentsFor: string;
  critiquesAndLimits: string;
  verdictAuthor: string;
}

export const COMPARATIVE_MATRIX: ComparativeModel[] = [
  {
    model: 'Independencia',
    categoryKey: 'independencia',
    postulate: 'Ciencia y religión ocupan esferas de pensamiento estrictamente separadas, autónomas y mutuamente excluyentes (NOMA, Stephen Jay Gould / NAS).',
    argumentsFor: 'Preserva la autonomía metodológica, evita interferencias ilegítimas y asegura una paz pragmática sin invadir competencias ajenas.',
    critiquesAndLimits: 'Inviable en la práctica para el investigador creyente: provoca "esquizofrenia intelectual" (Coulson, Lewis). Juan Pablo II advierte que las opciones reales no incluyen el aislamiento.',
    verdictAuthor: 'Insostenible: mutila la experiencia unificada del científico y contradice la tendencia interdisciplinaria de la ciencia moderna.'
  },
  {
    model: 'Conflicto',
    categoryKey: 'conflicto',
    postulate: 'Guerra perenne e irreconciliable entre la racionalidad científica y el dogma religioso, donde una debe vencer o erradicar a la otra.',
    argumentsFor: 'Impulsado por el reduccionismo cientificista y los creacionismos fundamentalistas que rechazan los datos empíricos de la naturaleza.',
    critiquesAndLimits: 'Mito propagandístico forjado en el siglo XIX por Draper y White, refutado por historiadores como Harrison y Lindberg. El choque real es metafísico: naturalismo versus teísmo (Lennox).',
    verdictAuthor: 'Falso estereotipo histórico: oscurece que la ciencia moderna nació y fue activamente patrocinada dentro de la cristiandad.'
  },
  {
    model: 'Diálogo',
    categoryKey: 'dialogo',
    postulate: 'Encuentro respetuoso y conversación entre iguales: narrativas complementarias del "cómo" empírico y el "por qué" de sentido existencial (McGrath).',
    argumentsFor: 'Purificación recíproca (Juan Pablo II: la ciencia libra a la religión del error; la religión libra a la ciencia de la idolatría). Articulado mediante los puentes de Artigas.',
    critiquesAndLimits: 'Requiere evitar la confusión metodológica: no se pide llegar a ser el otro, sino colaborar con rigor desde identidades claras.',
    verdictAuthor: 'Altamente fecundo: la ciencia descansa en presuposiciones filosóficas (orden cósmico, capacidad de conocer, valores éticos) que ella misma no puede demostrar.'
  },
  {
    model: 'Integración',
    categoryKey: 'integracion',
    postulate: 'Articulación armónica de ambos saberes en la vida y vocación del científico, orientando el avance técnico hacia el bien de la persona (Fides et Ratio).',
    argumentsFor: 'Resonancia profunda con los dos libros de San Agustín (Biblia y Naturaleza) que motivaron a Kepler, Boyle y Newton. Da sentido trascendente al laboratorio.',
    critiquesAndLimits: 'Debe evitar caminos fallidos: el suicida "Dios de las lagunas", el abuso apologético del Fine-Tuning y el fundamentalismo literalista.',
    verdictAuthor: 'La meta más madura: investigar es cooperar en los designios de Dios con humildad intelectual y reverencia ante la verdad completa.'
  }
];
