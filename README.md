This PR introduces the first governed bridge between ironbound-partner and elena-v1.

What this adds:
- governance_client.py for calling the E.L.E.N.A. decision API
- partner_v2.py as a governed partner entry point
- runtime pathway where every partner request is evaluated before response

Validated demo paths:
- benign request -> APPROVED
- ambiguous request -> CLARIFICATION_REQUIRED
- deceptive request -> REFUSED

This establishes the core E.L.E.N.A. v2 architecture:

User -> Partner -> E.L.E.N.A. Gate -> Decision -> Allowed Response/Action
