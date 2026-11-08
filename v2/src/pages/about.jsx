// About the Castleshaw Centre: place, people, standards, reputation and 130 years of history.
import { PageTop, Band, SectionHead, OnThisPage, Split, Ticks, Ledger, TileLinks, Gallery, Quote, Quotes, People, Timeline, Downloads, LinkList, Callout, CtaBand, SqLink, Btn, TBC, img, gal, shared, OLD } from '../ui/inner/blocks'
import { href, ADDRESS, W3W } from '../data'

const ab = (k = '') => href(`about/${k}`)
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Castleshaw+Centre+OL3+5LZ'

/* ------------------------------------------------------------------ hub */
export function Hub({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="About the Castleshaw Centre"
        lead="Oldham Council's Outdoor and Environmental Education service, in a stone building at the top of the Castleshaw Valley that has welcomed Oldham's children since 1895."
        image={{ src: img('history-building-now'), alt: 'The Castleshaw Centre today, a stone building behind a green field' }}
      />
      <Band>
        <SectionHead eyebrow="About the centre" title="At a glance" />
        <Ledger items={[
          ['1895', 'the year the first Oldham children came to stay'],
          ['10,000', 'visitors of all ages every year'],
          ['38', 'beds, and a camping field'],
          ['2020', 'an Ambassador Centre for the Peak District National Park'],
        ]} />
      </Band>
      <Band tone="sky">
        <SectionHead title="More about us" />
        <TileLinks items={[
          { title: 'Where we are', href: ab('where-we-are/'), img: img('valley-reservoir'), text: 'In the South Pennines, at the edge of the Peak District, six miles from Oldham.' },
          { title: 'Our team', href: ab('our-team/'), img: img('team-matt'), text: 'Tutors, advisers and the people who keep the centre running.' },
          { title: 'Accreditation and safety', href: ab('accreditation/'), img: img('land-climbing-wall'), text: 'AALA licensed, LOtC Quality Badge and Adventuremark.' },
          { title: 'What people say', href: ab('what-people-say/'), img: gal('g-6315479'), text: 'Schools, parents, groups and inspectors, plus the Hall of Fame.' },
          { title: 'Our history', href: ab('history/'), img: img('history-1895'), text: 'From a holiday home for poor children to an outdoor centre.' },
          { title: 'News', href: href('news/'), img: img('news-roof'), text: 'What has been happening at Castleshaw.' },
        ]} />
      </Band>
      <CtaBand />
    </>
  )
}

/* ------------------------------------------------------------------ where we are */
export function Where({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Where we are"
        lead="In the South Pennines, at the edge of the Peak District National Park, about six miles from Oldham town centre."
        image={{ src: img('valley-reservoir'), alt: 'A reservoir in a green valley below the moors' }}
        actions={<><a className="ib ib-ink" href={MAPS} rel="noopener">Open in maps</a><a className="ib ib-line" href={`https://what3words.com/${W3W}`} rel="noopener">what3words</a></>}
      />
      <Band>
        <SectionHead eyebrow="About the centre" title="Finding us" />
        <div className="cols cols-2">
          <div className="icard">
            <h3>Address</h3>
            <address className="addr">The Castleshaw Centre<br />{ADDRESS.join(', ')}</address>
            <p>what3words: <a href={`https://what3words.com/${W3W}`} rel="noopener">///{W3W}</a></p>
            <p>We are handy for groups from Manchester, Rochdale, Tameside, Huddersfield and Leeds.</p>
          </div>
          <div className="icard">
            <h3>Getting here</h3>
            <TBC block>Directions from the M62 and from Oldham, coach access and the drop-off point, parking, and the nearest bus and train stops.</TBC>
          </div>
        </div>
      </Band>
      <Band tone="sage">
        <Split image={{ src: img('valley-bridge'), alt: 'A footbridge over a moorland stream in the valley' }} heading="Around the valley">
          <p>We are surrounded by lanes, footpaths and bridleways with excellent public access, a Roman fort, reservoirs and the open moor.</p>
          <p><SqLink href={ab('where-we-are/around-the-valley/')}>Walks, rides and places to visit</SqLink></p>
        </Split>
      </Band>
      <CtaBand title="Planning a visit?" />
    </>
  )
}

