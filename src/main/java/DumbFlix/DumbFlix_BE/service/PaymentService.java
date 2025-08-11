package DumbFlix.DumbFlix_BE.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.midtrans.Midtrans;
import com.midtrans.httpclient.CoreApi;
import com.midtrans.httpclient.SnapApi;

import DumbFlix.DumbFlix_BE.security.config.MidtransConfig;


@Service
public class PaymentService {

    private SnapApi snapApi;

    Midtrans.serverKey = "SB-Mid-server-2HdZrZv8rFjyPnGZ1f0pBx2U";
    Midtrans.clientKey = "SB-Mid-client-2HdZrZv8rFjyPnGZ1f0pBx2U";
    Midtrans.isProduction = false;

    @Autowired
    public PaymentService(MidtransConfig midtransConfig) {
        snapApi = new SnapApi();
        snapApi.setServerKey(midtransConfig.getServerKey());
        snapApi.setIsProduction(midtransConfig.isProduction());
    }

    // method createTransaction dll
}
