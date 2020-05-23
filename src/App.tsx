import React from 'react';
import {HashRouter as Router, Route, Switch,} from "react-router-dom";

import styles from './App.module.css';

import {MDForm} from "./components/forms/MDForm/MDForm";
import {AHPForm} from "./components/forms/AHPForm/AHPForm";
import {MethodAccordion, MethodAccordionType} from "./components/MethodsAccordion/MethodsAccordion";
import {PreferenceForm} from "./components/forms/PreferenceForm/PreferenceForm";
import {Routes, routes} from "./routes";
import {RangForm} from "./components/forms/RangForm/RangForm";
import {LSOForm} from "./components/forms/LSOForm/LSOForm";

function App() {
    return (
        <Router>
            <div className={styles.app}>
                <Switch>
                    <Route path={routes[Routes.Group]}>
                        <MethodAccordion type={MethodAccordionType.Group} className={styles.menu}/>
                    </Route>
                    <Route path={routes[Routes.Individual]}>
                        <MethodAccordion type={MethodAccordionType.Individual} className={styles.menu}/>
                    </Route>
                    <Route path={routes[Routes.AHP]}>
                        <AHPForm/>
                    </Route>
                    <Route path={routes[Routes.MD]}>
                        <MDForm/>
                    </Route>
                    <Route path={routes[Routes.Preference]}>
                        <PreferenceForm/>
                    </Route>
                    <Route path={routes[Routes.Rang]}>
                        <RangForm/>
                    </Route>
                    <Route path={routes[Routes.LSO]}>
                        <LSOForm/>
                    </Route>
                    <Route path={routes[Routes.Home]}>
                        <MethodAccordion type={MethodAccordionType.All} className={styles.menu}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