/* ------------------------------------------------------------------ around the valley */
export function Valley({ path }) {
  return (
    <>
      <PageTop
        path={path}
        tone="sage"
        title="Around the valley"
        lead="Lanes, footpaths and bridleways, a Roman fort, the Pennine tops and Dovestone Reservoir, all close to the centre."
        image={{ src: img('valley-obelisk'), alt: 'A group resting at the foot of the war memorial obelisk on the moor' }}
      />
      <Band>
        <SectionHead eyebrow="Where we are" title="Routes and places to visit" />
        <div className="cols cols-3">
          <div className="icard"><h3>Castleshaw Roman Fort</h3><p>The remains of the fort are a short walk from the centre. There are information boards at the site, and more from the Friends of Castleshaw Roman Forts.</p><p><a href="http://www.castleshawarchaeology.co.uk/" rel="noopener">Castleshaw archaeology</a></p></div>
          <div className="icard"><h3>The Castleshaw Quest</h3><p>An adventure walk for younger walkers around the lower Castleshaw reservoir.</p></div>
          <div className="icard"><h3>The Saddleworth Walk</h3><p>For the more adventurous, a 10 to 12km walk from Delph, through the centre&rsquo;s grounds, up to the top of the Pennines and down into the Diggle valley. It isn&rsquo;t quite circular: allow 2km back to Delph along the Delph Donkey bridleway or through Dobcross.</p><p><a href="https://www.discoveringbritain.org/content/discoveringbritain/walk%20booklets/Saddleworth%20walk%20-%20written%20guide.pdf" rel="noopener">Route guide (Discovering Britain)</a></p></div>
          <div className="icard"><h3>The Oldham Way</h3><p>A waymarked trail of about 40 miles around the borough. A version of it is used for the Oldham Way Ultra, which starts and finishes at the centre.</p></div>
          <div className="icard"><h3>Pennine Bridleway and the Diggle Jiggle</h3><p>A 17km mountain bike route on local lanes and bridleways, including the Pennine Bridleway through the Castleshaw Valley.</p><p><a href="http://www.nationaltrail.co.uk/pennine-bridleway/route/try-trail-bike-diggle-jiggle" rel="noopener">Diggle Jiggle (National Trail)</a></p></div>
          <div className="icard"><h3>Dovestone Reservoir</h3><p>A few miles away, and now managed by the RSPB. A favourite for walks and wildlife.</p><p><a href="https://www.rspb.org.uk/days-out/reserves/dove-stone" rel="noopener">Dove Stone (RSPB)</a></p></div>
        </div>
      </Band>
      <Band tone="sky">
        <SectionHead title="Out walking?">
          <p>Most routes cross farmland, so please be considerate, keep dogs on leads and take your litter home. Routes shared by the public, such as those on <a href="https://www.outdooractive.com/en/search/?q=castleshaw" rel="noopener">outdooractive</a>, are not checked by us.</p>
        </SectionHead>
      </Band>
    </>
  )
}

