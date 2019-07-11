import React from "react";
// TODO: - add proptypes
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getMe = this.getMe.bind(this);
  }

  getMe() {
    console.log("ax");
    axios({
      url: "/graphql",
      method: "post",
      data: {
        query: `
          query GetRnd($number:Int!) {
            getRandomNotFollowedUsers(number:$number) {
              username
            }
          }
          `,
        variables: {
          number: 3,
        },
      },
    })
      .then(result => {
        console.log("bort!", result.data);
      })
      .catch(e => console.log(e));
  }

  render() {
    this.getMe();
    const { props } = this;
    if (props.user) {
      return (
        <div className="Home">
          <p>Current User:</p>
          <code>{JSON.stringify(props)}</code>
          {/* TODO: use props.user.id to send a Query request to /graphQL TODO: */}
        </div>
      );
    } else {
      return (
        <div className="Home">
          <p>Current User:</p>
          <code>{JSON.stringify(props)}</code>
        </div>
      );
    }
  }
}

export default Home;
