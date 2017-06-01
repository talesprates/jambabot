
const GmailMessageHeaderEnum = {
  DELIVEREDTO: 0,
  RECEIVED: 1,
  XRECEIVED: 2,
  ARCSEAL: 3,
  ARCMESSAGESIGNATURE: 4,
  ARCAUTHENTICATIONRESULTS: 5,
  RETURNPATH: 6,
  RECEIVED_2: 7,
  RECEIVEDSPF: 8,
  AUTHENTICATIONRESULTS: 9,
  DKIMSIGNATURE: 10,
  DKIMSIGNATURE_2: 11,
  DATE: 12,
  FROM: 13,
  TO: 14,
  MESSAGEID: 15,
  SUBJECT: 16,
  MIMEVERSION: 17,
  CONTENTTYPE: 18,
  CONTENTTRANSFERENCODING: 19,
  XSESOUTGOING: 20,
  FEEDBACKID: 21
};

module.exports = GmailMessageHeaderEnum;
