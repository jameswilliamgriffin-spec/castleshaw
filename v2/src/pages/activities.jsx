// Activities and school visits. Copy is drawn from the centre's own pages
// (adventurous activities, curriculum, team building, booking, kit lists, testimonials).
import { PageTop, Band, Intro, Split, Ticks, Ledger, TileLinks, ActivityList, Gallery, Quote, Quotes, Downloads, LinkList, Kit, Callout, CtaBand, AdviceNote, SqLink, SectionHead, Btn, TBC, img, shared, OLD } from '../ui/inner/blocks'
import { href, PHONE, PHONE_HREF } from '../data'

const at = (k) => href(`activities/${k}/`)

// The practical facts for an activity page, as one calm strip beside what to bring.
function AtAGlance({ ages = 'Suitable ages', length = 'Session lengths (half or full day)', price = 'Prices', bring }) {
  return (
    <div className="glance-wrap">
      <h2 className="h2i glance-h">At a glance</h2>
      <dl className="glance">
        <div><dt>Who it suits</dt><dd><TBC>{ages}</TBC></dd></div>
        <div><dt>How long</dt><dd><TBC>{length}</TBC></dd></div>
        <div><dt>Cost</dt><dd><TBC>{price}</TBC><p>Oldham schools may be covered by a Service Level Agreement. <a href={at('plan-your-visit') + '#booking'}>How booking works</a></p></dd></div>
      </dl>
      {bring}
    </div>
  )
}

/* ------------------------------------------------------------------ hub */
export function Hub({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Activities and school visits"
        lead="Adventure, field studies, history days and team building in the Castleshaw Valley. Every visit can be a day or a residential, and every programme is shaped around what your group came to learn."
        image={{ src: img('water-canoe-reflect'), alt: 'Two people paddling a canoe across a still reservoir that reflects the moorland hills' }}
        actions={<><Btn href={at('plan-your-visit')}>Plan your visit</Btn><a className="ib ib-line" href={PHONE_HREF}>Call {PHONE}</a></>}
      />
      <Band>
        <TileLinks items={[
          { title: 'Adventure on land', href: at('adventure-on-land'), img: img('land-ghyll-waterfall'), text: 'Ghyll scrambling, climbing, abseiling, caving, hill walking and orienteering.' },
          { title: 'Adventure on water', href: at('adventure-on-water'), img: img('water-kayak-green'), text: 'Kayaking, canoeing, rafting and paddleboarding on reservoir water.' },
          { title: 'Environmental education', href: at('environmental-education'), img: img('env-stream'), text: 'Science and geography days and secondary field studies, outdoors.' },
          { title: 'Roman and local history', href: at('roman-history'), img: img('roman-formation'), text: 'A Roman fort down the lane, mills, weavers and Victorian Delph.' },
          { title: 'Bushcraft', href: at('bushcraft'), img: img('bushcraft-fire'), text: 'Shelters, fires and campcraft.' },
          { title: 'Team building', href: at('team-building'), img: img('team-high-ropes'), text: 'For primary classes, secondary groups and adult away days.' },
        ]} />
      </Band>
      <Band tone="sky">
        <Intro heading="A day or a residential">
          <p>Courses at Castleshaw extend what your curriculum can offer and give young people experiences they may not otherwise have. They can be day visits or residential stays, and that choice is usually made by school staff.</p>
          <p>We can design an individual course, but it&rsquo;s generally best to choose topics that make the most of where we are. In our words: Roman history would be better than Egyptian history.</p>
          <p><a href={at('plan-your-visit')}>How to plan and book a visit</a></p>
        </Intro>
        <Ledger items={[
          ['10,000', 'people of all ages visit each year'],
          ['38', 'beds for residential groups'],
          ['AALA', 'licensed for climbing, watersports and trekking'],
          ['LOtC', 'Quality Badge for learning outside the classroom'],
        ]} />
      </Band>
      <Band>
        <div className="cols cols-3">
          <div className="icard">
            <h3>Primary schools</h3>
            <p>Geography, history, science and team building days, from Reception to Year 6, tailored to your class.</p>
            <Ticks items={['Habitats, minibeasts and pond dipping', 'Mapwork and orienteering', 'Romans, Victorians and the Industrial Revolution', 'Contrasting localities and rivers']} />
          </div>
          <div className="icard">
            <h3>Secondary schools</h3>
            <p>Whether it&rsquo;s a full training programme for an award or safety cover for your own plans, we design it around your group.</p>
            <Ticks items={['Geography, history and science field studies', 'PE and sport, including GCSE and BTEC units', 'Team building and PSHE', <a key="d" href={href('courses-and-clubs/outdoor-awards/')}>Duke of Edinburgh&rsquo;s Award</a>]} />
          </div>
          <div className="icard">
            <h3>Youth and adult groups</h3>
            <p>Youth services, community groups and staff teams use Castleshaw for activity days, residentials and away days.</p>
            <Ticks items={['Away days for staff teams', 'Youth service residentials', 'The Oldham Linked Schools project', <a key="s" href={href('stay/')}>Accommodation only, if you run your own programme</a>]} />
          </div>
        </div>
      </Band>
      <Band tone="ink">
        <Quote big text="Absolutely brilliant. Most children would not have got this opportunity with their families." by="Freehold, Year 6 activity residential" />
      </Band>
      <AdviceNote />
      <CtaBand title="Tell us who is coming and what you would like to do" text="Once we have agreed a programme, we email the group leader a quotation and booking form." />
    </>
  )
}