/* ------------------------------------------------------------------ team */
export function Team({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Our team"
        lead="Tutors who hold national governing body awards and, almost all of them, teaching qualifications too, with the office and site team who keep the centre running."
        image={{ src: img('team-joseph-2'), alt: 'Joseph Myhill, centre manager, smiling beside a mountain lake' }}
      />
      <Band>
        <SectionHead eyebrow="About the centre" title="Staff" />
        <People items={[
          { name: 'Joseph Myhill', role: 'Centre manager', img: img('team-joseph-2'), alt: 'Joseph Myhill' },
          { name: 'Rod Steele', role: 'Senior tutor', img: shared('team/rod-steele'), alt: 'Rod Steele' },
          { name: 'Matt O’Grady', role: 'Tutor', img: img('team-matt'), alt: 'Matt O’Grady' },
          { name: 'Janet Lloyd', role: 'Business support officer', img: img('team-janet'), alt: 'Janet Lloyd' },
        ]} />
      </Band>
      <Band tone="sky">
        <SectionHead title="Part-time staff" />
        <People items={[
          { name: 'Guy Fox-Kelly', img: img('team-guy-fk'), alt: 'Guy Fox-Kelly' },
          { name: 'Gill Howarth', img: img('team-gill'), alt: 'Gill Howarth' },
          { name: 'Chiron Turner', img: img('team-chiron'), alt: 'Chiron Turner' },
          { name: 'Ian Bajorski', img: img('team-ian'), alt: 'Ian Bajorski' },
          { name: 'Guy Froud', img: img('team-guy-f'), alt: 'Guy Froud' },
          { name: 'Kate O’Regan', img: img('team-kate'), alt: 'Kate O’Regan' },
        ]} />
        <TBC block>That this team list is current, and a line on each person&rsquo;s role and specialisms.</TBC>
      </Band>
      <Band tone="sage">
        <SectionHead title="Educational visits advisers">
          <p>Rod and Joseph also run Oldham&rsquo;s educational visits advice service.</p>
          <p><SqLink href={href('advice-and-guidance/') + '#advisers'}>Our advisers</SqLink></p>
        </SectionHead>
      </Band>
      <CtaBand />
    </>
  )
}

/* ------------------------------------------------------------------ accreditation */
export function Accreditation({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Accreditation and safety"
        lead="The centre is inspected regularly by the Adventure Activities Licensing Authority and the Council for Learning Outside the Classroom, and every activity is risk assessed by competent staff."
        image={{ src: img('land-abseil-2'), alt: 'A young person in a blue helmet abseiling down a rock face' }}
      />
      <Band>
        <SectionHead eyebrow="About the centre" title="Licences and awards" />
        <div className="cols cols-3">
          <div className="icard"><h3>AALA licence</h3><p>Licensed by the Adventure Activities Licensing Authority, part of the Health and Safety Executive, for climbing, watersports and trekking.</p><p>Licence <TBC>L71687 or L137899</TBC></p></div>
          <div className="icard"><h3>LOtC Quality Badge</h3><p>The Learning Outside the Classroom Quality Badge, the national award for providers of learning outside the classroom.</p><p>Badge number 101040</p></div>
          <div className="icard"><h3>Adventuremark</h3><p>For adventure activities and age groups outside the scope of AALA licensing, also inspected by the Council for Learning Outside the Classroom.</p></div>
        </div>
        <Downloads items={[
          { title: 'LOtC Quality Badge certificate, December 2023', href: OLD + 'lotc_qb_certificate_dec_2023_101040_castleshaw_centre.pdf', meta: 'PDF, 831 KB' },
          { title: 'AALA licence', href: OLD + 'r0443_aala_licence_oldham_council_l71687.pdf', meta: 'PDF, 135 KB' },
        ]} />
      </Band>
      <Band tone="sky">
        <SectionHead title="From our inspection reports" />
        <Quotes items={[
          { text: 'The session observed set a distinct standard in how orienteering can be delivered using a wide array of resources, including IT, to Year 1 primary students.', by: 'LOtC inspection, November 2023' },
          { text: 'Accommodation is of a good standard and the centre has a welcoming and friendly feel to those staying, and the consistent staff team contributes positively to the experience.', by: 'LOtC inspection, November 2023' },
          { text: 'This was an excellent session with a good mix of adventure allied to educational content.', by: 'AALA session observation, ghyll scrambling at Dovestone Reservoir, May 2014' },
          { text: 'Castleshaw is a lovely centre in a fantastic rural location. It is well resourced both on and off site and works with a highly qualified staff team.', by: 'LOtC inspection, October 2015' },
          { text: 'The centre staff are not only highly technically qualified, but all of them have some form of educational qualifications.', by: 'LOtC initial inspection, October 2009' },
        ]} />
      </Band>
      <Band>
        <Split image={{ src: img('water-canoe-calm'), alt: 'A lone paddler in a canoe on a calm reservoir at dusk' }} heading="How we keep visits safe">
          <Ticks items={['Every activity is risk assessed by competent staff', 'Instructors hold national governing body awards for the activities they lead', 'Staff-to-participant ratios set for each activity', 'All specialist equipment provided and checked', 'Practice in line with OEAP National Guidance and HSE advice on school trips']} />
          <p><SqLink href={href('activities/plan-your-visit/') + '#group-leaders'}>Information for group leaders</SqLink></p>
        </Split>
      </Band>
      <CtaBand />
    </>
  )
}

