// import {Label, LabelWithLanguage, LabelWithLanguageNl} from "../fields/label";
//
//
// export interface SameAsHaving {
//     readonly "owl:sameAs": string;
// }
//
// export interface LabelHaving {
//     readonly  "rdfs:label": Label[];
// }
//
// export interface LabelWithLanguageHaving extends LabelHaving {
//     readonly  "rdfs:label": LabelWithLanguage[];
// }
//
// export interface LabelWithLanguageNlHaving extends LabelWithLanguageHaving {
//     readonly "rdfs:label": LabelWithLanguageNl[];
// }
//
// export interface IdHaving {
//     readonly"@id": string;
// }
//
// export interface TypeHaving {
//     readonly"@type": string;
// }
//
// export type IdAndTypeHaving = IdHaving & TypeHaving;
//
//
// export interface KnownTypeWithDutchLabel extends IdHaving, LabelWithLanguageNlHaving, SameAsHaving {
//     readonly "key"?: string;
//     readonly "example"?: string;
// }
//
// export interface SubjectTyping {
//     readonly "rechtsgebied#bestuursrecht_vreemdelingenrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_socialezekerheidsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_europeesBestuursrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_bestuursstrafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_ambtenarenrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_personenEnFamilierecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_omgevingsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_insolventierecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_bestuursprocesrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#internationaalPubliekrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#internationaalPubliekrecht_mensenrechten": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_ondernemingsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht_strafprocesrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_internationaalPrivaatrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht_materieelStrafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht_europeesStrafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht_penitentiairStrafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_arbeidsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_goederenrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_burgerlijkProcesrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_aanbestedingsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_verbintenissenrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_intellectueeleigendomsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_mededingingsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#civielRecht_europeesCivielRecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#strafrecht_internationaalStrafrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_mededingingsrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht_belastingrecht": KnownTypeWithDutchLabel;
//     readonly "rechtsgebied#bestuursrecht": KnownTypeWithDutchLabel;
// }
//
// export interface ProcedureTyping {
//     readonly "procedure#eersteAanlegMeervoudig": KnownTypeWithDutchLabel;
//     readonly "procedure#verzet": KnownTypeWithDutchLabel;
//     readonly "procedure#hogerBeroep": KnownTypeWithDutchLabel;
//     readonly "procedure#voorlopigeVoorzieningbodemzaak": KnownTypeWithDutchLabel;
//     readonly "procedure#vereenvoudigdeBehandeling": KnownTypeWithDutchLabel;
//     readonly "procedure#tussenuitspraakBestuurlijkeLus": KnownTypeWithDutchLabel;
//     readonly "procedure#tussenbeschikking": KnownTypeWithDutchLabel;
//     readonly "procedure#prejudicieelVerzoek": KnownTypeWithDutchLabel;
//     readonly "procedure#beschikking": KnownTypeWithDutchLabel;
//     readonly "procedure#prejudicieleBeslissing": KnownTypeWithDutchLabel;
//     readonly "procedure#kortGeding": KnownTypeWithDutchLabel;
//     readonly "procedure#verwijzingNaHogeRaad": KnownTypeWithDutchLabel;
//     readonly "procedure#raadkamer": KnownTypeWithDutchLabel;
//     readonly "procedure#opTegenspraak": KnownTypeWithDutchLabel;
//     readonly "procedure#verstek": KnownTypeWithDutchLabel;
//     readonly "procedure#artikel80aROzaken": KnownTypeWithDutchLabel;
//     readonly "procedure#artikel81ROzaken": KnownTypeWithDutchLabel;
//     readonly "procedure#uitspraakNaPrejudicieleBeslissing": KnownTypeWithDutchLabel;
//     readonly "procedure#prejudicieleSpoedprocedure(PPU)": KnownTypeWithDutchLabel;
//     readonly "procedure#conservatoireMaatregel": KnownTypeWithDutchLabel;
//     readonly "procedure#rekestprocedure": KnownTypeWithDutchLabel;
//     readonly "procedure#procesverbaal": KnownTypeWithDutchLabel;
//     readonly "procedure#proceskostenveroordeling": KnownTypeWithDutchLabel;
//     readonly "procedure#versneldeBehandeling": KnownTypeWithDutchLabel;
//     readonly "procedure#schadevergoedingsuitspraak": KnownTypeWithDutchLabel;
//     readonly "procedure#cassatie": KnownTypeWithDutchLabel;
//     readonly "procedure#mondelingeUitspraak": KnownTypeWithDutchLabel;
//     readonly "procedure#hogerBeroepKortGeding": KnownTypeWithDutchLabel;
//     readonly "procedure#wraking": KnownTypeWithDutchLabel;
//     readonly "procedure#bodemzaak": KnownTypeWithDutchLabel;
//     readonly "procedure#herziening": KnownTypeWithDutchLabel;
//     readonly "procedure#herroeping": KnownTypeWithDutchLabel;
//     readonly "procedure#eersteEnEnigeAanleg": KnownTypeWithDutchLabel;
//     readonly "procedure#eersteAanlegEnkelvoudig": KnownTypeWithDutchLabel;
//     readonly "procedure#voorlopigeVoorziening": KnownTypeWithDutchLabel;
// }
//
// export interface GevolgTyping //= {[k in Gevolg]: KnownTypeWithDutchLabel}; // TODO simplify once typescript 2.4 releases with spread types
// {
//     readonly "gevolg#strekt tot vernietiging": KnownTypeWithDutchLabel;
//     readonly "gevolg#gedeeltelijke toewijzing vordering": KnownTypeWithDutchLabel;
//     readonly "gevolg#toewijzing vordering": KnownTypeWithDutchLabel;
//     readonly "gevolg#meerdere afhandelingswijzen": KnownTypeWithDutchLabel;
//     //noinspection SpellCheckingInspection,JSNonASCIINames
//     readonly "gevolg#prejudiciële beslissing": KnownTypeWithDutchLabel;
//     readonly "gevolg#overig": KnownTypeWithDutchLabel;
//     readonly "gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan": KnownTypeWithDutchLabel;
//     readonly "gevolg#niet ontvankelijk": KnownTypeWithDutchLabel;
//     readonly "gevolg#niet bevoegd": KnownTypeWithDutchLabel;
//     readonly "gevolg#gevolgd": KnownTypeWithDutchLabel;
//     readonly "gevolg#(Gedeeltelijke) vernietiging met verwijzen": KnownTypeWithDutchLabel;
//     readonly "gevolg#(Gedeeltelijke) vernietiging met terugwijzen": KnownTypeWithDutchLabel;
//     readonly "gevolg#onduidelijk": KnownTypeWithDutchLabel;
//     readonly "gevolg#contrair": KnownTypeWithDutchLabel;
//     readonly "gevolg#gedeeltelijk contrair": KnownTypeWithDutchLabel;
//     readonly "gevolg#toewijzing": KnownTypeWithDutchLabel;
//     readonly "gevolg#verzet toegewezen": KnownTypeWithDutchLabel;
//     readonly "gevolg#afwijzing": KnownTypeWithDutchLabel;
//     readonly "gevolg#verzet ongegrond": KnownTypeWithDutchLabel;
//     readonly "gevolg#afwijzing vordering": KnownTypeWithDutchLabel;
//     readonly "gevolg#gegrondverklaring": KnownTypeWithDutchLabel;
//     readonly "gevolg#bekrachtiging/bevestiging": KnownTypeWithDutchLabel;
// }
//
//
// export type ContextInterface = GevolgTyping & ProcedureTyping & SubjectTyping & {
//     readonly "@base": string;
//     readonly "schema": string;
//     readonly "foaf": string;
//     readonly "frbr": string;
//     readonly "rdf": string;
//     readonly "rdfs": string;
//     readonly "dcterms": string;
//     readonly "psi": string;
//     readonly "ecli": string;
//     readonly "cvdr": string;
//     readonly "eu": string;
//     readonly "tr": string;
//     readonly "xsd": string;
//     readonly "owl": string;
//     readonly "lawly": string;
//     readonly "ECLI": string;
//     readonly "_id": string;
//     readonly "abstract": string;
//     readonly "muhAccessRights": string;
//     readonly "muhCoverage": string;
//     readonly "muhHasVersion": string;
//     readonly "muhSpatial": string;
//     readonly "nl": IdHaving & LabelWithLanguageHaving;
//     readonly "creator": IdHaving;
//     readonly "date": IdHaving & TypeHaving;
//     readonly "hasVersion": string;
//     readonly "references": string;
//     readonly "spatial": string;
//     readonly "title": string;
//     readonly "zaaknummer": string;
//     readonly "accessRights": IdAndTypeHaving;
//     readonly "contentModified": IdAndTypeHaving;
//     readonly "metadataModified": IdAndTypeHaving;
//     readonly "coverage": IdAndTypeHaving;
//     readonly "htmlIssued": IdAndTypeHaving;
//     readonly "issued": IdAndTypeHaving;
//     readonly "language": IdAndTypeHaving;
//     readonly "procedure": IdAndTypeHaving;
//     readonly "replaces": IdAndTypeHaving;
//     readonly "subject": IdAndTypeHaving;
//     readonly "type": IdAndTypeHaving;
//     readonly "dcterms:modified": IdAndTypeHaving;
//     readonly "dcterms:issued": IdAndTypeHaving;
//     readonly "dcterms:date": IdAndTypeHaving;
//     readonly "dcterms:source": TypeHaving;
//     readonly "dcterms:isReferencedBy": TypeHaving;
//     readonly "owl:sameAs": TypeHaving;
//     readonly "psi:aanleg": TypeHaving;
//     readonly "psi:gevolg": TypeHaving;
//     readonly "psi:typeRelatie": TypeHaving;
//     readonly "oorspronkelijkBesluitDefinitiefBesluit": KnownTypeWithDutchLabel;
//     readonly "cassatie": KnownTypeWithDutchLabel;
//     readonly "prejudicieleVraag": KnownTypeWithDutchLabel;
//     readonly "sprongcassatie": KnownTypeWithDutchLabel;
//     readonly "ontnemingsvordering": KnownTypeWithDutchLabel;
//     readonly "inachtnemingPrejudicieleBeslissing": KnownTypeWithDutchLabel;
//     readonly "definitiefNaRectificatie": KnownTypeWithDutchLabel;
//     readonly "rectificatieBesluit": KnownTypeWithDutchLabel;
//     readonly "vervallenverklaring": KnownTypeWithDutchLabel;
//     readonly "uitspraak": KnownTypeWithDutchLabel;
//     readonly "conclusie": KnownTypeWithDutchLabel;
//     readonly "conclusieVoorCassatie": KnownTypeWithDutchLabel;
//     readonly "tussenuitspraakBestuurlijkeLus": KnownTypeWithDutchLabel;
//     readonly "verzet": KnownTypeWithDutchLabel;
//     readonly "nadereConclusie": KnownTypeWithDutchLabel;
//     readonly "conclusieVoorSprongcassatie": KnownTypeWithDutchLabel;
//     readonly "tussenuitspraak": KnownTypeWithDutchLabel;
//     readonly "herziening": KnownTypeWithDutchLabel;
//     readonly "terugverwijzing": KnownTypeWithDutchLabel;
//     readonly "verwijzing": KnownTypeWithDutchLabel;
//     readonly "hogerBeroep": KnownTypeWithDutchLabel;
//     readonly "Vervangt": string;
//     readonly "Procedure": string;
//     readonly "Instantie": string;
//     readonly "Zaaknr": string;
// }