/* ------------------------------------------------------------------ land */
export function Land({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Adventure on land"
        lead="Ghyll scrambling up Pennine streams, climbing on our tower and local crags, caving, hill walking and orienteering. Every session is led by staff who hold National Governing Body awards in the activity."
        image={{ src: img('land-ghyll-waterfall'), alt: 'A group in red waterproofs and helmets on the rocks beside a moorland waterfall' }}
      />
      <Band>
        <SectionHead eyebrow="Adventure on land" title="What you can do" />
        <ActivityList items={[
          { name: 'Ghyll scrambling', img: img('land-ghyll-2'), text: 'Climbing up the bed of a moorland stream, through pools and over boulders. You will get wet. Inspectors who watched a session at Dovestone Reservoir called it "an excellent session with a good mix of adventure allied to educational content".' },
          { name: 'Rock climbing', img: img('land-climb-crag'), text: 'On our climbing tower, built in 2007, and on local gritstone for groups ready for real rock.' },
          { name: 'Abseiling', img: img('land-abseil-2'), text: 'Stepping backwards over the edge, roped and guided by an instructor.' },
          { name: 'Caving', img: img('land-caving'), text: 'Our artificial caving system, built in 2011: crawls, squeezes and darkness, without the hazards of a real cave.' },
          { name: 'Hill walking', img: img('land-obelisk-walk'), text: 'Routes from the centre onto the moors, from gentle valley walks to longer days on the Pennine tops.' },
          { name: 'Orienteering', img: img('land-orienteer'), text: 'From a first look at maps for the youngest groups to compass courses and grid references. An LOtC inspector said our orienteering "set a distinct standard", including the use of IT with Year 1.' },
          { name: 'Mountain biking', img: img('sec-bike'), text: 'Local lanes and bridleways for older groups, including as part of GCSE PE practical assessment.' },
          { name: 'High ropes and initiative tasks', img: img('team-high-ropes'), text: 'Often part of a team building day: problems to solve together, some of them off the ground.', },
        ]} />
      </Band>
      <Band tone="sky">
        <Split image={{ src: img('land-climbing-wall'), alt: 'A smiling climber in a red helmet on the climbing wall' }} heading="Safe, and still adventurous">
          <p>Every activity at Castleshaw is risk assessed by competent staff. We hold an AALA licence for climbing, watersports and trekking, the Learning Outside the Classroom Quality Badge and Adventuremark accreditation.</p>
          <p>Staff-to-student ratios vary between activities for safety reasons. We will talk you through them when you plan your visit.</p>
          <p><SqLink href={href('about/accreditation/')}>Our accreditation and inspection reports</SqLink></p>
        </Split>
      </Band>
      <Band>
        <AtAGlance ages="Suitable ages for each activity" bring={
          <Callout title="What to bring">
            <p>We provide all the specialist kit: helmets, harnesses, waterproofs and wellies. Bring old clothes, a warm layer and a full change of clothes. <a href={at('plan-your-visit') + '#what-to-bring'}>Full kit lists</a></p>
          </Callout>
        } />
      </Band>
      <Band tone="paper">
        <SectionHead title="What schools say" />
        <Quotes items={[
          { text: 'Excellent activities which build on skills, progressing children to end the day being able to read maps and complete orienteering successfully.', by: 'Mills Hill Primary, Year 5 orienteering' },
          { text: 'Excellent teaching of all learning objectives. Everything well planned and delivered.', by: 'St Edward’s, Years 3 and 4 orienteering' },
          { text: 'All children made friends and shared their interests with the other school. Rod was fantastic at encouraging the children to try new and unfamiliar activities.', by: 'Coppice Primary, Year 2' },
        ]} />
      </Band>
      <AdviceNote />
      <CtaBand title="Plan an adventure day or residential" />
    </>
  )
}