/* ------------------------------------------------------------------ what people say */
export function Say({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="What people say"
        lead="A few words from the schools, families and groups who visit, and a wall of the drawings and letters children send us afterwards."
        image={{ src: gal('g-6315479'), alt: 'A child’s painting of hills, a stream and a bridge with the words Thank you Rod', shape: 'soft' }}
      />
      <OnThisPage items={[
        { id: 'primary-schools', label: 'Primary schools' },
        { id: 'secondary-and-specialist', label: 'Secondary and specialist' },
        { id: 'families-and-groups', label: 'Families and groups' },
        { id: 'hall-of-fame', label: 'Hall of Fame' },
        { id: 'inspection-reports', label: 'Inspection reports' },
      ]} />
      <Band id="primary-schools">
        <SectionHead eyebrow="What people say" title="Primary schools" />
        <Quotes items={[
          { text: 'One of the highlights was jumping in puddles! Something that they are often prevented from doing, but because of appropriate outdoor clothing it was not a problem.', by: 'Thorp Primary, Year 1' },
          { text: 'It is always a time in Year 2 that the children highlight at the end of the year. Thank you!', by: 'Richmond Academy, Year 2 habitats' },
          { text: 'I’ve been visiting Castleshaw for 18 years, and this is the best residential experience I have had. The children developed a great deal of confidence and thoroughly enjoyed themselves.', by: 'St Hilda’s Primary, residential' },
          { text: 'These children do not get these experiences in day to day life so it is invaluable.', by: 'Yew Tree Community School, Year 5 team building' },
          { text: 'Excellent trip as always. Very patient with reception children!', by: 'St Annes RC, Greenacres' },
          { text: 'Absolutely brilliant. Most children would not have got this opportunity with their families.', by: 'Freehold, Year 6 activity residential' },
        ]} />
      </Band>
      <Band tone="sky" id="secondary-and-specialist">
        <SectionHead title="Secondary and specialist groups" />
        <Quotes items={[
          { text: 'Our aims were to build relationships and get to know each other. The course was really effective. It was nice to see students laughing together all day.', by: 'Royton and Crompton, Year 7 team building' },
          { text: 'Staff provided careful accessible information and took time to build confidence in students. They loved it.', by: 'Visual Impairment Service residential' },
        ]} />
      </Band>
      <Band tone="sage" id="families-and-groups">
        <SectionHead title="Families and other groups" />
        <Quotes items={[
          { text: 'Best day ever!', by: 'A parent, after the Summer Holiday Club' },
          { text: 'Excellent venue in a beautiful location. Great communication throughout.', by: 'Manchester Hash House Harriers, accommodation only' },
        ]} />
      </Band>
      <Band id="hall-of-fame">
        <SectionHead title="The Hall of Fame">
          <p>Drawings, posters and letters sent to us after visits.</p>
        </SectionHead>
        <Gallery images={[
          { src: gal('g-6315479'), alt: 'A painting of hills, a stream and a bridge with the words Thank you Rod' },
          { src: gal('g-5743290'), alt: 'A hand-made poster: Castleshaw Centre, it is amazing, have a lovely walk with friends, come and see the animals' },
          { src: gal('g-2127949'), alt: 'A drawing of a green hill with a gateway and the word Castleshaw' },
          { src: gal('g-3478808'), alt: 'A typed thank-you letter from Year 6 pupils about canoeing, climbing and orienteering' },
          { src: gal('g-7160946'), alt: 'A colourful crayon drawing of a rainbow over a hill' },
          { src: gal('g-8159649'), alt: 'A drawing of a goat beside a gate' },
          { src: gal('g-9879036'), alt: 'A poster titled Castleshaw Weekend, made from photos of caving and climbing' },
          { src: gal('g-6222095'), alt: 'A handwritten letter decorated with drawings of flowers and animals' },
          { src: gal('g-5074829'), alt: 'A pencil drawing of a figure on top of a hill' },
          { src: gal('g-7378642'), alt: 'A handwritten letter on paper with a rainbow border' },
        ]} />
      </Band>
      <Band tone="paper" id="inspection-reports">
        <SectionHead title="From our inspection reports" />
        <Quote big text="The session observed set a distinct standard in how orienteering can be delivered." by="LOtC inspection, November 2023" />
        <p><SqLink href={ab('accreditation/')}>More from our inspection reports</SqLink></p>
      </Band>
      <CtaBand title="Come and see for yourself" />
    </>
  )
}

