import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

export const SignIn = () => {

  return (
    <div className="App">
      <div className="sign-in-page">
        <div className="sign-in-wrapper">
          <div className="logo-wrapper">
            <div className="logo">
              <img src={require("../assets/logo.png")} alt={"sign in icon"} />{" "}
            </div>
            <div className="banner">Sign In</div>
            <div className="account">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
          <div className="inputs-wrapper" >
            <Form
              render={(formRenderProps) => (
                <FormElement
                  style={{
                    maxWidth: 650,
                  }}
                >
                  <fieldset className={"k-form-fieldset"}>
                    <div className="mb-3">
                      <Field
                        name={"email"}
                        type={"email"}
                        component={Input}
                        label={"Email"}
                      />
                    </div>
                    <div className="mb-3" style={{ display: "flex" }}>
                      <Field
                        name={"password"}
                        type={"paswordType"}
                        component={Input}
                        label={"Password"}
                      />
                    </div>
                  </fieldset>
                  <fieldset className={"k-form-fieldset"}>
                    <div className="mb-3">
                      <Checkbox label={"Remember Me"} />
                    </div>
                  </fieldset>

                  <div className="k-form-buttons">
                    <Link
                      to="/home/dashboard"
                      className="dashboard-button"
                      style={{ textDecoration: "none" }}
                    >
                      <Button type={"submit"} className="sign-button">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </FormElement>
              )}
            />
          </div>
          <div className="continue-with-wrapper">
            <hr /> <span>Or continue with</span>
            <hr />
          </div>
          <div className="social-wrapper">
            <a href="/#" className="facebook">
              <img
                src={require("../assets/facebook.png")}
                alt={"facebook icon"}
              ></img>
            </a>
            <a href="/#" className="twitter">
              <img
                src={require("../assets/twitter.png")}
                alt={"twitter icon"}
              ></img>
            </a>
            <a href="/#" className="reddit">
              <img
                src={require("../assets/reddit.png")}
                alt={"reddit icon"}
              ></img>
            </a>
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="text-wrapper">
            <h2>Welcome back!</h2>
            <h4>
              Welcome back! We are so happy to have you here. It's great to see
              you again. We hope you had a safe and enjoyable time away.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