/* ------------------------------------------------------------------ water */
export function Water({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Adventure on water"
        lead="Kayaking, canoeing, rafting and paddleboarding on reservoir water in the hills above Delph. We provide the boats, paddles, buoyancy aids and wetsuits."
        image={{ src: img('water-kayak-green'), alt: 'A young paddler in a helmet and buoyancy aid kayaking across a reservoir' }}
      />
      <Band>
        <SectionHead eyebrow="Adventure on water" title="What you can do" />
        <ActivityList items={[
          { name: 'Sit-on-top kayaking', img: img('water-kayak-kids'), text: 'Stable, open kayaks that are hard to tip and easy to climb back on. A good first time on the water.' },
          { name: 'Flat water kayaking', img: img('water-kayak-stand'), text: 'Learning to steer, turn and stop on calm water, with games to build confidence.' },
          { name: 'White water kayaking', img: img('water-whitewater'), text: 'Moving water for paddlers ready for the next step.' },
          { name: 'Canoeing', img: img('water-canoe-pair'), text: 'Open canoes for two or three, where steering means working together.' },
          { name: 'Rafted canoeing', img: img('water-canoe-raft-2'), text: 'Canoes lashed together into one big, steady raft. Sociable, and very hard to capsize.' },
          { name: 'Raft building', img: img('land-raft-build'), text: 'Build a raft as a team, launch it, and find out how well it floats.' },
          { name: 'Stand up paddleboarding', img: img('water-sup'), text: 'Added in 2021 after young people in Oldham’s Youth Service asked if they could try it.' },
        ]} />
      </Band>
      <Band tone="sky">
        <Split reverse image={{ src: img('water-jump'), alt: 'A young person in a helmet and buoyancy aid leaping from a kayak into the reservoir' }} heading="Assume you will get wet">
          <p>Because we are up in the Pennines, it is often cooler and breezier than in the valleys, even on sunny days. Bring old clothes, but avoid cotton such as T-shirts and jeans, which feel cold when wet.</p>
          <Ticks items={['A full change of clothes, including footwear and underwear', 'A towel', 'Extra warm layers: fleece, coat, hat and gloves', 'Sun hat and sun cream if it’s sunny']} />
          <p><SqLink href={at('plan-your-visit') + '#what-to-bring'}>All kit lists</SqLink></p>
        </Split>
      </Band>
      <Band>
        <AtAGlance ages="Suitable ages, and any swimming requirement" bring={
          <div>
            <Callout title="Paddlesport awards" tone="sky"><p>Groups can work towards British Canoeing awards, from Paddle Start to Discover and Explore. <a href={href('courses-and-clubs/outdoor-awards/')}>Outdoor awards</a></p></Callout>
            <Callout title="Where we paddle" tone="sky"><p><TBC>Which reservoirs and rivers are used for each activity</TBC></p></Callout>
          </div>
        } />
      </Band>
      <Band tone="paper">
        <SectionHead title="What parents say" />
        <Quote big text="Thank you for taking our daughter on a wonderful kayaking adventure. These photos are truly super." by="A parent, after the Summer Holiday Club" />
      </Band>
      <AdviceNote />
      <CtaBand title="Book a day on the water" />
    </>
  )
}

/* ------------------------------------------------------------------ bushcraft */
export function Bushcraft({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Bushcraft"
        lead="Shelters, fires and something toasted on a stick. Bushcraft at Castleshaw is hands-on, outdoors and usually a little smoky."
        image={{ src: shared('bushcraft-marshmallows'), alt: 'Hands holding hazel sticks with marshmallows over a small fire in a metal stove' }}
      />
      <Band>
        <ActivityList items={[
          { name: 'Shelter building', img: img('bushcraft-tipi'), alt: 'A tipi shelter in the grounds', text: 'Working out how to stay dry with what the woods provide.' },
          { name: 'Fire lighting and cooking', img: img('team-chiron'), alt: 'An instructor blowing a tinder bundle into flame', text: 'Lighting a fire safely, keeping it going, and cooking on it.' },
          { name: 'Campcraft', img: img('award-dofe-camp'), text: 'Pitching tents and setting up camp, a natural first step towards Duke of Edinburgh expeditions.' },
          { name: 'Woodland skills', img: img('bushcraft-tools'), text: 'Working with natural materials. We also run woodland skills training for adults.' },
        ]} />
        <TBC block>The full bushcraft programme: which activities suit which ages, and whether tool use is included.</TBC>
      </Band>
      <Band tone="sage">
        <Intro heading="Qualified bushcraft instructors">
          <p>Our tutor Matt completed his NCFE Level 2 Bushcraft Instructor Award in 2023, and with Chiron leads bushcraft sessions for school groups, youth groups and our holiday clubs.</p>
          <p><a href={href('about/our-team/')}>Meet the team</a></p>
        </Intro>
      </Band>
      <Band>
        <AtAGlance ages="Suitable ages" />
      </Band>
      <AdviceNote />
      <CtaBand title="Add bushcraft to your visit" />
    </>
  )
}

