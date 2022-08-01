
Imports System.IO
Imports System.Web.Services

Partial Class VB
    Inherits System.Web.UI.Page
    <WebMethod()> _
    Public Shared Function SaveCapturedImage(ByVal data As String) As Boolean
        Dim fileName As String = DateTime.Now.ToString("dd-MM-yy hh-mm-ss")

        'Convert Base64 Encoded string to Byte Array.
        Dim imageBytes() As Byte = Convert.FromBase64String(data.Split(",")(1))

        'Save the Byte Array as Image File.
        Dim filePath As String = HttpContext.Current.Server.MapPath(String.Format("~/Captures/{0}.jpg", fileName))
        File.WriteAllBytes(filePath, imageBytes)
        Return True
    End Function
End Class
