// Courses and holiday clubs: for young people, families and outdoor leaders.
import { PageTop, Band, Intro, Split, Ticks, TileLinks, ActivityList, Gallery, Quote, Quotes, Callout, CtaBand, Btn, TBC, img, ill } from '../ui/inner/blocks'
import { href, FACEBOOK } from '../data'

const cc = (k) => href(`courses-and-clubs/${k}/`)

/* ------------------------------------------------------------------ hub */
export function Hub({ path }) {
  return (
    <>
      <PageTop
        path={path}
        tone="sage"
        title="Courses and holiday clubs"
        lead="Holiday clubs for Oldham children, summer activity courses for young people, and outdoor awards for young people and leaders."
        illustration={{ src: ill('courses-camp'), alt: 'An illustration of a tent, a canoe, a campfire and a climbing helmet in the valley' }}
      />
      <Band>
        <TileLinks items={[
          { title: 'Holiday clubs', href: cc('holiday-clubs'), img: img('club-smiles'), text: 'Free Holiday Activities and Food clubs for eligible Oldham families, and a paid summer club.' },
          { title: 'Activity courses', href: cc('activity-courses'), img: img('course-wall'), text: 'Short summer courses in canoeing, kayaking, climbing and more.' },
          { title: 'Outdoor awards and DofE', href: cc('outdoor-awards'), img: img('award-dofe-walk'), text: 'Duke of Edinburgh expeditions, paddlesport awards and leader training.' },
        ]} />
      </Band>
      <Band tone="paper">
        <Quotes items={[
          { text: 'Best day ever!', by: 'A parent, after the Summer Holiday Club' },
          { text: 'Thank you for taking our daughter on a wonderful kayaking adventure. These photos are truly super.', by: 'A parent, after the Summer Holiday Club' },
        ]} />
      </Band>
      <CtaBand title="Ask about courses and clubs" text="For dates, places and booking forms, contact our office." />
    </>
  )
}

/* ------------------------------------------------------------------ holiday clubs */
export function Clubs({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Holiday clubs"
        lead="Days outdoors in the school holidays: kayaking, climbing, archery, bushcraft, the animals, and a proper lunch."
        image={{ src: img('club-group'), alt: 'A group of children in helmets and buoyancy aids grinning up at the camera' }}
        actions={<a className="ib ib-ink" href={FACEBOOK} rel="noopener">Updates on Facebook</a>}
      />
      <Band>
        <div className="cols cols-2">
          <div className="icard">
            <h3>Holiday Activities and Food (HAF)</h3>
            <p>A fully funded programme for Oldham children who receive benefits-related free school meals. Activities, a healthy meal, and nothing to pay.</p>
            <p><TBC>2026 dates, ages and how families book a place</TBC></p>
          </div>
          <div className="icard">
            <h3>Summer holiday club</h3>
            <p>A paid club during the school summer holidays, open to all.</p>
            <p><TBC>2026 dates, ages, daily price and how to book</TBC></p>
          </div>
        </div>
      </Band>
      <Band tone="sky">
        <Gallery images={[
          { src: img('club-archery'), alt: 'Children trying archery on the field' },
          { src: img('club-girls'), alt: 'Children smiling on the hillside during a club day' },
          { src: img('club-smiles'), alt: 'Children laughing during an activity' },
          { src: img('water-kayak-kids'), alt: 'Children paddling sit-on-top kayaks' },
          { src: img('animals-goats'), alt: 'Two goats at the centre' },
          { src: img('bushcraft-fire'), alt: 'Toasting marshmallows over a small fire' },
        ]} />
      </Band>
      <Band tone="ink">
        <Quote big text="Best day ever!" by="A parent, after the Summer Holiday Club" />
      </Band>
      <Band>
        <Callout title="Stay up to date" tone="sky">
          <p>We post club dates and places on our <a href={FACEBOOK} rel="noopener">Facebook page</a> first.</p>
        </Callout>
      </Band>
      <CtaBand title="Ask about holiday clubs" />
    </>
  )
}