/* ------------------------------------------------------------------ environment */
export function Environment({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Environmental education"
        lead="Science, geography and environmental issues, taught in the Castleshaw Valley itself: streams to dip, maps to read, habitats to explore and a Pennine village to investigate."
        image={{ src: img('env-stream'), alt: 'Pupils in waterproofs with nets and clipboards studying a stream' }}
      >
        <p>We hold the Learning Outside the Classroom Quality Badge and are an Ambassador Centre for the Peak District National Park.</p>
      </PageTop>

      <Band id="primary-science">
        <Intro heading="Primary science">
          <p>A selection of our most popular science days. Each one can be tailored to your class.</p>
        </Intro>
        <div className="cols cols-2">
          <div className="icard"><h3>Countryside adventures</h3><p>For Reception and Year 1: the sights, sounds and smells of the countryside, in safety.</p><Ticks items={['Meet the centre’s animals', 'Observe farm animals nearby', 'Discover animal homes', 'Explore plants and trees', 'Investigate minibeasts']} /></div>
          <div className="icard"><h3>Life processes and living things</h3><p>At KS1, observing the local environment, with games to reinforce life cycles, parts of a plant and simple classification.</p><p>At KS2, day courses on any of the topics below, or a combination.</p></div>
          <div className="icard"><h3>Green plants</h3><p>Plant life cycles through field study, photosynthesis and reproduction through games and working models, and identifying trees in detail to earn a tree passport.</p></div>
          <div className="icard"><h3>Water habitats</h3><p>Pond and stream dipping, adaptations, and identification using keys. Compare a stream with a pond, or study pollution by comparing a Castleshaw stream with the River Tame below Delph.</p></div>
          <div className="icard"><h3>Land habitats</h3><p>Migration, hibernation and populations depending on the season, food chains and webs, and finding and classifying minibeasts. Combines well with water habitats.</p></div>
          <div className="icard"><h3>Materials</h3><p>The variety of natural materials in the Castleshaw Valley, and how they can be used.</p></div>
        </div>
        <Gallery images={[
          { src: img('env-pond-tray'), alt: 'Pupils examining a tray of pond water' },
          { src: img('env-sample'), alt: 'A pupil holding a sampling tray beside a pond' },
          { src: img('env-nest'), alt: 'A nest of speckled eggs in straw' },
          { src: img('animals-goats'), alt: 'Two white goats at the centre' },
          { src: img('env-science'), alt: 'Pupils doing a hands-on activity around a table indoors' },
          { src: img('animals-hens'), alt: 'Hens in the centre’s henhouse' },
          { src: img('env-sheep'), alt: 'Sheep grazing above a reservoir' },
          { src: img('animals-ducks'), alt: 'Ducks by the centre’s pond' },
        ]} />
      </Band>

      <Band tone="sky" id="primary-geography">
        <Intro heading="Primary geography">
          <p>Our most popular geography days, at a number of levels to suit your class.</p>
        </Intro>
        <div className="cols cols-2">
          <div className="icard"><h3>Contrasting localities</h3><Ticks items={['Villages and valleys: walk from the Castleshaw Valley over or along Harrop Edge into Diggle, and compare the two (or compare with Oldham)', 'The Castleshaw Valley: compare your school’s area with a rural one. A less strenuous option, with lunch indoors if you need it', 'The village of Delph: a walk down the valley and an exploration of a classic Pennine village']} /></div>
          <div className="icard"><h3>Rivers and landscapes</h3><p>Follow the valley from the source of a stream as it changes, looking at erosion, transportation and deposition, rock formation and the work of glaciers.</p><p>Wellington boots are essential, and we provide them. This is very much a hands-on and feet-in experience.</p></div>
          <div className="icard"><h3>Mapwork</h3><Ticks items={['Introducing maps: what is a map, and a guided map walk', 'Making maps of the centre and its grounds', 'Compasses and a simple compass course', 'Four-figure grid references, distance, direction and following routes']} /></div>
          <div className="icard"><h3>Environmental issues</h3><p><strong>The Delph Bypass Game.</strong> A town planner proposes a bypass around Delph. Pupils walk the route, then debate it as residents, business owners and campaigners.</p><p><strong>Wind turbine debate.</strong> Visit peat moorland and weigh the impact of turbines on wildlife, residents and the view against the need for renewable energy.</p></div>
        </div>
      </Band>

      <Band id="secondary">
        <Split image={{ src: img('sec-map-1849'), alt: 'A hand-drawn map of the Castleshaw Valley dated 1849' }} shape="soft" heading="Secondary field studies">
          <p>The Castleshaw Valley is ideal for a wide range of field study topics. Our staff&rsquo;s outdoor experience and local knowledge complement your subject objectives.</p>
          <Ticks items={['History: an archaeological timeline from the Bronze Age through the Romans, the Middle Ages and the Industrial Revolution to the Victorians', 'Geography: glaciated valleys, moorland habitat, the source of a major river and settlements shaped by the landscape', 'Science: material cycles and energy, renewable energy, interdependence, earth and atmosphere, energy transfers']} />
        </Split>
      </Band>

      <Band tone="paper">
        <Quotes items={[
          { text: 'It was a great day and the children learnt a lot about their local area, which they will now be able to incorporate into their work and lessons for the rest of the term.', by: 'Hodge Clough Primary, Year 5 contrasting localities' },
          { text: 'Real life experiences, such as today, help the children to understand when we go on to learn about other animals and their habitats.', by: 'St Matthew’s C of E, Year 1' },
          { text: 'Great teaching, demos, practical activities. It still remains good value for money.', by: 'Burnley Brow, Year 4 river study' },
        ]} />
      </Band>

      <Band>
        <Intro heading="Free resources for teachers"><p>Use these to prepare for your visit, or to follow up back at school.</p></Intro>
        <Downloads items={RESOURCES} />
        <p><a href={at('plan-your-visit') + '#resources'}>More resources and useful links</a></p>
      </Band>
      <AdviceNote />
      <CtaBand title="Plan a field study day" />
    </>
  )
}

