/*The components latest state should be sent after each color change via a debounced
 (1 or 2 seconds) POST-request to the Postman Echo REST API (https://postman-echo.com/post). 
 Try to display the request status and result somehow.
  If there are problems using that Postman service, please specify why it's not possible, 
  and try to come up with some alternative,
 or simulate the HTTP requests alltogether*/

import { debounce } from "debounce";
import axios from "axios";

const BASE_URL = "https://vast-bayou-84453.herokuapp.com";
const POST_URL = `${BASE_URL}/post`;

async function post(objectToPost, onSuccessCb, onErrorCb) {
  try {
    console.log("POSTING...", objectToPost);
    const response = await axios.post(POST_URL, objectToPost);
    console.log(response);
    onSuccessCb();
  } catch (e) {
    onErrorCb();
  }
}

export default debounce(post, 1000);
