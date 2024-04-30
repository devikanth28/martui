import React from 'react'
import AlphabetwiseProductsPlaceholders from './AlphabetwiseProductsPlaceholders'
const AlphabetWiseProducts = () => {
    const subAlphabets=["A","AB","AC","AD","AE","AF"];
    return (
        <React.Fragment>
            <section className='p-4 alphabetwise-products-list' >
                <div class="mb-4"><h2>Find information on drugs <span class="font-weight-light">by alphabet</span></h2></div>
                <div className='Alphabet p-2'>
                    <ul class="d-flex flex-wrap justify-content-center list-inline mb-0">
                        <li><a href="javascript:void(0)" className='active' title="View products starts with 0 - 9">0 - 9</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with A">A</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with B">B</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with C">C</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with D">D</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with E">E</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with F">F</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with G">G</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with H">H</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with I">I</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with J">J</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with K">K</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with L">L</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with M">M</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with N">N</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with O">O</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with P">P</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with Q">Q</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with R">R</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with S">S</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with T">T</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with U">U</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with V">V</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with W">W</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with X">X</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with Y">Y</a></li>
                        <li><a href="javascript:void(0)" className='' title="View products starts with Z">Z</a></li>
                    </ul>
                </div>
                <ul class="nav sub-alphabets">
                           {subAlphabets.map((key,value)=>{
                               return (
                                   <li className={`nav-item ${value == 2 ? 'active' :""}`}>
                                       <a className="nav-link" href="javascript:void(0)" title={key} role="tab" aria-controls={key}>{key}</a>
                                   </li>
                               )
                           })}
                    </ul>
                <ul class="search-product-list row pl-3 mt-3">

                    <li><a href="javascript:void(0)" title="VIAGRA 50MG TAB">VIAGRA 50MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="AZTRIC 80MG TAB">AZTRIC 80MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="MTP KIT TAB">MTP KIT TAB</a></li>

                    <li><a href="javascript:void(0)" title="MIFEGEST KIT">MIFEGEST KIT</a></li>

                    <li><a href="javascript:void(0)" title="VIAGRA 100MG TAB">VIAGRA 100MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="DOLO 1000MG TAB">DOLO 1000MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="MANFORCE 50MG TAB">MANFORCE 50MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="SHELCAL XT TAB">SHELCAL XT TAB</a></li>

                    <li><a href="javascript:void(0)" title="CHYMORAL FORTE TAB">CHYMORAL FORTE TAB</a></li>

                    <li><a href="javascript:void(0)" title="ZERODOL SP TAB">ZERODOL SP TAB</a></li>

                    <li><a href="javascript:void(0)" title="MODALERT 200MG TAB">MODALERT 200MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="NUROKIND PLUS RF CAP">NUROKIND PLUS RF CAP</a></li>

                    <li><a href="javascript:void(0)" title="CIALIS 20MG TAB">CIALIS 20MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="REJUNEX CD3 TAB">REJUNEX CD3 TAB</a></li>

                    <li><a href="javascript:void(0)" title="ULTRACET TAB">ULTRACET TAB</a></li>

                    <li><a href="javascript:void(0)" title="INFLUVAC 0.5ML INJ">INFLUVAC 0.5ML INJ</a></li>

                    <li><a href="javascript:void(0)" title="PAN D CAP">PAN D CAP</a></li>

                    <li><a href="javascript:void(0)" title="DOLO 650MG TAB">DOLO 650MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="HEALTH OK TAB">HEALTH OK TAB</a></li>

                    <li><a href="javascript:void(0)" title="ZAC D CHEWABLE TAB">ZAC D CHEWABLE TAB</a></li>

                    <li><a href="javascript:void(0)" title="LANTUS CARTRIDGE 100IU 3ML INJ">LANTUS CARTRIDGE 100IU 3ML INJ</a></li>

                    <li><a href="javascript:void(0)" title="NUHENZ CAP">NUHENZ CAP</a></li>

                    <li><a href="javascript:void(0)" title="ASCORIL 100ML EXPECTORANT">ASCORIL 100ML EXPECTORANT</a></li>

                    <li><a href="javascript:void(0)" title="OROFER FCM 500MG 10ML INJ">OROFER FCM 500MG 10ML INJ</a></li>

                    <li><a href="javascript:void(0)" title="RENERVE PLUS CAP">RENERVE PLUS CAP</a></li>

                    <li><a href="javascript:void(0)" title="PAN 40MG TAB">PAN 40MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="DUPHASTON 10MG TAB">DUPHASTON 10MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="ALOX 60GM CREAM">ALOX 60GM CREAM</a></li>

                    <li><a href="javascript:void(0)" title="VIAGRA 25MG TAB">VIAGRA 25MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="HEPTAGON TAB">HEPTAGON TAB</a></li>

                    <li><a href="javascript:void(0)" title="NUROKIND LC TAB">NUROKIND LC TAB</a></li>

                    <li><a href="javascript:void(0)" title="ASCORIL D PLUS 100ML SYP">ASCORIL D PLUS 100ML SYP</a></li>

                    <li><a href="javascript:void(0)" title="MANFORCE STAYLONG TAB">MANFORCE STAYLONG TAB</a></li>

                    <li><a href="javascript:void(0)" title="GEMCAL CAP">GEMCAL CAP</a></li>

                    <li><a href="javascript:void(0)" title="ECOSPRIN GOLD 20MG CAP">ECOSPRIN GOLD 20MG CAP</a></li>

                    <li><a href="javascript:void(0)" title="MONTEK LC TAB">MONTEK LC TAB</a></li>

                    <li><a href="javascript:void(0)" title="ATIVAN 2MG TAB">ATIVAN 2MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="ECOSPRIN AV 75MG CAP">ECOSPRIN AV 75MG CAP</a></li>

                    <li><a href="javascript:void(0)" title="DOXT SL CAP">DOXT SL CAP</a></li>

                    <li><a href="javascript:void(0)" title="CANDIFORCE 200MG CAP">CANDIFORCE 200MG CAP</a></li>

                    <li><a href="javascript:void(0)" title="PENIDURE LA12 INJ">PENIDURE LA12 INJ</a></li>

                    <li><a href="javascript:void(0)" title="CHESTON COLD TAB">CHESTON COLD TAB</a></li>

                    <li><a href="javascript:void(0)" title="CARIPILL TAB">CARIPILL TAB</a></li>

                    <li><a href="javascript:void(0)" title="VIGORITE 50MG TAB">VIGORITE 50MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="A KARE KIT">A KARE KIT</a></li>

                    <li><a href="javascript:void(0)" title="MEFTAL SPAS TAB">MEFTAL SPAS TAB</a></li>

                    <li><a href="javascript:void(0)" title="HAIRBLESS TAB">HAIRBLESS TAB</a></li>

                    <li><a href="javascript:void(0)" title="AUGMENTIN DUO 625MG TAB">AUGMENTIN DUO 625MG TAB</a></li>

                    <li><a href="javascript:void(0)" title="SINAREST NEW TAB">SINAREST NEW TAB</a></li>

                    <li><a href="javascript:void(0)" title="SPASMO PROXYVON PLUS CAP">SPASMO PROXYVON PLUS CAP</a></li>
                </ul>

            </section>
            <AlphabetwiseProductsPlaceholders/>
        </React.Fragment>
    )
}
export default AlphabetWiseProducts
