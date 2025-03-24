import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

export const SignUp = () => {
  return (
    <div className="App">
      <div className="sign-in-page">
        <div className="sign-in-wrapper">
          <div className="logo-wrapper">
            <div className="logo">
              <img src={require("../assets/logo.png")} alt={"sign in icon"} /> :
            </div>
            <div className="banner">Sign In</div>
            <div className="account">
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/">
                Sign In
              </Link>
            </div>
          </div>
          <div className="inputs-wrapper">
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
                        name={"fullName"}
                        component={Input}
                        label={"Full Name"}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name={"email"}
                        type={"email"}
                        component={Input}
                        label={"Email"}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name={"password"}
                        type={"password"}
                        component={Input}
                        label={"Password"}
                      />
                      <div className="mb-3">
                        <Field
                          name={"Company"}
                          component={Input}
                          label={"Company"}
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className={"k-form-fieldset"}>
                    <div className="mb-3" style={{ display: "flex" }}>
                      <Checkbox />
                      <p>
                        {" "}
                        &nbsp; I agree to the{" "}
                        <span
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          Terms of Services{" "}
                        </span>{" "}
                        and <br></br>{" "}
                        <span
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          Privacy Policy
                        </span>{" "}
                      </p>
                    </div>
                    <div className="k-form-buttons">
                      <Link to="/home/dashboard" className="dashboard-button">
                        <Button type={"submit"} className="sign-button">
                          Create Free Account
                        </Button>
                      </Link>
                    </div>
                  </fieldset>
                </FormElement>
              )}
            />
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="text-wrapper">
            <h2>Come join us!</h2>
            <h4>
              We are so excited to have you here. If you haven't already, create
              an account to get access to exclusive offers, rewards and
              discounts.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
