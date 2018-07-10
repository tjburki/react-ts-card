import * as React from "react";
import { Component } from "react";
import { kwikConnect, IAppProps } from "../../store/store";
import { auth, provider } from "../../firebase";
import { Section } from "../layout";
import './footer.css';

@kwikConnect
class Footer extends Component {
    login() {
        const { setUser } = this.props as IAppProps;
        auth.signInWithPopup(provider) 
            .then((result) => {
                setUser(result.user);
            });
    }

    logout() {
        const { setUser } = this.props as IAppProps;
        auth.signOut()
            .then(() => {
                setUser(null);
            });
    }

    render() {
        const { user } = this.props as IAppProps;
        return (
            <Section className="footer" style={{color: '#FFF', backgroundColor: '#3A2D21', paddingLeft: 10, paddingRight: 10, height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}}>
                <div style={{fontSize: 50}}>
                    <i className="fa fa-twitter-square twitter" title="Tweet @ Us"></i>
                    <i className="fa fa-pinterest-square pinterest" title="Pin Us"></i>
                    <i className="fa fa-facebook-square facebook" title="Like Us"></i>
                </div>
                <div>
                        {
                            user ? <span>Hi {user.displayName.split(' ')[0]}! <span style={{cursor: 'pointer'}} onClick={() => this.logout()}>Log Out</span></span> : <span style={{cursor: 'pointer'}} onClick={() => this.login()}>Log In</span>
                        }
                        <span style={{paddingLeft: 15}}>&copy; Tyler Burki {new Date().getFullYear()}</span>
                </div> 
            </Section>
        );
    }
}

export default Footer;