export const RESOURCES = [
  { title: 'Minibeast classification chart', href: OLD + 'land_minibeast_classification_chart_2018.pdf', meta: 'PDF, 436 KB' },
  { title: 'Castleshaw stream dipping ID sheet', href: OLD + 'castleshaw_pond___stream_dipping_id_sheets_2017.pdf', meta: 'PDF, 1.5 MB' },
  { title: 'Pollution detective', href: OLD + 'pollution_detective_2018.pdf', meta: 'PDF, 639 KB' },
  { title: 'Contrasting localities comparison', href: OLD + 'contrasting_localities_comparison_website_version.docx', meta: 'Word, 17 KB' },
  { title: 'Delph Bypass character cards', href: OLD + 'delph_bypass_character_cards_2023.pdf', meta: 'PDF, 190 KB' },
  { title: 'Delph Bypass voting slip', href: OLD + 'delph_bypass_voting_slip_single_option.pdf', meta: 'PDF, 43 KB' },
]

/* ------------------------------------------------------------------ history */
export function History({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Roman and local history"
        lead="A Roman fort a few minutes' walk away, weavers' cottages and mills down the valley, and a Victorian village at the bottom of it. History here is something you can walk to."
        image={{ src: img('roman-shields'), alt: 'Children in Roman helmets with red shields and wooden swords' }}
      />
      <Band id="romans">
        <Split image={{ src: img('roman-fort-aerial'), alt: 'An aerial photograph showing the outline of the Roman fort in the fields of the Castleshaw Valley' }} shape="soft" heading="Romans: life at a frontier fort">
          <p>We are a few minutes&rsquo; walk from the site of a Roman fort on the old road from Chester to York. A visit to the fort and its remains combines with activities at the centre:</p>
          <Ticks items={['Making a timeline', 'Finding out what the Romans did for us', 'Learning about the Roman army, and filling in an application form', 'Dressing in mock uniform and trying famous Roman marching formations', 'Some practical archaeology']} />
        </Split>
        <Gallery images={[
          { src: img('roman-formation'), alt: 'Pupils marching in a Roman shield formation on the field' },
          { src: img('roman-auxiliary'), alt: 'An illustration of a Roman auxiliary soldier with a spear and shield' },
          { src: shared('roman-session'), alt: 'Smiling children in plumed Roman helmets holding wooden swords' },
        ]} />
      </Band>
      <Band tone="sky">
        <div className="cols cols-2">
          <div className="icard"><h3>The Industrial Revolution</h3><p><strong>Weavers&rsquo; cottages to steam mills.</strong> Follow a route from a hamlet of weavers&rsquo; cottages, past the remains of water-powered mills, to the large steam mills in Diggle. Handle a spinning wheel and carding brushes, watch mills at work on video and try some weaving.</p></div>
          <div className="icard"><h3>Local history trails</h3><p><strong>The John Buckley Trail</strong> follows the births, schooling, marriages, working lives and deaths of a Castleshaw Valley family, using period maps, old photographs, census information and grave rubbings.</p><p><strong>Travel the ancient highways</strong> along the pack horse trail, the Roman road and the turnpike, with the canals and railways if you want them.</p></div>
          <div className="icard"><h3>Victorian Delph</h3><p>An exploration of Delph, searching for clues of how it grew in the Victorian era.</p></div>
          <div className="icard"><h3>The Victorian Experience</h3><p>A winter course, mostly indoors. Come in mock Victorian dress for bread baking and butter making, a lesson in a Victorian classroom, a public meeting on the 1880s plans for the Castleshaw reservoirs, traditional games, and wash day the hard way with a dolly tub, posser and scrubbing board.</p></div>
        </div>
      </Band>
      <Band>
        <Split reverse image={{ src: img('history-victorian-day'), alt: 'A class dressed in Victorian costume outside' }} heading="For secondary groups">
          <p>The valley holds an archaeological timeline from the Bronze Age through the Romans and the Middle Ages to the Industrial Revolution and the Victorians. <a href={at('environmental-education') + '#secondary'}>Secondary field studies</a></p>
          <LinkList items={[
            { title: 'Castleshaw archaeology', href: 'http://www.castleshawarchaeology.co.uk/', text: 'The Roman forts and other research in the valley' },
            { title: 'Historic maps', href: 'https://maps.nls.uk/', text: 'National Library of Scotland map archive' },
          ]} />
        </Split>
      </Band>
      <Band tone="paper">
        <Quotes items={[
          { text: 'We had a great day and the pupils learned about the Romans in the Oldham context. The children loved it. The day helped them connect with the topic.', by: 'St Martin’s C of E Primary, Year 4 Romans' },
          { text: 'Well organised, fantastic activities, brilliant teachers. Very interactive and friendly staff.', by: 'Islamiyah Girls High School, Blackburn, Year 7 Romans' },
        ]} />
      </Band>
      <AdviceNote />
      <CtaBand title="Book a history day" />
    </>
  )
}

