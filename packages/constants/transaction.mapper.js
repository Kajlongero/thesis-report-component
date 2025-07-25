const transactionIdMapper = Object.freeze({
  Login: 0,
  Signup: 1,
  GetUserData: 2,
  RecoverPassword: 3,
  ResetPassword: 4,
  ConfirmAccount: 5,
  RefreshToken: 6,
  InactivateSession: 7,
  UserHasPermission: 8,
  ValidateSession: 9,
  ProcessCreateReport: 10,
  GenerateCSV: 11,
  GenerateHTML: 12,
  GenerateXLSX: 13,
  GeneratePDF: 14,
  GenerateDOCX: 15,
  GetAllReports: 16,
  GetReportById: 17,
  CreateReports: 18,
  CreateTemplate: 19,
  UpdateTemplate: 20,
  DeactivateTemplate: 21,
  DeleteTemplate: 22,
  GetAllLogs: 23,
  GetLogById: 24,
  DownloadLogs: 25,
  ClearLogs: 26,
  GetAllAuditLogs: 27,
  GetAuditByIdLogs: 28,
  DownloadAuditLogs: 29,
});

module.exports = transactionIdMapper;