/* ------------------------------------------------------------------ history */
export function History({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Our history"
        lead="Castleshaw has been part of Oldham's provision for children for more than 130 years: a holiday home, a sanatorium school, a camp school and now an outdoor centre."
        image={{ src: img('history-postcard'), alt: 'An old postcard of the stone building behind a tree, captioned Oldham Poor Children’s Holiday Home', shape: 'soft' }}
      />
      <Band>
        <SectionHead eyebrow="About the centre" title="Timeline" />
        <Timeline items={[
          {
            years: '1895 to 1916', title: 'Oldham Poor Children’s Holiday Association',
            body: <>
              <p>The association was founded in June 1893 to give Oldham&rsquo;s &ldquo;necessitous children&rdquo; a holiday. On 20 May 1895 it leased a country cottage on the Corporation estate at Castleshaw, so poor and delicate children could stay for two or three weeks at a time. It held eight or ten children at once, and 88 stayed between June and October that year.</p>
              <blockquote>&ldquo;The fortnight, in several cases, had made pallid cheeks rosy and plump.&rdquo; <cite>Annual report, 1896</cite></blockquote>
              <p>The building was extended and heated over the following years. Winston Churchill was a donor while he was MP for Oldham, from 1901 to 1904.</p>
            </>,
            images: [{ src: img('history-1895'), alt: 'An early photograph of the holiday home behind a tree' }],
          },
          {
            years: '1917 to 1936', title: 'Oldham Corporation Sanatorium School',
            body: <>
              <p>In 1915 Oldham Corporation decided to build an open air school for delicate children, but wartime limits on borrowing got in the way. Instead, Dame Sarah Lees, Mayor of Oldham in 1910, paid the &pound;800 to buy and renovate the Castleshaw house, which then had beds for 22 girls.</p>
              <p>Edith Omerod, a pupil in 1929 and 1930, remembered lessons in groups of four, nature study among the birds&rsquo; nests and flowers, letters home every Wednesday, and potato pie on Wednesdays. Less fondly, an egg cup of Epsom salts before breakfast on Sundays.</p>
            </>,
            images: [
              { src: img('history-sarah-lees'), alt: 'A portrait of Dame Sarah Lees' },
              { src: img('history-plaque'), alt: 'A brass plaque recording the building’s gift to Oldham Corporation by Alderman Sarah Lees as a sanatorium school' },
              { src: img('history-group-old'), alt: 'An old photograph of girls in pinafores lined up outside the building' },
            ],
          },
          {
            years: '1937 to 1979', title: 'Castleshaw Camp School',
            body: <>
              <p>With a new sanatorium day school open in Oldham, Castleshaw became a camp school. Alderman Frank Lord, later Sir Frank, paid for the renovation. After the Second World War the town&rsquo;s youth organiser, Ralph Whitehead, restored it as a residential centre for Oldham&rsquo;s youth clubs with sixth form volunteers and ex-army furniture. Joseph and Emily Higham became the first resident warden and cook, and new dormitories in 1958 meant boys and girls could stay at the same time.</p>
              <blockquote>&ldquo;When CSE and GCE were combined, I was chair of the new combined panel, and field studies became compulsory for all students.&rdquo; <cite>Jack Schofield, a former volunteer and teacher, 2010</cite></blockquote>
            </>,
            images: [
              { src: img('history-frank-lord'), alt: 'A portrait of Sir Frank Lord' },
              { src: img('history-camp-building'), alt: 'The camp school building with an outside staircase' },
              { src: img('history-greenhill-girls'), alt: 'A group photograph of Greenhill Grammar School girls, 1961' },
            ],
          },
          {
            years: '1980 to today', title: 'Castleshaw Outdoor and Environmental Education Centre',
            body: <>
              <p>Renovated again, the centre reopened in May 1980 as a day centre, with St Hilda&rsquo;s Primary the first group through the door. By 1990 it was residential again, with Alt Primary the first to stay overnight. A Best Value Review in 2000 called it a valuable resource for the borough, and a National Lottery grant in 2004 paid for improvements, including better wheelchair access.</p>
              <p>A climbing tower followed in 2007, an artificial caving system in 2011 and a yurt in 2012, along with ducks, rabbits, hens, geese, pigs and goats. Today around 10,000 people visit every year.</p>
            </>,
            images: [{ src: img('history-building-now'), alt: 'The Castleshaw Centre today' }],
          },
        ]} />
      </Band>
      <Band tone="sky" id="back-in-the-day">
        <SectionHead title="Back in the day">
          <p>Photographs from the centre&rsquo;s archive.</p>
        </SectionHead>
        <Gallery images={[
          { src: img('arch-1960-class'), alt: 'A 1960s classroom with pupils at desks and a teacher at the blackboard' },
          { src: img('arch-bonfire'), alt: 'A black and white photograph of children round a bonfire' },
          { src: img('arch-building'), alt: 'A large group of children in front of the centre' },
          { src: img('arch-canoes'), alt: 'Kayakers on a river below the moors' },
          { src: img('arch-tent'), alt: 'Children pitching an orange tent' },
          { src: img('arch-girls'), alt: 'A black and white photograph of girls dressed up for a party' },
          { src: img('arch-raft'), alt: 'Children paddling a raft of barrels on a river' },
          { src: img('arch-snow'), alt: 'Two walkers crossing deep snow on the hills' },
          { src: img('arch-climb'), alt: 'A climber on a rock face' },
          { src: img('arch-1960-dorm'), alt: 'Children in a dormitory in the 1960s' },
          { src: img('arch-hill'), alt: 'Children in waterproofs climbing a steep grassy bank' },
          { src: img('arch-bw-stream'), alt: 'A black and white photograph of children studying a stream' },
        ]} />
      </Band>
      <Band id="nick-price">
        <Split image={{ src: img('team-nick'), alt: 'Nick Price, smiling, in a fleece' }} shape="soft" heading="Remembering Nick Price, 1958 to 2016">
          <p>Almost anyone who visited Castleshaw this century will have seen, or heard, Nick around the centre and its grounds. Thousands of young people and their teachers benefited from his knowledge, professionalism and experience over 16 years.</p>
          <p>We always joked that his size 12s would be big shoes to fill. We never expected the time to come so soon.</p>
        </Split>
      </Band>
    </>
  )
}