/* ------------------------------------------------------------------ activity courses */
export function ActivityCourses({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Activity courses"
        lead="Short courses in the summer holidays for young people who want more than a taster: usually canoeing and kayaking, or climbing."
        image={{ src: img('course-caving'), alt: 'Three young cavers in helmets and red overalls grinning in the cave' }}
      />
      <Band>
        <ActivityList items={[
          { name: 'Canoeing and kayaking', img: img('water-canoe-pair'), text: 'Building skills over several sessions, on calm water and beyond.' },
          { name: 'Climbing', img: img('course-wall'), text: 'On the climbing tower and local crags.' },
          { name: 'And more', img: img('land-orienteer'), text: 'Some courses also include orienteering, problem solving activities or artificial caving.' },
        ]} />
      </Band>
      <Band tone="sky">
        <Intro heading="Dates and booking">
          <p>Courses are booked on a first come, first served basis. Age restrictions may apply to some courses. For more information and a booking form, contact our office.</p>
          <TBC block>2026 course dates, ages and prices.</TBC>
        </Intro>
      </Band>
      <Band>
        <div className="cols cols-2">
          <Callout title="A course for your group">
            <p>If you are part of a group and would like a course organised just for you, contact the office for a quotation.</p>
          </Callout>
          <Callout title="What to bring" tone="sky">
            <p>Old clothes, a warm layer, a full change of clothes and a towel. <a href={href('activities/plan-your-visit/') + '#what-to-bring'}>Full kit lists</a></p>
          </Callout>
        </div>
      </Band>
      <CtaBand title="Ask for a booking form" />
    </>
  )
}

/* ------------------------------------------------------------------ outdoor awards */
export function Awards({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Outdoor awards and DofE"
        lead="Duke of Edinburgh expedition training and support, paddlesport and climbing awards for young people, and leader training for adults."
        image={{ src: img('award-dofe-group'), alt: 'A Duke of Edinburgh group with rucksacks checking their route' }}
      />
      <Band id="dofe">
        <Split image={{ src: img('award-dofe-camp'), alt: 'Young people pitching tents on the camping field' }} heading="The Duke of Edinburgh's Award">
          <p>The Award is popular with schools and youth groups across Oldham, but running the expedition section can be a challenge for supervising staff. We can help in several ways.</p>
          <Ticks items={[
            <><strong>Expedition training packages.</strong> Usually a number of weekends, residential or not, leading to an assessed expedition.</>,
            <><strong>Training for group leaders</strong> in navigation, hill skills and campcraft, leading to nationally recognised awards.</>,
            <><strong>Expedition support.</strong> Qualified staff to help supervise groups on practice and qualifying expeditions.</>,
            <><strong>A training base.</strong> Groups use the centre and camping field for expedition training, in and out of season.</>,
          ]} />
          <p>Many of our activities, such as kayaking and climbing, can count towards the Physical section, and our summer residentials can count towards the Residential section.</p>
        </Split>
      </Band>
      <Band tone="sky" id="young-people">
        <Intro heading="Awards for young people">
          <p>Activities at Castleshaw can lead to nationally recognised awards and support school qualifications.</p>
        </Intro>
        <div className="cols cols-3">
          <div className="icard"><h3>Paddlesport and climbing</h3><Ticks items={['British Canoeing Paddle Start, Discover and Explore', 'NICAS climbing awards']} /></div>
          <div className="icard"><h3>GCSE PE</h3><p>Practical performance in canoeing, climbing, kayaking, mountain biking, orienteering and trekking.</p></div>
          <div className="icard"><h3>BTEC and AQA</h3><Ticks items={['BTEC Public Services, Levels 2 and 3', 'BTEC Sport, Level 2: Outdoor and Adventurous Activities', 'AQA Unit Awards']} /></div>
        </div>
        <TBC block>Which qualification specifications are current, as the old site lists 2010 and 2011 BTEC units.</TBC>
      </Band>
      <Band id="leaders">
        <Intro heading="Training for leaders">
          <p>Some courses are open to all, while others need particular experience or registration with a national governing body first.</p>
          <Ticks cols items={['First aid', 'Countryside Leader Award training', 'British Canoeing Paddlesport Safety and Rescue', 'Duke of Edinburgh expedition supervisor training', 'Outdoor Learning Cards training', 'MiDAS minibus assessments']} />
          <p>Training for school staff on planning and approving visits is part of our <a href={href('advice-and-guidance/training/')}>educational visits advice service</a>.</p>
          <TBC block>Upcoming dates and prices for leader training.</TBC>
        </Intro>
      </Band>
      <Band tone="sage">
        <Gallery images={[
          { src: img('award-kayak'), alt: 'An instructor with young paddlers in a kayak' },
          { src: img('award-bikes'), alt: 'Riders with mountain bikes ready to set off' },
          { src: img('award-dofe-walk'), alt: 'A walker on a moorland path below the hills' },
          { src: img('sec-climb'), alt: 'A student climbing on a crag' },
        ]} />
      </Band>
      <CtaBand title="Plan your award training" />
    </>
  )
}