/* ------------------------------------------------------------------ team building */
export function Team({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Team building"
        lead="Days built around getting on: co-operation and fun for primary classes, plan, do and review for secondary groups, and away days for adults."
        image={{ src: img('team-rope'), alt: 'A group pulling together on a rope among the trees' }}
      />
      <Band>
        <div className="cols cols-3">
          <div className="icard"><h3>Primary classes</h3><p>The emphasis is on activity and fun. Usually a half day of team games that encourage co-operation and mixing, then a half day of focused work in small groups, linked to curriculum targets such as mapwork or habitats.</p></div>
          <div className="icard"><h3>Secondary groups</h3><p>Smaller groups and the plan, do and review model. Initiative tests, high ropes, orienteering or raft building, with a review and ideas for improvement between each task. It suits the PSHE curriculum well:</p><Ticks items={['Personal action planning', 'Emotional wellbeing and healthy lifestyles', 'Relationships and behaviour in the workplace', 'Personal safety']} /></div>
          <div className="icard"><h3>Adult groups</h3><p>Away days for teachers, outreach workers, office staff and medical consultants, all about getting to know colleagues in a more informal setting. Choose full-day activities, or hold a staff conference here broken up with something more adventurous.</p></div>
        </div>
      </Band>
      <Band tone="sage">
        <Intro heading="The Oldham Linked Schools project">
          <p>We work closely with the Oldham Linked Schools project, which forges stronger links between children from different communities across Oldham. Two classes from different schools spend the day together, mixed into teams.</p>
        </Intro>
        <Quotes items={[
          { text: 'Really well delivered, nice focus on team work, mixed up the two schools well and encouraged lots of friend making and communicating.', by: 'Holy Trinity Dobcross, Year 4' },
          { text: 'Their social skills have improved, as well as their speaking and listening skills.', by: 'Westwood Academy, Year 5' },
          { text: 'The rope challenge through the trees was very effective, as was the ball and pipe challenge to get them working together.', by: 'Richmond Academy, Years 3 and 4' },
        ]} />
      </Band>
      <Band>
        <Gallery images={[
          { src: img('team-high-ropes'), alt: 'Two people on a high ropes course in the trees' },
          { src: img('team-blocks'), alt: 'Pupils stacking large foam blocks on the field' },
          { src: img('team-planks'), alt: 'Pupils standing on shared wooden planks, trying to walk in step' },
          { src: img('team-balance'), alt: 'Pupils taking turns on a rope swing from a wooden platform' },
          { src: img('team-tape'), alt: 'Pupils building a pipe puzzle on the floor of the yurt' },
          { src: img('team-challenge'), alt: 'A group working together with poles and a tarpaulin' },
        ]} />
      </Band>
      <Band tone="ink">
        <Quote big text="Our aims were to build relationships and get to know each other. The course was really effective. It was nice to see students laughing together all day." by="Royton and Crompton, Year 7 team building" />
      </Band>
      <AdviceNote />
      <CtaBand title="Plan a team building day" />
    </>
  )
}

