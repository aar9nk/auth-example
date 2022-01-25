import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  
  const [formStateVerify, setFormStateVerify] = useState({
    email: "",
    code: "",
    loading: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderBottom: "1px solid black",
          width: '100%',
        }}
      >
        <h3>Sign up</h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            setFormState({
              email: formState.email,
              password: formState.password,
              loading: true,
            });

            console.log(
              "Form email",
              formState.email,
              "Form password",
              formState.password
            );

            await Auth.signUp({
              username: formState.email,
              password: formState.password,
              attributes: {
                email: formState.email,
              }
            });

            setFormState({
              email: formState.email,
              password: formState.password,
              loading: false,
            });
          }}
        >
          <input
            placeholder="email"
            type="email"
            onChange={(e) =>
              setFormState({
                email: e.target.value,
                password: formState.password,
                loading: formState.loading,
              })
            }
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) =>
              setFormState({
                email: formState.email,
                password: e.target.value,
                loading: formState.loading,
              })
            }
          />
          <button>Sign up</button>
        </form>
        </div>
        <div style={{
            borderBottom: "1px solid black",
            width: '100%',
            display: "flex",
            alignItems: 'center',
            flexDirection: "column",
        }}>
        <h3>Verify</h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            setFormStateVerify({
              email: formStateVerify.email,
              code: formStateVerify.code,
              loading: true,
            });

            console.log(
              "Form email",
              formStateVerify.email,
              "Form code",
              formStateVerify.code
            );

            await Auth.confirmSignUp(formStateVerify.email, formStateVerify.code);

            setFormStateVerify({
              email: formStateVerify.email,
              code: formStateVerify.code,
              loading: false,
            });
          }}
        >
          <input
            placeholder="email"
            type="email"
            onChange={(e) =>
              setFormStateVerify({
                email: e.target.value,
                code: formStateVerify.code,
                loading: formStateVerify.loading,
              })
            }
          />
          <input
            placeholder="code"
            type="code"
            onChange={(e) =>
              setFormStateVerify({
                email: formStateVerify.email,
                code: e.target.value,
                loading: formStateVerify.loading,
              })
            }
          />
          <button>Verify</button>
        </form>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3>Log in</h3>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const user = await Auth.signIn(email, password);
          console.log(user);
        }}>
          <input placeholder="email" type='email' onChange={(e) => {
            setEmail(e.target.value);
          }}/>
          <input placeholder="password" type='password' onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default App;
