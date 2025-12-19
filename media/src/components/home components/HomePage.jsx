import Card from "./Cards";

function HomePage() {
  return (
    <>
      <div className="container mt-5">
        <div className="row mt-3">
          <div className="col">
            <Card
              img="\img\analytics.png"
              title="See Analytics"
              btn="View Analytics"
              navi="/dashboard"
            />
          </div>
          <div className="col">
            <Card
              img="\img\taskqueue.avif"
              title="Task Queue"
              btn="Check Queue"
              navi="/taskListing"
            />
          </div>
          <div className="col">
            <Card
              img="\img\task asign.png"
              title="Assign Task"
              btn="Assign Task"
              navi="/give-task"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col mb-3">
            <Card
              img="\img\searchDevice2.jpg"
              title="Search Device Detail"
              btn="Search"
              navi="/deviveDetail"
            />
          </div>
          <div className="col mb-3"></div>
          <div className="col mb-3"></div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
