import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function LaunchItem({
  launch: {
    id,
    mission_name,
    launch_date_local,
    launch_success,
    rocket: { rocket_name },
    launch_site: { site_name_long }
  }
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-10">
          <h4>
            Mission: <span className={launch_success ? "text-success" : "text-danger"}>{mission_name}</span>
          </h4>
          <h5>Launch Site: {site_name_long}</h5>
          <h5>Rocket: {rocket_name}</h5>
          <p>Date: {moment(launch_date_local).format("YYYY-MM-DD HH:mm")} </p>
        </div>
        <div className="col-md-2">
          <Link to={`/launch/${id}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