/* ------------------------------------------------------------------ plan your visit */
export function Plan({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Plan your visit"
        lead="Everything a group leader needs: how booking works, the guides we send you, what to pack, access, and free resources for before and after."
        image={{ src: img('bring-muddy'), alt: 'A smiling child in muddy waterproofs and wellies' }}
      />
      <Band id="booking">
        <Intro heading="Booking a visit">
          <p><strong>Oldham schools.</strong> Oldham local authority schools can take out a Service Level Agreement for a package of Outdoor and Environmental Education services, or book services individually. Local academies can take out similar agreements.</p>
          <p>Each year schools receive a letter reminding them to book for the following academic year. To avoid missing out, book when you get the reminder.</p>
          <p><strong>Schools outside Oldham and other organisations.</strong> Call or email us to talk through what you need. Once a programme is agreed, we email the group leader a quotation and booking form.</p>
          <p>Book activities a term in advance if you can, although short-notice bookings are sometimes possible.</p>
        </Intro>
        <div className="cols cols-2">
          <TBC block>Prices for day visits and residentials, and what the Oldham schools Outdoor and Environmental Education agreement includes.</TBC>
          <Callout title="Planning a trip somewhere else?" tone="sky"><p>Our advisers can sign off educational visits to anywhere, not just Castleshaw. <a href={href('advice-and-guidance/')}>Educational visits advice and guidance</a></p></Callout>
        </div>
      </Band>

      <Band tone="sky" id="group-leaders">
        <Intro heading="Information for group leaders">
          <p>We email the relevant guides when you book, and you can ask for them earlier if you need to:</p>
          <Ticks items={['Guide for Oldham teachers and Integrated Youth Service staff', 'Leaders’ guide', 'Welcome pack', 'Centre plan, fire exits and alarm points']} />
        </Intro>
        <div className="cols cols-2">
          <div className="icard"><h3>Insurance</h3><p>The service is covered by the Council&rsquo;s Public Liability and Employer&rsquo;s Liability policies. These don&rsquo;t cover loss of personal items, or provide compensation for injury except in cases of negligence. The organiser should take out additional personal insurance for group leaders and participants.</p></div>
          <div className="icard"><h3>Health and safety</h3><p>Our practice is in line with the national guidance recognised by the Government, which the Health and Safety Executive&rsquo;s school trips guidance points to.</p><LinkList items={[{ title: 'OEAP National Guidance', href: 'https://oeapng.info/' }, { title: 'HSE: school trips', href: 'https://www.hse.gov.uk/education/school-trips.htm' }]} /></div>
        </div>
        <Downloads items={[{ title: 'Centre plan with fire exits and alarm points', href: OLD + 'centre_plan_with_fire_exits_and_alarm_points_2019.pdf', meta: 'PDF, 270 KB' }]} />
      </Band>

      <Band id="what-to-bring">
        <Intro heading="What to bring">
          <p>Up here in the Pennines it is often cooler and breezier than down in the valleys, even on sunny days, so bring a few extra layers, especially if you will be on or near the water, or the mud.</p>
          <p>We provide specialist equipment, including waterproofs and wellingtons. For the extreme ends of the size range, such as Reception classes, stocks may be limited, so check with us first.</p>
        </Intro>
        <Callout title="Five things visitors most often wish they had brought" tone="sage">
          <Ticks items={['Old clothes: tracksuit bottoms, a fleece or sweatshirt, trainers and socks. Avoid cotton T-shirts and jeans, which feel cold when wet', 'Spare socks, whatever the activity and whatever the weather', 'A warm coat, hat and gloves when it’s cool; a sun hat and sun cream when it’s warm', 'Any medication, such as asthma inhalers or hay fever tablets', 'A packed lunch on day trips. It’s a long way to the shops']} />
        </Callout>
        <div className="kits">
          <Kit title="Adventure and environmental days" bring={['Lunch and a drink (no glass bottles)', 'Outdoor clothing: tracksuit bottoms, sweatshirt or fleece, trainers, socks', 'Coat, hat and gloves if cooler', 'Sun hat and sun cream if sunny', 'Wellingtons if you have them (we can provide some)', 'Any medication you need', 'A camera if you like, at your own risk']} avoid={['Electronic games', 'Mobile phones', 'Knives', 'Large amounts of money']} />
          <Kit title="Outdoor and adventurous activities" bring={['Old clothes, avoiding cotton for water activities', 'Extra warm clothes: fleece, coat, hat, gloves', 'A full change of clothes, including footwear and underwear', 'A towel', 'Sun hat and sun cream if sunny']} note="We provide all specialist equipment: canoeing and kayaking kit, climbing kit, biking kit. If you want to bring your own, check with us first." avoid={['Electronic games', 'Mobile phones', 'Knives', 'Large amounts of money']} />
          <Kit title="Residential courses" bring={['Tracksuit bottoms or trousers (avoid jeans)', 'T-shirts, warm tops, underwear', 'Socks, including thick ones for walking boots', 'Warm hat, gloves and scarf, or sun hat and sun cream', 'Trainers or indoor shoes', 'Pyjamas', 'Soap, face cloth, towel, toothbrush, toothpaste, hairbrush', 'Wellingtons and waterproofs if you have them', 'Any medication you need']} avoid={['Hair dryers', 'Electronic games', 'Mobile phones', 'Knives', 'Large amounts of money']} />
        </div>
      </Band>

      <Band tone="sage" id="access">
        <Split image={{ src: img('stay-building'), alt: 'The stone end of the Castleshaw Centre building on a sunny day' }} shape="soft" heading="Access">
          <p>We have changed floor levels so the ground floor is wheelchair accessible, including bedroom and bathroom areas, and installed hoists in one bedroom and bathroom.</p>
          <p>Tell us about your group&rsquo;s needs when you book and we will plan around them.</p>
          <Quote text="Staff provided careful accessible information and took time to build confidence in students. They loved it." by="Visual Impairment Service residential" />
        </Split>
      </Band>

      <Band id="resources">
        <Intro heading="Resources for teachers">
          <p>Free resources to prepare for your visit or to follow up back at school. If you would like other presentation materials, such as the Delph Bypass game cards or scavenger hunt sheets, ask your tutor on the day and we can share them.</p>
        </Intro>
        <Downloads items={RESOURCES} />
        <LinkList items={[
          { title: 'Field Studies Council', href: 'https://www.field-studies-council.org/resources/', text: 'Resources for fieldwork' },
          { title: 'OPAL identification guides', href: 'https://www.opalexplorenature.org/identification', text: 'Downloadable ID guides for all kinds of living things' },
          { title: 'Moors for the Future', href: 'https://www.moorsforthefuture.org.uk/get-involved/teachers-and-educators', text: 'A teachers’ pack on the local moorland environment' },
          { title: 'The Pond Pack', href: 'https://www.arguk.org/info-advice/educational-resources/ks1-ks2-resources/222-the-pond-pack/file', text: 'KS1 and KS2 resources on ponds and pond life' },
          { title: 'Tree Tools for Schools', href: 'http://www.treetoolsforschools.org.uk/categorymenu/?cat=activities', text: 'Ideas and resources for primary and secondary' },
          { title: 'Science and Plants for Schools', href: 'http://www.saps.org.uk/primary', text: 'Plant life cycles and classification' },
          { title: 'Canal and River Trust Explorers', href: 'https://canalrivertrust.org.uk/explorers', text: 'Rivers, canal history, recreation and safety' },
          { title: 'Castleshaw archaeology', href: 'http://www.castleshawarchaeology.co.uk/', text: 'The Roman forts and research in the valley' },
        ]} />
      </Band>
      <CtaBand title="Ready to book?" text="Call us to talk through dates and a programme for your group." />
    </>
  )
}
