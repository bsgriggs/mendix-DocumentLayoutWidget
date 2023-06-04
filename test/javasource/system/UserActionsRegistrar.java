package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(documentgeneration.actions.JA_DocumentGeneration_Initialize.class);
    registrator.registerUserAction(documentgeneration.actions.JA_GenerateDocument.class);
    registrator.registerUserAction(documentgeneration.actions.JA_GetApplicationUrl.class);
    registrator.registerUserAction(documentgeneration.actions.JA_Token_Refresh.class);
    registrator.registerUserAction(documentgeneration.actions.JA_Token_Request.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
