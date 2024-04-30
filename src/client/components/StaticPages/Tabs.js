import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

export default function Tabs(props) {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <div className="pharmacyHomeTabview content-container-row">
            <Nav tabs className="container">
                <NavItem>
                    <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        Drugs by Therapeutic Category
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        Surgicals Products by category
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className="p-3 mb-3 brandswraper" activeTab={activeTab}>
                <TabPane tabId="1">
                    <h5 className="mb-4">Browse drugs by Therapeutic category<span>&nbsp;</span></h5>
                    <ul className="drugsCategory">
                        <li className="categoryList">
                            <h5 title="Gastrointestinal &amp; Hepatobiliary System"><i className="angle-right"></i>Gastrointestinal &amp; Hepatobiliary System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/antacids-antireflux-agents-n-antiulcerants_10003" title="Antacids, Antireflux Agents &amp; Antiulcerants">Antacids, Antireflux Agents &amp; Antiulcerants</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/git-regulators-n-anti-inflammatories_10004" title="GIT Regulators &amp; Anti-Inflammatories">GIT Regulators &amp; Anti-Inflammatories</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/antispasmodics_10005" title="Antispasmodics">Antispasmodics</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/antidiarrheals_10006" title="Antidiarrheals">Antidiarrheals</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/laxatives-purgatives_10007" title="Laxatives, Purgatives">Laxatives, Purgatives</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/digestives-and-antiflatulents_10008" title="Digestives and Antiflatulents">Digestives and Antiflatulents</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/cholagogues-cholelitholytics-n-hepatic-protectors_10009" title="Cholagogues, Cholelitholytics &amp; Hepatic Protectors">Cholagogues, Cholelitholytics &amp; Hepatic Protectors</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/anorectal-preparations_10010" title="Anorectal Preparations">Anorectal Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/antiemetics_10011" title="Antiemetics">Antiemetics</a></li>
                                <li><a href="/drugsInfo/medicines/gastrointestinal-n-hepatobiliary-system_10002/other-gastrointestinal-drugs_10012" title="Other Gastrointestinal Drugs">Other Gastrointestinal Drugs</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Cardiovascular &amp; Hematopoietic system"><i className="angle-right"></i>Cardiovascular &amp; Hematopoietic system</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/cardiac-drugs_10014" title="Cardiac Drugs">Cardiac Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/anti-anginal-drugs_10015" title="Anti-Anginal Drugs">Anti-Anginal Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/ace-inhibitors-direct-renin-inhibitors_10016" title="ACE Inhibitors / Direct Renin Inhibitors">ACE Inhibitors / Direct Renin Inhibitors</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/beta-blockers_10017" title="Beta-Blockers">Beta-Blockers</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/calcium-antagonists_10018" title="Calcium Antagonists">Calcium Antagonists</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/angiotensin-ii-antagonists_10019" title="Angiotensin II Antagonists">Angiotensin II Antagonists</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/other-antihypertensives_10020" title="Other Antihypertensives">Other Antihypertensives</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/diuretics_10021" title="Diuretics">Diuretics</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/antidiuretics_10022" title="Antidiuretics">Antidiuretics</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/peripheral-vasodilators-n-cerebral-activators_10023" title="Peripheral Vasodilators &amp; Cerebral Activators">Peripheral Vasodilators &amp; Cerebral Activators</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/vasoconstrictors_10024" title="Vasoconstrictors">Vasoconstrictors</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/dyslipidaemic-agents_10025" title="Dyslipidaemic Agents">Dyslipidaemic Agents</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/haemostatics_10026" title="Haemostatics">Haemostatics</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/anticoagulants-and-antiplatelets_10027" title="Anticoagulants and Antiplatelets">Anticoagulants and Antiplatelets</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/fibrinolytics-n-thrombolytics_10028" title="Fibrinolytics &amp; Thrombolytics">Fibrinolytics &amp; Thrombolytics</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/phlebitis-n-varicose-preparations_10029" title="Phlebitis &amp; Varicose Preparations">Phlebitis &amp; Varicose Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/haemorrheologicals_10030" title="Haemorrheologicals">Haemorrheologicals</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/haematopoietic-agents_10031" title="Haematopoietic Agents">Haematopoietic Agents</a></li>
                                <li><a href="/drugsInfo/medicines/cardiovascular-n-hematopoietic-system_10013/other-cardiovascular-drugs_10032" title="Other Cardiovascular Drugs">Other Cardiovascular Drugs</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Respiratory System"><i className="angle-right"></i>Respiratory System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/respiratory-system_10033/respiratory-stimulants_10034" title="Respiratory Stimulants">Respiratory Stimulants</a></li>
                                <li><a href="/drugsInfo/medicines/respiratory-system_10033/antiasthmatic-n-copd-preparations_10035" title="Antiasthmatic &amp; COPD Preparations">Antiasthmatic &amp; COPD Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/respiratory-system_10033/cough-n-cold-preparations_10036" title="Cough &amp; Cold Preparations">Cough &amp; Cold Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/respiratory-system_10033/nasal-decongestants-n-other-nasal-preparations_10037" title="Nasal Decongestants &amp; Other Nasal Preparations">Nasal Decongestants &amp; Other Nasal Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/respiratory-system_10033/other-drugs-acting-on-the-respiratory-system_10038" title="Other Drugs Acting on the Respiratory System">Other Drugs Acting on the Respiratory System</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Central Nervous System"><i className="angle-right"></i>Central Nervous System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/anxiolytics_10040" title="Anxiolytics">Anxiolytics</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/hypnotics-n-sedatives_10041" title="Hypnotics &amp; Sedatives">Hypnotics &amp; Sedatives</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/antidepressants_10042" title="Antidepressants">Antidepressants</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/antipsychotics_10043" title="Antipsychotics">Antipsychotics</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/anticonvulsants_10044" title="Anticonvulsants">Anticonvulsants</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/other-cns-drugs-n-agents-for-adhd_10045" title="Other CNS Drugs &amp; Agents for ADHD">Other CNS Drugs &amp; Agents for ADHD</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/neurodegenerative-disease-drugs_10046" title="Neurodegenerative Disease Drugs">Neurodegenerative Disease Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/antiparkinsonian-drugs_10047" title="Antiparkinsonian Drugs">Antiparkinsonian Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/antivertigo-drugs_10048" title="Antivertigo Drugs">Antivertigo Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/opioid-analgesics_10049" title="Opioid Analgesics">Opioid Analgesics</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/non-opioid-analgesics-n-antipyretics_10050" title="Non-Opioid Analgesics &amp; Antipyretics">Non-Opioid Analgesics &amp; Antipyretics</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/drugs-for-neuropathic-pain_10051" title="Drugs For Neuropathic Pain">Drugs For Neuropathic Pain</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/antimigraine-preparations_10052" title="Antimigraine Preparations">Antimigraine Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/central-nervous-system_10039/nootropics-n-neurotonics-neurotrophics_10053" title="Nootropics &amp; Neurotonics/Neurotrophics">Nootropics &amp; Neurotonics/Neurotrophics</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Musculo-Skeletal System"><i className="angle-right"></i>Musculo-Skeletal System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/disease-modifying-anti-rheumatic-drugs-dmards-_10055" title="Disease-Modifying Anti-Rheumatic Drugs (DMARDs)">Disease-Modifying Anti-Rheumatic Drugs (DMARDs)</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/nonsteroidal-anti-inflammatory-drugs-nsaids-_10056" title="Nonsteroidal Anti-Inflammatory Drugs (NSAIDs)">Nonsteroidal Anti-Inflammatory Drugs (NSAIDs)</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/hyperuricemia-n-gout-preparations_10057" title="Hyperuricemia &amp; Gout Preparations">Hyperuricemia &amp; Gout Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/muscle-relaxants_10058" title="Muscle Relaxants">Muscle Relaxants</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/anti-inflammatory-enzymes_10059" title="Anti-Inflammatory Enzymes">Anti-Inflammatory Enzymes</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/neuromuscular-disorder-drugs_10060" title="Neuromuscular Disorder Drugs">Neuromuscular Disorder Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/musculo-skeletal-system_10054/other-drugs-acting-on-musculo-skeletal-system_10061" title="Other Drugs Acting on Musculo-Skeletal System">Other Drugs Acting on Musculo-Skeletal System</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Hormones"><i className="angle-right"></i>Hormones</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/hormones_10062/androgens-n-related-synthetic-drugs_10063" title="Androgens &amp; Related Synthetic Drugs">Androgens &amp; Related Synthetic Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/oestrogens-n-progesterones-n-related-synthetic-drugs_10064" title="Oestrogens &amp; Progesterones &amp; Related Synthetic Drugs">Oestrogens &amp; Progesterones &amp; Related Synthetic Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/combined-sex-hormones_10065" title="Combined Sex Hormones">Combined Sex Hormones</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/corticosteroid-hormones_10066" title="Corticosteroid Hormones">Corticosteroid Hormones</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/trophic-hormones-n-related-synthetic-drugs_10067" title="Trophic Hormones &amp; Related Synthetic Drugs">Trophic Hormones &amp; Related Synthetic Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/anabolic-agents_10068" title="Anabolic Agents">Anabolic Agents</a></li>
                                <li><a href="/drugsInfo/medicines/hormones_10062/other-drugs-affecting-hormonal-regulation_10069" title="Other Drugs Affecting Hormonal Regulation">Other Drugs Affecting Hormonal Regulation</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Contraceptive Agents"><i className="angle-right"></i>Contraceptive Agents</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/contraceptive-agents_10070/oral-contraceptives_10071" title="Oral Contraceptives">Oral Contraceptives</a></li>
                                <li><a href="/drugsInfo/medicines/contraceptive-agents_10070/depot-contraceptives_10072" title="Depot Contraceptives">Depot Contraceptives</a></li>
                                <li><a href="/drugsInfo/medicines/contraceptive-agents_10070/other-contraceptives_10073" title="Other Contraceptives">Other Contraceptives</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Infectious Disease Drugs"><i className="angle-right"></i>Infectious Disease Drugs</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/aminoglycosides_10075" title="Aminoglycosides">Aminoglycosides</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/cephalosporins_10076" title="Cephalosporins">Cephalosporins</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/penicillins_10077" title="Penicillins">Penicillins</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/other-beta-lactams_10078" title="Other Beta-Lactams">Other Beta-Lactams</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/chloramphenicols_10079" title="Chloramphenicols">Chloramphenicols</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/macrolides_10080" title="Macrolides">Macrolides</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/quinolones_10081" title="Quinolones">Quinolones</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/tetracyclines_10082" title="Tetracyclines">Tetracyclines</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/sulphonamides_10083" title="Sulphonamides">Sulphonamides</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antibacterial-combinations_10084" title="Antibacterial Combinations">Antibacterial Combinations</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/other-antibiotics_10085" title="Other Antibiotics">Other Antibiotics</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/anti-tb-agents_10086" title="Anti-TB Agents">Anti-TB Agents</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antileprotics_10087" title="Antileprotics">Antileprotics</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antifungals_10088" title="Antifungals">Antifungals</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antivirals_10089" title="Antivirals">Antivirals</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/anthelmintics_10090" title="Anthelmintics">Anthelmintics</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antimalarials_10091" title="Antimalarials">Antimalarials</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/antiamoebics_10092" title="Antiamoebics">Antiamoebics</a></li>
                                <li><a href="/drugsInfo/medicines/infectious-disease-drugs_10074/other-antiprotozoal-agents_10093" title="Other Antiprotozoal Agents">Other Antiprotozoal Agents</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Oncology"><i className="angle-right"></i>Oncology</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/oncology_10094/cytotoxic-chemotherapy_10095" title="Cytotoxic Chemotherapy">Cytotoxic Chemotherapy</a></li>
                                <li><a href="/drugsInfo/medicines/oncology_10094/hormonal-chemotherapy_10096" title="Hormonal Chemotherapy">Hormonal Chemotherapy</a></li>
                                <li><a href="/drugsInfo/medicines/oncology_10094/immunological-chemotherapy_10097" title="Immunological Chemotherapy">Immunological Chemotherapy</a></li>
                                <li><a href="/drugsInfo/medicines/oncology_10094/targeted-cancer-therapy_10098" title="Targeted Cancer Therapy">Targeted Cancer Therapy</a></li>
                                <li><a href="/drugsInfo/medicines/oncology_10094/supportive-care-therapy_10099" title="Supportive Care Therapy">Supportive Care Therapy</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Genito - Urinary System"><i className="angle-right"></i>Genito - Urinary System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/preparations-for-vaginal-conditions_10101" title="Preparations for Vaginal Conditions">Preparations for Vaginal Conditions</a></li>
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/urinary-antiseptics_10102" title="Urinary Antiseptics">Urinary Antiseptics</a></li>
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/drugs-acting-on-the-uterus_10103" title="Drugs Acting on the Uterus">Drugs Acting on the Uterus</a></li>
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/drugs-for-erectile-dysfunction_10104" title="Drugs for Erectile Dysfunction">Drugs for Erectile Dysfunction</a></li>
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/drugs-for-bladder-n-prostate-disorders_10105" title="Drugs for Bladder &amp; Prostate Disorders">Drugs for Bladder &amp; Prostate Disorders</a></li>
                                <li><a href="/drugsInfo/medicines/genito-urinary-system_10100/other-drugs-acting-on-the-genito-urinary-system_10106" title="Other Drugs Acting on the Genito-Urinary System">Other Drugs Acting on the Genito-Urinary System</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Endocrine &amp; Metabolic System"><i className="angle-right"></i>Endocrine &amp; Metabolic System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/insulin-preparations_10108" title="Insulin Preparations">Insulin Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/antidiabetic-agents_10109" title="Antidiabetic Agents">Antidiabetic Agents</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/thyroid-hormones_10110" title="Thyroid Hormones">Thyroid Hormones</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/antithyroid-agents_10111" title="Antithyroid Agents">Antithyroid Agents</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/anti-obesity-agents_10112" title="Anti-Obesity Agents">Anti-Obesity Agents</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/agents-affecting-bone-metabolism_10113" title="Agents Affecting Bone Metabolism">Agents Affecting Bone Metabolism</a></li>
                                <li><a href="/drugsInfo/medicines/endocrine-n-metabolic-system_10107/other-agents-affecting-metabolism_10114" title="Other Agents Affecting Metabolism">Other Agents Affecting Metabolism</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Vitamins &amp; Minerals"><i className="angle-right"></i> Vitamins &amp; Minerals</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/-vitamins-n-minerals_10115/vitamins_10116" title="Vitamins">Vitamins</a></li>
                                <li><a href="/drugsInfo/medicines/-vitamins-n-minerals_10115/calcium-preparations_10117" title="Calcium Preparations">Calcium Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/-vitamins-n-minerals_10115/minerals_10118" title="Minerals">Minerals</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Nutrition"><i className="angle-right"></i>Nutrition</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/nutrition_10119/infant-nutritional-products_10120" title="Infant Nutritional Products">Infant Nutritional Products</a></li>
                                <li><a href="/drugsInfo/medicines/nutrition_10119/enteral-nutritional-products_10121" title="Enteral/Nutritional Products">Enteral/Nutritional Products</a></li>
                                <li><a href="/drugsInfo/medicines/nutrition_10119/parenteral-nutritional-products_10122" title="Parenteral Nutritional Products">Parenteral Nutritional Products</a></li>
                                <li><a href="/drugsInfo/medicines/nutrition_10119/electrolytes_10123" title="Electrolytes">Electrolytes</a></li>
                                <li><a href="/drugsInfo/medicines/nutrition_10119/appetite-enhancers_10124" title="Appetite Enhancers">Appetite Enhancers</a></li>
                                <li><a href="/drugsInfo/medicines/nutrition_10119/supplements-n-adjuvant-therapy_10125" title="Supplements &amp; Adjuvant Therapy">Supplements &amp; Adjuvant Therapy</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Eye"><i className="angle-right"></i>Eye</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/eye_10126/eye-anti-infectives-n-antiseptics_10127" title="Eye Anti-Infectives &amp; Antiseptics">Eye Anti-Infectives &amp; Antiseptics</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/eye-corticosteroids_10128" title="Eye Corticosteroids">Eye Corticosteroids</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/mydriatic-drugs_10129" title="Mydriatic Drugs">Mydriatic Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/miotic-drugs_10130" title="Miotic Drugs">Miotic Drugs</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/antiglaucoma-preparations_10131" title="Antiglaucoma Preparations">Antiglaucoma Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/ophthalmic-decongestants-anaesthetics-anti-inflammatories_10132" title="Ophthalmic Decongestants, Anaesthetics, Anti-Inflammatories">Ophthalmic Decongestants, Anaesthetics, Anti-Inflammatories</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/ophthalmic-lubricants_10133" title="Ophthalmic Lubricants">Ophthalmic Lubricants</a></li>
                                <li><a href="/drugsInfo/medicines/eye_10126/other-eye-preparations_10134" title="Other Eye Preparations">Other Eye Preparations</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Ear &amp; Mouth / Throat"><i className="angle-right"></i>Ear &amp; Mouth / Throat</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/ear-n-mouth-throat_10135/ear-anti-infectives-n-antiseptics_10136" title="Ear Anti-Infectives &amp; Antiseptics">Ear Anti-Infectives &amp; Antiseptics</a></li>
                                <li><a href="/drugsInfo/medicines/ear-n-mouth-throat_10135/ear-corticosteroids_10137" title="Ear Corticosteroids">Ear Corticosteroids</a></li>
                                <li><a href="/drugsInfo/medicines/ear-n-mouth-throat_10135/other-ear-preparations_10138" title="Other Ear Preparations">Other Ear Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/ear-n-mouth-throat_10135/mouth-throat-preparations_10139" title="Mouth/Throat Preparations">Mouth/Throat Preparations</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Dermatologicals"><i className="angle-right"></i>Dermatologicals</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/topical-antibiotics_10141" title="Topical Antibiotics">Topical Antibiotics</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/topical-antifungals-n-antiparasites_10142" title="Topical Antifungals &amp; Antiparasites">Topical Antifungals &amp; Antiparasites</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/topical-antivirals_10143" title="Topical Antivirals">Topical Antivirals</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/topical-corticosteroids_10144" title="Topical Corticosteroids">Topical Corticosteroids</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/topical-antihistamines-antipruritics_10145" title="Topical Antihistamines/Antipruritics">Topical Antihistamines/Antipruritics</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/acne-treatment-preparations_10146" title="Acne Treatment Preparations">Acne Treatment Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/psoriasis-seborrhea-n-ichthyosis-preparations_10147" title="Psoriasis, Seborrhea &amp; Ichthyosis Preparations">Psoriasis, Seborrhea &amp; Ichthyosis Preparations</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/keratolytics_10148" title="Keratolytics">Keratolytics</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/emollients-n-skin-protectives_10149" title="Emollients &amp; Skin Protectives">Emollients &amp; Skin Protectives</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/skin-antiseptics-n-disinfectants_10150" title="Skin Antiseptics &amp; Disinfectants">Skin Antiseptics &amp; Disinfectants</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/medicated-surgical-dressings_10151" title="Medicated Surgical Dressings">Medicated Surgical Dressings</a></li>
                                <li><a href="/drugsInfo/medicines/dermatologicals_10140/other-dermatologicals_10152" title="Other Dermatologicals">Other Dermatologicals</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Anaesthetics &amp; Intravenous Solutions"><i className="angle-right"></i>Anaesthetics &amp; Intravenous Solutions</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/anaesthetics-n-intravenous-solutions_10153/anaesthetics-local-n-general_10154" title="Anaesthetics - Local &amp; General">Anaesthetics - Local &amp; General</a></li>
                                <li><a href="/drugsInfo/medicines/anaesthetics-n-intravenous-solutions_10153/intravenous-n-other-sterile-solutions_10155" title="Intravenous &amp; other sterile solutions">Intravenous &amp; other sterile solutions</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Allergy &amp; Immune System"><i className="angle-right"></i>Allergy &amp; Immune System</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/allergy-n-immune-system_10156/antihistamines-n-antiallergics_10157" title="Antihistamines &amp; Antiallergics">Antihistamines &amp; Antiallergics</a></li>
                                <li><a href="/drugsInfo/medicines/allergy-n-immune-system_10156/vaccines-antisera-n-immunologicals_10158" title="Vaccines, Antisera &amp; Immunologicals">Vaccines, Antisera &amp; Immunologicals</a></li>
                                <li><a href="/drugsInfo/medicines/allergy-n-immune-system_10156/immunosuppressants_10159" title="Immunosuppressants">Immunosuppressants</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 className="d-flex" title=" Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence"><i className="angle-right"></i> Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/-antidotes-detoxifying-agents-n-drugs-used-in-substance-dependence_10160/-antidotes-and-detoxifying-agents_10161" title=" Antidotes and Detoxifying Agents"> Antidotes and Detoxifying Agents</a></li>
                                <li><a href="/drugsInfo/medicines/-antidotes-detoxifying-agents-n-drugs-used-in-substance-dependence_10160/drugs-used-in-substance-dependence_10162" title="Drugs used in Substance Dependence">Drugs used in Substance Dependence</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Miscellaneous"><i className="angle-right"></i>Miscellaneous</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/medicines/miscellaneous_10163/miscellaneous_10164" title="Miscellaneous">Miscellaneous</a></li>
                                <li><a href="/drugsInfo/medicines/miscellaneous_10163/tissue-adhesives_10165" title="Tissue Adhesives">Tissue Adhesives</a></li>
                            </ul>

                        </li>
                    </ul>
                </TabPane>
                <TabPane tabId="2">
                    <h5 className="mb-4">Browse Surgicals products by category<span>&nbsp;</span></h5>
                    <ul className="drugsCategory">
                        <li className="categoryList">
                            <h5 title="Anaesthesia"><i className="angle-right"></i>Anaesthesia</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/anaesthesia_11001/agents_11002" title="Agents">Agents</a></li>
                                <li><a href="/drugsInfo/surgicals/anaesthesia_11001/equipment-kits-devices_11003" title="Equipment/Kits/Devices">Equipment/Kits/Devices</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Cardiovascular"><i className="angle-right"></i>Cardiovascular</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/cardiovascular_11004/cathlab_11005" title="Cathlab">Cathlab</a></li>
                                <li><a href="/drugsInfo/surgicals/cardiovascular_11004/defibrillators-monitors_11006" title="Defibrillators/Monitors">Defibrillators/Monitors</a></li>
                                <li><a href="/drugsInfo/surgicals/cardiovascular_11004/ecg-and-accessories_11007" title="ECG and Accessories">ECG and Accessories</a></li>
                                <li><a href="/drugsInfo/surgicals/cardiovascular_11004/bp-n-pressure-monitoring-devices_11051" title="BP &amp; Pressure Monitoring Devices">BP &amp; Pressure Monitoring Devices</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="CSSD"><i className="angle-right"></i>CSSD</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/cssd_11008/antiseptics-disinfectants_11009" title="Antiseptics/Disinfectants">Antiseptics/Disinfectants</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/sterilization-products_11010" title="Sterilization Products">Sterilization Products</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/surgical-wear_11011" title="Surgical Wear">Surgical Wear</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/linen_11012" title="Linen">Linen</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/stationery_11013" title="Stationery">Stationery</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/ward-equipment_11014" title="Ward Equipment">Ward Equipment</a></li>
                                <li><a href="/drugsInfo/surgicals/cssd_11008/miscellaneous-supplies_11015" title="Miscellaneous Supplies">Miscellaneous Supplies</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="Catheters &amp; Tubes"><i className="angle-right"></i>Catheters &amp; Tubes</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/catheters-n-tubes_11016/feeding-tubes_11017" title="Feeding Tubes">Feeding Tubes</a></li>
                                <li><a href="/drugsInfo/surgicals/catheters-n-tubes_11016/catheters_11018" title="Catheters">Catheters</a></li>
                                <li><a href="/drugsInfo/surgicals/catheters-n-tubes_11016/drains_11019" title="Drains">Drains</a></li>
                                <li><a href="/drugsInfo/surgicals/catheters-n-tubes_11016/suctions_11020" title="Suctions">Suctions</a></li>
                                <li><a href="/drugsInfo/surgicals/catheters-n-tubes_11016/accessories_11021" title="Accessories">Accessories</a></li>
                            </ul>
                        </li>
                        <li className="categoryList">
                            <h5 title="IV Needs"><i className="angle-right"></i>IV Needs</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/iv-needs_11022/cannulas-n-infusion-sets_11023" title="Cannulas &amp; Infusion Sets">Cannulas &amp; Infusion Sets</a></li>
                                <li><a href="/drugsInfo/surgicals/iv-needs_11022/iv-fluids-n-infusions_11024" title="IV Fluids &amp; Infusions">IV Fluids &amp; Infusions</a></li>
                                <li><a href="/drugsInfo/surgicals/iv-needs_11022/syringes-n-needles_11025" title="Syringes &amp; Needles">Syringes &amp; Needles</a></li>
                                <li><a href="/drugsInfo/surgicals/iv-needs_11022/vaccutainers-n-containers_11026" title="Vaccutainers &amp; Containers">Vaccutainers &amp; Containers</a></li>
                                <li><a href="/drugsInfo/surgicals/iv-needs_11022/phlebotomy-aids_11027" title="Phlebotomy Aids">Phlebotomy Aids</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Mobilization Equipment"><i className="angle-right"></i>Mobilization Equipment</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/mobilization-equipment_11028/trolleys-n-wheelchairs_11029" title="Trolleys &amp; Wheelchairs">Trolleys &amp; Wheelchairs</a></li>
                                <li><a href="/drugsInfo/surgicals/mobilization-equipment_11028/walkers_11030" title="Walkers">Walkers</a></li>
                                <li><a href="/drugsInfo/surgicals/mobilization-equipment_11028/others_11031" title="Others">Others</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Orthopaedic"><i className="angle-right"></i>Orthopaedic</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/orthopaedic_11032/instruments-n-accessories_11033" title="Instruments &amp; Accessories">Instruments &amp; Accessories</a></li>
                                <li><a href="/drugsInfo/surgicals/orthopaedic_11032/implants_11034" title="Implants">Implants</a></li>
                                <li><a href="/drugsInfo/surgicals/orthopaedic_11032/casts-n-cement_11035" title="Casts &amp; Cement">Casts &amp; Cement</a></li>
                                <li><a href="/drugsInfo/surgicals/orthopaedic_11032/supports-n-braces_11036" title="Supports &amp; Braces">Supports &amp; Braces</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Surgicals"><i className="angle-right"></i>Surgicals</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/instruments-n-accessories_11038" title="Instruments &amp; Accessories">Instruments &amp; Accessories</a></li>
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/implants_11039" title="Implants">Implants</a></li>
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/sutures-n-suture-removal_11040" title="Sutures &amp; Suture removal">Sutures &amp; Suture removal</a></li>
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/other-wound-closing-aids_11041" title="Other Wound Closing Aids">Other Wound Closing Aids</a></li>
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/bandages-n-dressings_11042" title="Bandages &amp; Dressings">Bandages &amp; Dressings</a></li>
                                <li><a href="/drugsInfo/surgicals/surgicals_11037/miscellaneous-ot-supplies_11043" title="Miscellaneous OT Supplies">Miscellaneous OT Supplies</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Pulmonary/Emergency Care"><i className="angle-right"></i>Pulmonary/Emergency Care</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/pulmonary-emergency-care_11044/crash-cart-supplies_11045" title="Crash Cart Supplies">Crash Cart Supplies</a></li>
                                <li><a href="/drugsInfo/surgicals/pulmonary-emergency-care_11044/oxygen-n-administration-products_11046" title="Oxygen &amp; Administration Products">Oxygen &amp; Administration Products</a></li>
                                <li><a href="/drugsInfo/surgicals/pulmonary-emergency-care_11044/nebulizers-n-respiratory-devices_11047" title="Nebulizers &amp; Respiratory Devices">Nebulizers &amp; Respiratory Devices</a></li>
                            </ul>

                        </li>
                        <li className="categoryList">
                            <h5 title="Diagnostic/Imaging"><i className="angle-right"></i>Diagnostic/Imaging</h5>
                            <ul className="inline-list">
                                <li><a href="/drugsInfo/surgicals/diagnostic-imaging_11048/reagents-n-consumables_11049" title="Reagents &amp; Consumables">Reagents &amp; Consumables</a></li>
                                <li><a href="/drugsInfo/surgicals/diagnostic-imaging_11048/instruments-n-accessories_11050" title="Instruments &amp; Accessories">Instruments &amp; Accessories</a></li>
                            </ul>

                        </li>
                    </ul>
                </TabPane>
            </TabContent>
        </div>
    );
}
