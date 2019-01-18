<template>
<div>
	<div class="reservation-notes" @click="closeNotes"></div>
    <div v-if="tipNotes=='LVMM'" class="reservation-detail">
        <div>
            <h3 class="orderMes">驴妈妈机票网上预订须知</h3>
            <div>
                <p class="order_title">1. 驴妈妈预订条款的确认</p>
                <p class="order_pra">驴妈妈旅游网（以下简称"驴妈妈"）各项服务的所有权与运作权归景域旅游运营集团所有。本服务条款具有法律约束力。一旦您点选"确认下单"成功提交订单后，即表示您自愿接受本协议之所有条款，并同意通过驴妈妈订购旅游产品。</p>
                <p class="order_title">2. 服务内容</p>
                <p class="order_pra">2.1 驴妈妈服务的具体内容由景域旅游运营集团根据实际情况提供，驴妈妈对其所提供之服务拥有最终解释权。</p>
                <p class="order_pra">2.2 景域旅游运营集团在驴妈妈上向其会员提供相关网络服务。其它与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费等）均由会员自行负担。</p>
                <p class="order_title">3. 特别提示</p>
                <p class="order_pra">3.1 您选择条件后的所列航班为符合条件的全部航班，最终出票将以驴妈妈给您的确认为准。因舱位数量有限，所以不能保证所有网上显示舱位都能出票，请以驴妈妈的短信确认为准。</p>
                <p class="order_pra">3.2 儿童票（2-12周岁）请与成人票同时预定；不支持单独购买儿童票 ，单独出行的儿童需到航司购票并且办理无成人陪伴服务。如已购买成人票需要补订同行儿童票，请拨打1010-6060-1-6。暂时不支持婴儿（14天-2周岁）和70周岁以上老人购票。若需购买可直接联系航司购买。</p>
                <p class="order_pra">3.3 请您留下正确的联系方式（手机、区号+座机、邮箱地址），以便及时与您确认机票事宜，如“出票当日和自取当日”无法与您取得联系或联系信息不正确，此订单将被视为无效取消处理。</p>
                <p class="order_pra">3.4 为了您可以顺利登机，请使用登机所用证件上的姓名和证件号码进行预订，如预订姓名或证件号码与证件姓名或证件号码不一致（如证件上为英文名，预订时使用中文名等）将无法正常登机.所造成的损失由预订人自行承担。</p>
                <p class="order_pra">3.5 请勿提交重复订单（同一登机人相同时间段两张以上的订单），如因提交重复订单导致重复出票，所产生的退票款项将由预订人全额承担 。如需更改行程，请致电驴妈妈客服电话1010-6060-1-6。</p>
                <p class="order_pra">3.6 电子客票,旅客必须在航空公司规定的时限内到达机场，凭客票及本人有效身份证件按时办理值机手续。飞机起飞前45分钟左右停止办理值机手续(各机场实施情况不一,仅作为参考)，驴妈妈特别提醒您，为保证登机顺利请提前120分钟到达机场办理值机、登机手续。</p>
                <p class="order_pra">3.7 对于孕妇，航司可根据实际情况要求孕妇乘客登机前提供健康产检等证明材料，如无法提供有权拒绝登机，损失由本人自行承担。婴儿及其他有特殊要求的旅客，如病残旅客、孕妇等，因需办理有关的特殊服务手续，请向航空公司直属售票处咨询购票事宜。</p>
                <p class="order_pra">3.8 用户如有特殊服务要求，如申请无成人陪伴儿童、婴儿摇篮、轮椅、担架，盲人服务、聋哑旅客等服务，只能直接在所乘坐的航空公司直属售票处申请，并按航空公司的价格购票，同时办理有关手续，网上的价格不适用于以上有特殊服务要求的旅客。</p>
                <p class="order_pra">3.9 在购买机票时请勾选是否需要行程单，若未勾选可在客票全部航段使用后15天以内拨打客服电话1010-6060-1-6提出申请。</p>
                <p class="order_pra">3.10 机型仅供参考，实际机型以航空公司管控为准。</p>
                <p class="order_title">4. 退改签规定</p>
                <p class="order_pra">4.1 机票改期、退票、签转将根据不同航空公司、不同舱位的相应规定办理，出票后如修改、签转、退票所产生费用由预订人全额承担。具体费用以航司审核为准。</p>
                <p class="order_pra">4.2 驴妈妈官方网站仅提供票务信息，任何临时发生的航班取消或变动请直接与相关航空公司联系，驴妈妈在接到航空公司通知后，会及时与您联系。<br>
                <p class="order_title">5. 不可抗力</p>
                <p class="order_pra">您和驴妈妈双方因不可抗力(包括但不限于地震、台风、雷击、水灾、火灾等自然原因,以及战争、政府行为、黑客攻击、电信部门技术管制等原因)不能履行或不能继续履行已生效订单约定内容的，双方均不承担违约责任，但法律另有规定的除外。因驴妈妈延迟履行已生效订单约定内容后发生不可抗力的，不能免除责任。</p>
                <p class="order_title">6. 其它</p>
                <p class="order_pra">本须知未尽的其他事项，在驴妈妈确认给您的订单中另行约定。同时合同双方需承担对等的义务。</p>
                <p class="order_pra">如有疑问，请拨打驴妈妈客服电话:1010-6060-1-6（工作时间08:00-21:00）。</p>
            </div>            
        </div>
    </div>
    <div v-if="tipNotes=='MZ'" class="reservation-detail">
        <div>
            <h3 class="orderMes">航班信息免责声明</h3>
            <div>
                <p class="order_title">驴妈妈旅游提供的各类航班相关的信息，包括但不限于舱位价格、餐食、机型等，来源于中国航信、全国各大机场、航空公司及相关部门公布数据。由于这些信息可能随时变化，以及网络传输问题，驴妈妈旅游提供的此类信息可能并非最新或存在误差，因此仅供旅客作为一般参考，任何公司或个人不能将此作为驴妈妈旅游做出任何承诺或做出任何保证的依据。</p>
            </div>            
        </div>
    </div>
    <div v-if="tipNotes=='UO'" class="reservation-detail">
        <div>
            <h3 style="font-size: 0.35rem;">关于民航旅客行李中携带锂电池规定的公告</h3>
            <div>
                <p class="order_title">为了加强旅客行李中锂电池的航空运输安全，民航局、民航华东地区管理局先后下发《关于加强旅客行李中锂电池安全航空运输的通知》，要求民航各相关单位进一步做好旅客行李中锂电池的安全运输管理工作，对于旅客行李中携带锂电池的，按照国际民航组织《危险物品安全航空运输技术细则》以下规定执行：</p>
                <p class="order_title">旅客或机组成员为个人自用内含锂或锂离子电池芯或电池的便携式电子装置 (锂电池移动电源、手表、计算器、照相机、手机、手提电脑、便携式摄像机等)应作为手提行李携带登机，并且锂金属电池的锂含量不得超过2克，锂离子电池的额定能量值不得超过100Wh（瓦特小时）。超过100Wh但不超过160Wh的，经航空公司批准后可以装在手提行李中的设备上。超过160Wh的锂电池严禁携带。</p>
                <p class="order_title">便携式电子装置的备用电池必须单个做好保护以防短路（放入原零售包装或以其他方式将电极绝缘，如在暴露的电极上贴胶带，或将每个电池放入单独的塑料袋或保护盒当中），并且仅能在手提行李中携带。经航空公司批准的100 -160Wh的备用锂电池只能携带两个。</p>
                
                <p class="order_title">飞行过程中装有启动开关的锂电池移动电源（充电宝），应当确保开关处于关闭状态。不得使用移动电源为消费电子设备充电或作为外部电源使用；不得开启移动电源的其他功能。</p>
                <p class="order_pra">旅客和机组成员携带锂离子电池驱动的轮椅或其他类似的代步工具和旅客为医疗用途携带的、内含锂金属或锂离子电池芯或电池的便携式医疗电子装置的，必须依照《危险物品安全航空运输技术细则》的运输和包装要求携带并经航空公司批准。</p>
                <p class="order_pra">附：锂电池安全运输提示</p>
                <p class="order_title">一、可携带的锂电池</p>
                <p class="order_pra">可以作为手提行李携带含不超过100Wh（瓦特小时）锂电池的笔记本电脑、手机、照相机、手表等个人自用便携式电子设备及备用电池登机。</p>
                <p class="order_pra">一般来讲，手机的锂电池额定能量多在3～10Wh；单反照相机锂电池的能量多在10～20Wh；便携式摄像机的锂电池能量多在20-40Wh；笔记本电脑的锂电池能量为30-100Wh多不等。因此，手机、常用便携式摄像机、单反照相机以及绝大多数手提电脑等电子设备中的锂电池通常不会超过100Wh的限制。</p>
                <p class="order_title">二、限制携带的锂电池</p>
                <p class="order_pra">经航空公司批准，可以携带含超过100Wh但不超过160Wh锂电池的电子设备登机。每位旅客携带此类备用电池不能超过两个，且不能托运。</p>
                <p class="order_pra">可能含有超过100Wh锂电池的设备如新闻媒体器材、影视摄制组器材、演出道具、医疗器材、电动玩具、电动工具、工具箱等。</p>
                <p class="order_title">三、禁止携带的锂电池</p>
                <p class="order_pra">禁止携带或托运超过160Wh的大型锂电池或电子设备。</p>
                <p class="order_title">四、备用锂电池的保护措施</p>
                <p class="order_pra">备用电池必须单个做好保护以防短路（放入原零售包装或以其他方式将电极绝缘，如在暴露的电极上贴胶带，或将每个电池放入单独的塑料袋或保护盒当中）。</p>
                <p class="order_title">五、锂电池额定能量的判定方法</p>
                <p class="order_pra">若锂电池上没有直接标注额定能量Wh（瓦特小时），则锂电池额定能量可按照以下方式进行换算:</p>
                <p class="order_pra">1、如果已知电池的标称电压(V )和标称容量(Ah)，可以通过计算得到额定瓦特小时的数值：</p>
                <p class="order_pra">Wh= V x Ah</p>
                <p class="order_pra">标称电压和标称容量通常标记在电池上。</p>
                <p class="order_pra">2、如果电池上只标记有毫安时(mAh)，可将该数值除以1000得到安培小时(Ah) 。</p>
                <p class="order_pra">例如：锂电池标称电压为3.7V，标称容量为760 mAh，其额定瓦特小时数为：</p>
                <p class="order_pra">760 mAh / 1000 = 0.76Ah</p>
                <p class="order_pra">3.7Vx0.76Ah=2.9Wh</p>
                <p class="order_title">关于民航旅客携带“充电宝”乘机规定的公告</p>
                <p class="order_pra">若锂电池上没有直接标注额定能量Wh（瓦特小时），则锂电池额定能量可按照以下方式进行换算:</p>
                <p class="order_title">充电宝是指主要功能用于给手机等电子设备提供外部电源的锂电池移动电源。根据现行有效国际民航组织《危险物品安全航空运输技术细则》和《中国民用航空危险品运输管理规定》，旅客携带充电宝乘机应遵守以下规定：</p>
                <p class="order_pra">一、充电宝必须是旅客个人自用携带。</p>
                <p class="order_pra">二、充电宝只能在手提行李中携带或随身携带，严禁在托运行李中携带。</p>
                <p class="order_pra">三、充电宝额定能量不超过100Wh,无需航空公司批准；额定能量超过100Wh但不超过160Wh，经航空公司批准后方可携带，但每名旅客不得携带超过两个充电宝。</p>
                <p class="order_pra">四、严禁携带额定能量超过160Wh的充电宝；严禁携带未标明额定能量同时也未能通过标注的其他参数计算得出额定能量的充电宝。</p>
                <p class="order_pra">五、不得在飞行过程中使用充电宝给电子设备充电。对于有启动开关的充电宝，在飞行过程中应始终关闭充电宝。</p>
                <p class="order_title">附：充电宝额定能量的判定方法</p>
                <p class="order_title">充电宝额定能量的判定方法</p>
                <p class="order_pra">若充电宝上没有直接标注额定能量Wh（瓦特小时），则充电宝额定能量可按照以下方式进行换算:</p>
                <p class="order_pra">1、如果已知充电宝的标称电压(V )和标称容量(Ah)，可以通过计算得到额定能量的数值：Wh= V x Ah 标称电压和标称容量通常标记在充电宝上。</p>
                <p class="order_pra">2、如果充电宝上只标记有毫安时(mAh)，可将该数值除以1000得到安培小时(Ah) 。</p>
                <p class="order_pra">例如：充电宝标称电压为3.7V，标称容量为760 mAh，其额定能量为：</p>
                <p class="order_pra">760 mAh ÷ 1000 = 0.76Ah</p>
                <p class="order_pra">3.7V×0.76Ah=2.9Wh</p>
                <p class="order_title">禁止携带危险品乘机</p>
                <p class="order_pra">酒类、液态日用品和自用含锂电池便携设备及其备用锂电池等物品应按民航相关规定携带。</p>
                <p class="order_pra">携带具有隐含危险性的相关物品，请向航空公司或机场客服人员咨询。</p>
                <p class="order_pra">关于明确旅客携带小型锂电池动力车运输规定的通知</p>
                <p class="order_pra">鉴于电动平衡车采用的锂电池有火灾隐患，为确保飞行安全，禁止旅客携带或托运以锂电池为动力的电动平衡车乘机。电动平衡车是指以锂电池为动力，可载人的，单轮或多轮的移动辅助工具，包括但不仅限于：独轮车、电动滑板、风火轮、智能代步车、体感车、思维车、摄位车等。</p>
            </div>         
        </div>
    </div>

    <!-- <div v-if="tipNotes=='Y8'" class="reservation-detail">
      <div>
        <h3>金鹏航空旅客购票须知</h3>
        <div>
          <p class="order_title">第一章　特殊旅客</p>
          <p class="order_title">第一条 无成人陪伴儿童、无自理能力的人、孕妇、病患旅客或需要特殊帮助的旅客等，由于年龄、身体或精神状况在旅途中需要特殊照顾或在一定条件下才能运输，只有在符合金鹏航空规定的条件下，经金鹏航空预先同意并在必要时做出安排后方予载运。</p>
          <p class="order_title">第二章　行李运输</p>
          <p class="order_title">第二条 下列物品不得作为行李或夹入行李内托运，也不得作为手提行李带入客舱运输：</p>
          <p class="order_pra">（一）危险品</p>
          <p class="order_pra">1.爆炸品；</p>
          <p class="order_pra">2.气体，包括易燃气体、非易燃无毒气体、有毒气体；</p>
          <p class="order_pra">3.易燃液体；</p>
          <p class="order_pra">4.易燃固体、自燃物质和遇水释放易燃气体的物质；</p>
          <p class="order_pra">5.氧化剂和有机过氧化物；</p>
          <p class="order_pra">6.毒性物质和传染性物质；</p>
          <p class="order_pra">7.放射性物质；</p>
          <p class="order_pra">8.腐蚀性物质；</p>
          <p class="order_pra">9.磁性物质；</p>
          <p class="order_pra">10.容易污损飞机的物品；</p>
          <p class="order_pra">11.锂含量＞2克的锂金属电池或额定能量值＞160WH（瓦特小时）的锂离子电池。</p>
          <p class="order_pra">12.金鹏航空规定不得作为行李运输的其他危险物品。   </p>
          <p class="order_pra">（二）枪支，含各种类型仿真玩具枪、枪型打火机及其他各种类型带有攻击性的武器，但体育运动用器械除外。</p>
          <p class="order_pra">（三）军械、警械。</p>
          <p class="order_pra">（四）管制刀具。</p>
          <p class="order_pra">（五）活体动物，但本条件规定的宠物及导盲犬和助听犬除外。</p>
          <p class="order_pra">（六）打火机、火柴。</p>
          <p class="order_pra">（七）内装锂电池和烟火装置等危险品的保险公文箱、现金箱、现金袋等保密设备禁止运输。</p>
          <p class="order_pra">（八）MACE催泪瓦斯、胡椒喷雾器等带刺激性或使人致残的器具。</p>
          <p class="order_pra">（九）液体氧气装置。</p>
          <p class="order_pra">（十）枪式电子干粉灭火器。</p>
          <p class="order_pra">（十一）电击枪（如泰瑟枪）。</p>
          <p class="order_pra">（十二）医用气态氧气瓶或空气瓶（如旅客因病确需在机上使用氧气瓶，需提前48小时向金鹏航空提出申请）。</p>
          <p class="order_pra">（十三）燃料电池（除符合金鹏航空规定的为轻便电子设备提供电力的燃料电池外，其它的燃料电池禁止运输）。</p>
          <p class="order_pra">（十四）国家规定的其它禁运物品。</p>
          <p class="order_title">第三条 以下物品不得作为托运行李运输的物品</p>
          <p class="order_pra">下列物品不得作为托运行李或在托运行李中夹带，对托运行李中放置或夹带下述物品的遗失和损坏，金鹏航空按一般托运行李承担责任：</p>
          <p class="order_pra">（一）重要文件和资料；</p>
          <p class="order_pra">（二）包括但不限于货币、汇票等有价证券；</p>
          <p class="order_pra">（三）珠宝、贵重金属（金、银等）及其制品；</p>
          <p class="order_pra">（四）古玩字画；</p>
          <p class="order_pra">（五）易碎和易损坏物品、易腐物品</p>
          <p class="order_pra">（六）个人自用内含锂金属电池或锂离子电池的便携式电子设备（且锂金属电池的锂含量不超过2克，锂离子电池的额定能量值不超过100Wh（瓦特小时）；</p>
          <p class="order_pra">（七）样品；</p>
          <p class="order_pra">（八）电子数码产品（包括但不限于各种相机、笔记本电脑）；</p>
          <p class="order_pra">（九）旅行证件；</p>
          <p class="order_pra">（十）其它需要专人照管的物品不得作为托运行李或夹入行李内托运的物品，在符合金鹏航空关于行李重量、体积限制的情况下，可作为手提行李由旅客带入客舱并自行保管。</p>
          <p class="order_pra">注：个人自用内含锂金属电池或锂离子电池的便携式电子设备且锂金属电池的锂含量不超过2克，锂离子电池的额定能量值不超过100Wh（瓦特小时）具体以各机场安检规定为准。</p>
          <p class="order_title">第四条 限制运输的物品</p>
          <p class="order_pra">金鹏航空对运输下列物品有严格的数量限制和包装要求，只有在符合金鹏航空运输条件的情况下，并经金鹏航空同意，方可接受运输：</p>
          <p class="order_pra">（一）精密仪器、电器等类物品，应作为货物托运，如按托运行李运输，必须有符合金鹏航空要求及该类物品应有妥善包装，并且此类物品的重量不得计算在免费行李额内,按逾重行李费收取运费。</p>
          <p class="order_pra">（二）体育运动用器械，包括体育运动用枪支和弹药，必须出具枪支运输许可证或者国家体育行政部门的许可证明作为托运行李运输，枪支必须卸下子弹和扣上保险并妥善包装。</p>
          <p class="order_pra">（三）宠物、导盲犬和助听犬等工作犬。</p>
          <p class="order_pra">（四）外交信袋，机要文件。</p>
          <p class="order_pra">（五）旅客旅行途中使用的电动轮椅。</p>
          <p class="order_pra">（六）管制刀具以外的利器、钝器，例如菜刀、水果刀、餐刀、工艺品刀、手术刀、剪刀、镰刀、演出用刀、剑、矛，古董或者作为旅游纪念品的刀、剑及钢锉、斧子、短棍、锤子等，不能随身携带，应放入托运行李内运输。</p>
          <p class="order_pra">（七）干冰、液态物品（包括酒类物品及含有酒精的饮料等）、旅客旅行途中所需的烟具、药品、化妆品等。液态物品的容积、容量应符合政府当局、金鹏航空及有关承运人、机场的限制要求，酒类物品含有酒精的饮料不得随身携带，需作为托运行李运输。</p>
          <p class="order_pra">（八）额定能量值超过100Wh 但不超过160Wh 的锂电池。</p>
          <p class="order_pra">（九）医疗所需的气态氧或者空气小型钢瓶；旅客穿在身上供操作机械肢体用的小型二氧化碳气瓶；含有碳氢化合物的催化卷发器，每个旅客不能超过一个。</p>
          <p class="order_pra">（十）装入自动充气的个人安全装置（例如救生衣或救生背心）的小型气筒。</p>
          <p class="order_pra">（十一）雪崩救援背包。</p>
          <p class="order_pra">（十二）化学品监视装置。</p>
          <p class="order_pra">（十三）产生热量的物品。</p>
          <p class="order_title">第三章　班期时刻、航班取消与变更及赔偿标准</p>
          <p class="order_title">第五条 班期时刻</p>
          <p class="order_pra">（一）金鹏航空应尽力在合理的期限内运送旅客及其行李，遵守公布的在旅行之日内有效的班期时刻。但是，航班时刻表或其他场所所列的时刻或机型仅供参考,在其公布之日与旅客实际开始旅行之日期间有可能发生变动，金鹏航空对航班时刻表或其他场所所列的时刻或机型不予保证,而且该航班时刻或机型也并非航空运输合同的组成部分。</p>
          <p class="order_pra">（二）除非损失是由于金鹏航空的故意或明知可能造成损失而轻率地作为或不作为所造成，金鹏航空对班期时刻表或其它公布的班期时刻中的差错或遗漏不承担责任。金鹏航空对其雇员、代理企业或金鹏航空的代表就始发或到达时间、日期或任何航班飞行所作的解释也不承担责任。</p>
          <p class="order_pra">（三）金鹏航空在接受旅客的订票之前，将告知旅客当时有效的预订航班时刻，并在旅客的客票上列明。在客票售出后，金鹏航空可能会更改航班时刻。如果旅客给金鹏航空提供了有效联系方式，金鹏航空应通知旅客航班时刻的变更。在旅客购票之后，如果金鹏航空对航班时刻做出变更而旅客不能接受，并且金鹏航空无法为旅客安排其可以接受的替代航班，可按照非自愿退票的规定办理退票。</p>
          <p class="order_title">第六条 航班取消与变更</p>
          <p class="order_pra">有下列情形之一的，金鹏航空可按规定不经事先通知，改变机型或航线、取消、中断、推迟或延期航班飞行：</p>
          <p class="order_pra">（一）为遵守国家的法律、法规和政府规章及其它规范性文件的规定；</p>
          <p class="order_pra">（二）为保证飞行安全；</p>
          <p class="order_pra">（三）其他不可抗力或不可预见的原因；</p>
          <p class="order_pra">（四）其他非金鹏航空的原因。</p>
          <p class="order_title">第七条 因航班取消或延误，而未能向旅客提供已定妥的座位（包括舱位等级），或未能在旅客的目的地点停留，或造成旅客已定妥座位的航班衔接错失，金鹏航空可根据旅客客票的使用条件，为旅客妥善办理退票或者改签手续，协助采取以下措施之一：</p>
          <p class="order_pra">（一）为旅客安排有可利用座位的金鹏航空后续航班；</p>
          <p class="order_pra">（二）征得旅客及有关承运人的同意后，办理签转手续；</p>
          <p class="order_pra">（三）变更原客票列明的航程，安排金鹏航空或其他承运人的航班将旅客运达目的地；</p>
          <p class="order_pra">（四）按非自愿退票的规定办理；</p>
          <p class="order_pra">（五）如旅客要求出具航班延误或者取消书面证明，金鹏航空应及时提供。</p>
          <p class="order_title">第八条 航班延误赔偿标准</p>
          <p class="order_pra">1、由于天气原因、空管原因、军事活动、公共安全、场区次序、机场设施、安全检查、联检、油料保障、离港系统、旅客原因等非金鹏航空原因，造成航班在始发地出港延误或取消，金鹏航空将协助旅客安排餐食和住宿，费用应由旅客自理</p>
          <p class="order_pra">2、由于金鹏航空机务维护、航班调配、机组等原因，造成航班在始发地出港延误或取消，金鹏航空将按规定向旅客提供餐食或住宿等服务。金鹏航空经根据航班延误的时间的实际情况，向旅客提供经济补偿。金鹏航空原因导致航班延误4（含）至8小时之内，补偿人民币200元；金鹏航空原因导致航班延误8小时（含）以上，补偿人民币300元。多种原因导致航班持续延误，以其中金鹏航空原因所致延误时段计算延误时间，并按照前述标准提供经济补偿。</p>
          <p class="order_pra">3、航班在经停地延误及取消或航班备降，无论何种原因，金鹏航空将按规定负责向经停、备降旅客提供餐食或住宿服务。</p>
          <p class="order_title">第四章　客票变更</p>
          <p class="order_title">第九条 客票变更</p>
          <p class="order_pra">“客票变更” 指改变客票上列明的航班、日期、舱位等级、航程。客票变更分非自愿变更及自愿变更两类。</p>
          <p class="order_title">第十条 非自愿变更</p>
          <p class="order_pra">因航班取消、延误，提前、航程改变或不能提供原订座位时，金鹏航空应在航班有可利用座位的条件下，按以下规定办理：</p>
          <p class="order_pra">（一）为旅客安排有可利用座位的金鹏航空后续航班；</p>
          <p class="order_pra">（二）变更原客票列明的航程，安排金鹏航空或其他承运人的航班将旅客运达目的地。</p>
          <p class="order_pra">（三）以金鹏航空连续客票形式销售的多航段联程客票，或者旅客在不同的销售渠道购买的全部用金鹏航空票证填开的各航段均为金鹏航空承运的客票，其中某段航段发生不正常导致其他航段无法衔接时，金鹏航空免费为旅客变更所有航段的客票。</p>
          <p class="order_pra">（四）旅客分别购买的由不同承运人票证填开的多航段客票，前段为金鹏航空承运，后段为其它承运人承运，当金鹏航空航班发生不正常导致后段其他承运人航班无法衔接时，金鹏航空可协助旅客更改航班，费用由旅客自理。</p>
          <p class="order_title">第十一条 自愿变更指旅客自愿改变航班、日期、舱位等级、航程。</p>
          <p class="order_title">第十二条 自愿改变舱位等级</p>
          <p class="order_pra">旅客购票后，如从较低舱位等级变更为较高舱位等级，或从较低票价变更为较高票价，需向旅客收取票价价差，变更手续费按金鹏航空现行规定执行。如从较高舱位等级变更为较低舱位等级或从较高票价变更为较低票价，则按自愿退票处理。</p>
          <p class="order_title">第十三条 自愿改变航班、日期</p>
          <p class="order_pra">旅客购票后，如要求改变航班、日期，金鹏航空及其销售代理企业在航班有可利用座位和时间允许的条件下按金鹏航空现行《多等级舱位管理规定》及相关产品规定办理。</p>
          <p class="order_title">第十四条 自愿改变航程</p>
          <p class="order_pra">旅客如自愿改变航程，则按自愿退票处理。</p>
          <p class="order_title">第五章　客票签转</p>
          <p class="order_title">第十五条 客票签转指改变客票上列明的承运人代码。客票签转分自愿签转及非自愿签转两类。</p>
          <p class="order_title">第十六条 非自愿签转</p>
          <p class="order_pra">航班取消、延误、航程改变或不能提供原定座位时，金鹏航空应优先安排旅客乘坐金鹏航空后续航班。除此之外，金鹏根据旅客客票的使用条件，在征得旅客及有关承运人同意后，为旅客妥善办理签转手续。</p>
          <p class="order_title">第十七条 自愿签转</p>
          <p class="order_pra">（一） 一般规定</p>
          <p class="order_pra">旅客自愿要求改变承运人，应征得原承运人或其授权代理企业的同意，并在新承运人允许及符合下列全部条件下，承运人可予以签转：</p>
          <p class="order_pra">1、旅客使用的票价无签转限制；</p>
          <p class="order_pra">2、旅客的客票未改变过舱位等级；</p>
          <p class="order_pra">3、所签转的承运人与原承运人有互售关系或票证结算关系且所签转的承运人航班有相应服务等级可利用。</p>
          <p class="order_pra">（二）若接收签转的承运人票价与金鹏航空票价不一致，产生的票款差价多退少补。</p>
          <p class="order_pra">（三）凡不符合本条第（一）、（二）款规定的旅客要求改变承运人，一律按自愿退票的规定办理。</p>
          <p class="order_pra">（四）金鹏航空的销售代理企业未经特别授权不得为旅客办理签转手续。 </p>
          <p class="order_title">第六章　退票</p>
          <p class="order_title">第十八条 一般规定</p>
          <p class="order_pra">（一）由于金鹏航空未能按照运输合同提供运输或旅客要求自愿改变其旅行安排，对旅客未能使用的全部或部分金鹏航空客票，金鹏航空应按规定办理退票。退票分自愿退票及非自愿退票两类。</p>
          <p class="order_pra">（二）旅客要求退票，应填妥金鹏航空规定的退款单。除遗失客票的情形外，购买纸质客票的旅客必须凭客票未使用的全部乘机联和旅客联，方可办理退票；购买电子客票的旅客凭本人有效身份证件办理退票，并交回已打印的电子客票行程单，退票时其电子客票须为有效状态；</p>
          <p class="order_pra">（三）在非客票上列明的地点发生不正常航班，旅客要求退票，须凭始发站登机牌原件、不正常航班证明及本人有效身份证件办理（纸质客票还须提供旅客联原件或复印件。）</p>
          <p class="order_title">第十九条 退票受款人</p>
          <p class="order_pra">（一）金鹏航空有权向客票上列明姓名的旅客本人办理退票。</p>
          <p class="order_pra">（二）当客票上列明的旅客不是该客票的付款人，金鹏航空应按列明的退票限制条件将票款退给付款人或其指定人。</p>
          <p class="order_pra">（三）旅客退票应出示本人有效身份证件；如退票受款人不是客票上列明的旅客本人，应出示旅客本人和退票受款人的有效身份证件。</p>
          <p class="order_pra">（四）金鹏航空将票款退给持有未使用航段的有效客票并符合本条第（一）、第（二）、第（三）款规定的人，应被视为正当退票。金鹏航空也随即解除责任。</p>
          <p class="order_title">第二十条 退票期限</p>
          <p class="order_pra">旅客要求退票，应在其客票有效期内向金鹏航空提出并办理退款手续；否则金鹏航空有权拒绝办理。</p>
          <p class="order_title">第二十一条 退票地点</p>
          <p class="order_pra">（一）旅客非自愿退票，可在原购票地、航班始发地、经停地、终止地的金鹏航空授权售票处和海航直属售票处，或引起非自愿退票发生地的金鹏航空授权的代理企业售票处办理。</p>
          <p class="order_pra">（二）旅客自愿退票，应在下列地点办理：</p>
          <p class="order_pra">1、在出票地要求退票，只限在原购票售票处办理；通过金鹏航空官网、金鹏航空热线销售的客票除原购票售票处可退票外，也可在金鹏航空直属柜台办理。</p>
          <p class="order_pra">2、在出票地以外的航班始发地或终止旅行地要求退票，可在当地的金鹏航空授权售票处和海航直属售票处办理；如当地无金鹏航空授权售票处和海航直属售票处，可在经金鹏航空特别授权的当地销售代理企业售票处办理。</p>
          <p class="order_title">第二十二条 非自愿退票</p>
          <p class="order_pra">（一）航班取消、延误、航程改变或不能提供原定座位时旅客可办理非自愿退票。始发地应退还旅客所付全部票款；经停地应按旅客的订座舱位退还未使用航段的票款，但不得超过原付票款金额。均不收取退票费。</p>
          <p class="order_pra">（二）持由定期客票更改为不定期客票的旅客在确认座位时，若因金鹏航空航段取消原因提出退票，按“非自愿退票”处理，不收退票费。</p>
          <p class="order_pra">（三）旅客因疾病要求退票，需在航班规定离站时间前提出申请并退座，同时提供县级（含）以上医疗单位出具的医生诊断证明，免收退票费。患病旅客的陪伴人员要求退票，应与患病旅客同时办理退票手续，免收退票费。</p>
          <p class="order_pra">（四）以金鹏航空连续客票形式销售的多航段联程客票，或者旅客在不同的销售渠道分别购买的全部用金鹏航空票证填开的个航段均为金鹏航空承运的客票，若其中某航段发生不正常，则所有航班客票均可按“非自愿退票”处理。</p>
          <p class="order_pra">（五）旅客分别购买的由不同承运人票证填开的多航段客票，前段为金鹏航空承运，后段为其它承运人承运，当金鹏航空航班发生不正常导致后段其他承运人无法衔接时，金鹏航空可协助旅客办理后续外航航班的退票。与金鹏航空签有联运退票协议的，可由其他承运人按非自愿退票处理；与金鹏航空没有联运退票协议或其他承运人对联运退票条款有争议的，费用由旅客自理。</p>
          <p class="order_title">第二十三条 自愿退票</p>
          <p class="order_pra">（一）旅客自愿要求退票，按金鹏航空现行《多等级舱位管理规定》及相关产品规定执行。</p>
          <p class="order_pra">（二）持不定期客票的旅客要求退票，免收退票费。持由定期更改为不定期客票的旅客要求退票，按客票票面列明的订座舱位对应的退票规定收取退票费；持由定期客票更改为不定期客票的旅客在确认座位时，若因金鹏航空航段取消原因提出退票，按“非自愿退票”处理，不收退票手续费。</p>
          <p class="order_pra">（三）按成人适用普通票价50%购票的革命伤残军人，因公致残人民警察，自愿退票，免收退票款。</p>
          <p class="order_pra">（四）持婴儿客票的旅客要求退票，免收退票费。</p>
          <p class="order_pra">（五）旅客在航班的经停地自动终止旅行，该航班未使用航段的票款不退。</p>
        </div>  
      </div>
    </div> -->
    <!-- <div v-if="tipNotes=='CZ'" class="reservation-detail">
      <div>
        <h3>国内运输散客公布票价使用条件总则详细规定</h3>
        <div>
          <p class="order_title">一、一般规定:</p>
          <p class="order_title">(一)销售单位应严格遵守价格与订座舱位相对应的原则，不得以低价格销售高舱位。</p>
          <p class="order_title">(二)来回程/联程由各航段对应订座舱位票价组合而成，各航段的使用条件按照相应订座舱位等级对应规定执行。</p>
          <p class="order_title">(三)凡符合本条件规定的散客，优先按照本条件执行。未作规定的，按照南航新版《旅客、行李国内运输总条件》执行。</p>
          <p class="order_title">(四)销售单位出售各舱位客票时，必须事先向旅客说明相关使用条件，避免发生投诉。</p>
          <p class="order_title">(五)本总则适用于南航国内散客舱位,其它未列明舱位按具体运价文件另行规定执行。</p>
          <p class="order_title">二、适用范围:</p>
          <p class="order_title">适用于由南航实际承运及挂南航航班号由其它航空公司承运（即南航代码共享航班）的、使用南航国内有效运输凭证(包括使用"784"确认的BSP 客票)填开的国内航线运输，以及与南航签有相互销售协议，并使用其它航空公司客票填开的南航国内航线运输；“南航行-中国通票”除外。</p>
          <p class="order_title">三、客票有效期:</p>
          <p class="order_title">(一)除另有规定外，客票有效期自旅客开始第一段旅行开始之日起，一年内运输有效；如果客票全部未使用，则从填开客票之日起,一年内运输有效.；不定期客票, 从填开客票之日起,一年内运输有效。</p>
          <p class="order_title">(二)客票有效期的计算，从第一航段旅行开始或填开客票之日的次日零时起至有效期满之日的次日零时为止。</p>
          <p class="order_title">四、提前订座、出票规定:</p>
          <p class="order_title">(一)必须按票价规定的舱位进行订座。</p>
          <p class="order_title">(二)出票时限以订座系统标注为准。</p>
          <p class="order_title">(三)客票必须按对应舱位填开。正确填写客票上的票价级别栏、票价栏和签注栏规定内容；优惠票必须在“签注栏”标注“不得签转/变更退票收费”或按照相关产品的规定填写。</p>
          <p class="order_title">(四)票面按旅客实付款金额填写，金额以人民币十元为单位，个位数四舍五入，具体价格以订座系统中公布的票价为准。</p>
          <p class="order_title">(五)不定期客票填开</p>
          <p class="order_pra">1. F/J/W/Y舱客票及正常儿童\婴儿\革命伤残军人和因公致残人民警察客票，全程允许填开不定期客票；</p>
          <p class="order_pra">2、其他舱位不允许填开不定期客票。</p>
          <p class="order_title">(六)客票乘机联必须按顺序使用，否则按各乘机联对应订座舱位的退票规定办理退票。</p>
          <p class="order_title">五、散客变更及退票费收取规定：</p>
          <p class="order_title">变更：指包括航班、日期、舱位、航程、承运人的变更。</p>
          <p class="order_title">变更费：是指根据舱位票价使用条件，南航对旅客自愿提出要求更改原订航班计划而收取的费用，包括对航班、日期等的变更收费。</p>
          <p class="order_title">票价价差：指旅客自愿从低票价改为高票价的运价差额。</p>
          <p class="order_title">变更及退票费的费率均以退座时间计算。</p>
          <p class="order_title">变更费，退票费和舱位票价价差均按客票票面价计算。</p>
          <p class="order_title">(一)自愿变更：</p>
          <p class="order_pra">1.F/J舱客票及按F/J舱票价计算的儿童客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，免收变更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价5％的变更费；按F/J舱票价计算的婴儿、革命伤残军人和因公致残人民警察优惠票的航班/日期变更，免收变更费。</p>
          <p class="order_pra">2.C舱对应票价级别为C和C*客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价5％的变更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价10％的变更费；</p>
          <p class="order_pra">3.D/I舱对应票价级别为D*/I*客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价10％的变更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价20％的变更费；</p>
          <p class="order_pra">4.W/Y舱客票及按W/Y舱客票票价计算的儿童客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，免收变更费;航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价5％的变更费；按W/Y舱票价的婴儿、革命伤残军人和因公致残人民警察优惠票的航班/日期变更，免收变更费。</p>
          <p class="order_pra">5.B/M/H舱客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价10％的变更费;航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价20％的变更费；</p>
          <p class="order_pra">6.S舱对应的票价级别为S1*客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价10%更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价20%变更费；</p>
          <p class="order_pra">7.S舱对应的票价级别为S2*客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价20%更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价30%变更费；</p>
          <p class="order_pra">8.S舱对应的票价级别为S3*客票的航班/日期变更：航班预计离站时间之前2小时（含）前变更，每次收取客票票面价30%更费；航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价50%变更费；</p>
          <p class="order_pra">9.U/A/L舱客票的航班/日期变更:航班预计离站时间之前2小时（含）前变更每次收取客票票面价20％的变更费;航班预计离站时间之前2小时（不含）后变更，每次收取客票票面价30％的变更费；</p>
          <p class="order_pra">10.E/V/Z/T/R舱客票的航班/日期变更:航班预计离站时间之前2小时（含）前变更每次收取票面价30％的变更费;航班预计离站时间之前2小时（不含）后变更，每次收取票面价50％的变更费。</p>
          <p class="order_pra">11.  P/K/Q/N产品舱客票，按具体文件使用条件执行。</p>
          <p class="order_pra">12.  如变更后未发生票价价差，则按规定收取变更费；如果变更后引起前后票价变化的，按以下规定办理：</p>
          <p class="order_pra">a.从高票价变更到低票价，按自愿退票办理。</p>
          <p class="order_pra">b.从低票价变更到高票价，同时收取票价价差和变更费用；如客票航班及日期没变更，仅变更舱位，则仅收取票价价差。</p>
          <p class="order_pra">c.订座舱位更改后如需再变更，其变更收费按更改后的订座舱位使用条件办理。</p>
          <p class="order_pra">d.散客单程、来回程、缺口程、联程客票的自愿变更，仅限南航直属售票处、南航呼叫中心、授权南航代理办理。销售单位如需使用《国内客运退票、变更收费单》收取相关费用，在《国内客运退票、变更收费单》上要列明原客票的票号、舱位及定座情况的变更说明，并准确区分和填列变更费和票价价差，两者不能混淆。</p>
          <p class="order_pra">13. 更改航程:按自愿退票处理。</p>
          <p class="order_pra">14.如果使用公布票价不同舱位（F/J/C/W/Y/B/M/H/U/A/L/E/V）填开联程客票，客票变更按各舱位对应规定办理；如果使用公布票价不同舱位（F/J/C/W/Y/B/M/H/U/A/L/E/V）与其它特殊票价舱或产品舱（C/D/I/S/P/K/Q/ N /Z/T/R）组合填开联程客票，客票变更按各舱位对应规定办理，但签注栏仍按照较严格舱位变更规定标注。</p>
          <p class="order_pra">15.公布来回程运价客票完全未使用或部分使用后要求变更，均按对应航段1/2来回程票价计算变更费。如果变更后舱位有公布来回程票价，则票价价差为相应1/2来回程票价的差额；如果变更后舱位没有公布来回程票价，则票价价差为变更后舱位单程票价与变更前1/2来回程票价之间的差额。</p>
          <p class="order_title">(二)自愿退票：</p>
          <p class="order_pra">1.F/J舱客票及按F/J舱票价计算的儿童客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价5％的退票费；航班预计离站时间之前2小时（不含）后收取客票票面价10％的退票费；按F/J舱票价计算的婴儿客票、革命伤残军人和因公致残人民警察优惠票的退票：免收退票费。</p>
          <p class="order_pra">2.C舱对应票价级别为C和C*客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价10％的退票费；航班预计离站时间之前2小时（不含）后收取客票票面价20％的退票费；</p>
          <p class="order_pra">3.D/I舱对应票价级别为D*/I*客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价20％的退票费；航班预计离站时间之前2小时（不含）后收取客票票面价30％的退票费；</p>
          <p class="order_pra">4.W/Y舱客票及按W/Y舱票价计算的儿童客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价5％的退票费，航班规定离站时间之前2小时（不含）后，收取客票票面价10％的退票费；按W/Y舱票价计算的婴儿客票、革命伤残军人和因公致残人民警察优惠票的退票：免收退票费；</p>
          <p class="order_pra">5.B/M/H舱客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价20％的退票费，航班规定离站时间之前2小时（不含）后，收取客票票面价30％的退票费；</p>
          <p class="order_pra">6.S舱对应的票价级别为S1*客票的退票：航班预计离站时间之前2小时（含）前退票，每次收取客票票面价20%的退票费；航班预计离站时间之前2小时（不含）后退票，每次收取客票票面价30%的退票费；</p>
          <p class="order_pra">7.S舱对应的票价级别为S2*客票的退票：航班预计离站时间之前2小时（含）前退票，每次收取客票票面价30%的退票费；航班预计离站时间之前2小时（不含）后退票，每次收取客票票面价50%的退票费；</p>
          <p class="order_pra">8.S舱对应的票价级别为S3*客票的退票：航班预计离站时间之前2小时（含）前退票，每次收取客票票面价50%的退票费；航班预计离站时间之前2小时（不含）后不得退票，即每次收取客票票面价100%的退票费。</p>
          <p class="order_pra">9.U/A/L舱客票的退票：航班预计离站时间之前2小时（含）前收取客票票面价30％的退票费; 航班预计离站时间之前2小时（不含）后收取客票票面价50％的退票费。</p>
          <p class="order_pra">10.E/V/Z/T/R舱客票的退票: 航班预计离站时间之前2小时（含）前收取客票票面价50％的退票费; 航班预计离站时间之前2小时（不含）后不得退票，即每次收取客票票面价100%的退票费。</p>
          <p class="order_pra">11. P/K/Q/N产品舱客票，按具体文件使用条件执行。</p>
          <p class="order_pra">12.客票变更后退票，所收变更费不退；客票订座舱位更改后如又发生退票，票价价差部分按变更后新票价订座舱位的退票手续费标准办理,其它按变更前订座舱位退票手续费标准办理，合计收取退票费，并按新定座位退座时间选择相应费率。</p>
          <p class="order_pra">13.旅客要求退票，最迟应在开始旅行之日起（客票完全未使用的，从填开之日起）十三个月内提出，逾期不予办理。若客票已逾期，票款、机场建设费与燃油附加费不予退回。</p>
          <p class="order_pra">14.如果使用公布运价不同舱位（F/J/C/W/Y/B/M/H/U/A/L/E/V）填开联程客票，退票按各舱位对应规定办理；如果使用公布运价不同舱位（F/J/C/W/Y/B/M/H/U/A/L/E/V）与特殊运价舱或产品舱（C/D/I/S/P/K/Q/N/Z/T/R）组合填开联程客票，退票均按各舱位对应规定办理，但签注栏仍按较严格舱位退票规定标注。</p>
          <p class="order_pra">15.公布来回程票价客票部分使用后要求退票，扣除已使用航段相应舱位单程票价，余额按相应舱位规定办理。</p>
          <p class="order_title">（三）客票遗失按南航新版《旅客、行李国内运输总条件》和《国内客运票证使用及票证管理规定》等办理。</p>
          <p class="order_title">六、客票的签转规定</p>
          <p class="order_pra">(一)客票的签转按相关签转协议执行。</p>
          <p class="order_pra">(二)按F/J/W/Y舱票价计算的婴儿、儿童、革命伤残军人和因公致残人民警察优惠票允许自愿签转，如签转后的承运人适用票价高于南航票价，需补齐差额后进行签转；如签转后的承运人适用票价低于南航票价，允许签转，但差额不退 ，或按自愿退票处理。</p>
          <p class="order_pra">(三)客票签转须同时按本总则规定收取变更费。</p>
          <p class="order_pra">(四)其它凡不允许自愿签转的可退票的客票要求自愿签转，按自愿退票办理。</p>
          <p class="order_title">七、儿童、婴儿折扣规定</p>
          <p class="order_pra">(一)儿童按成人F/J/W/Y舱全价的50％购买儿童票，婴儿按成人F/J/W/Y舱全价的10％购买婴儿票，不得享受双重优惠；其它按南航新版《旅客、行李国内运输总条件》及相关规定执行。</p>
          <p class="order_pra">(二)使用除F/J/W/Y其他舱位销售儿童、婴儿客票，票价选择成人适用运价的，按该运价成人同等适用条件执行；票价选择儿童、婴儿正常使用运价的（即50%和10%优惠票价），按该运价原对应订座舱位（F/ J/W/Y舱）的使用条件执行。</p>
          <p class="order_pra">（三）儿童、婴儿客票，其机场建设费、燃油费均按儿童，婴儿标准执行。</p>
          <p class="order_pra">（四）除现有儿童购票规定外，每位年满18周岁且有民事行为能力的成年旅客最多携带两名未满十二周岁的儿童同舱位乘机，其它超过规定数量的儿童（含按成人票价购买客票的儿童）乘机，必须按无成人陪伴儿童规定办理。</p>
          <p class="order_pra">（五）无人陪伴儿童按南航新版《国内客运销售业务手册》相关操作规定办理。</p>
          <p class="order_title">八、非自愿变更/退票/签转：按南航现行《旅客、行李国内运输总条件》有关规定办理。</p>
          <p class="order_title">九、生效日期：</p>
          <p class="order_title">本公布票价及使用条件适用于2016年10月17日起销售的2016年10月17日(含)起旅行的客票。</p>
          <p class="order_title">本规定最终解释权归南航。</p>
        </div>
      </div>
    </div> -->
    <!-- <div v-if="tipNotes=='PNC'" class="reservation-detail">
      <div>
        <h3>西部航空乘客告知书双语</h3>
        <p>尊敬的旅客朋友：</p>
        <p>Dear passengers,</p>
        <p>感谢您选乘我司航班出行，为了给您提供更好的服务并确保您的权益不受侵害，请仔细阅读以下内容：</p>
        <p>Thank you for choosing WestAir, in order to provide you a better service and ensure your rights are not infringed, please read the following tips:</p>

        <p class="p-title-small">旅客信息</p>
        <p class="p-title-small">Personal information</p>
        <p>购票时，请您务必如实填写乘客信息，预留乘客本人真实有效的联系方式，以期任何情况下我们都可以及时联系到您。同时，为避免因时间仓促引发误机等后果，我们建议您至少提前90分钟到达机场，办理乘机相关手续。</p>
        <p>You must write the real passengers information and remain your real and effective contact information so that WestAir can contact you in any cases in time. Meanwhile, in order to avoid flight missing caused by time-rush, we suggest you arrive at airport at least 90 minutes ahead and transact related boarding procedure.</p>
        <p>差异化服务</p>
        <p>Distinctive Service</p>
        <p>为降低旅客购票成本，我司全面推行差异化服务。</p>
        <p>In order to reducetravelling cost, WestAir implements distinctive service comprehensively.</p>
        <p>机票：</p>
        <p>Ticket</p>
        <p>机票购买后申请变更航班时间或退票，须按照对应的客票规定收取手续费。</p>
        <p>In case of applying the change of flight time or refund, must charge according to related ticket regulation.</p>
        <p>行李：</p>
        <p>Baggage</p>
        <p>每位旅客可免费携带一件重量不超过5KG（国际航班不超过7KG）的手提行李，体积不超过20X30X40CM，根据购票价格，仅部分旅客享有10公斤免费托运行李额，其他旅客无此项增值服务。婴儿旅客无免费行李额，但可以携带一件折叠式手推车，手推车的尺寸不超过20CM×40CM×55CM，重量不超过5KG（国际航班不超过7KG）。若手推车的尺寸或重量超过规定，则必须作为托运行李进行运输。</p>
        <p>Each passenger can take one free hand baggage within 5KG (do not exceed 7KG in international flight) and 20X30X40CM.According to ticket price, some passengers can own free check-in baggage within 10KG，or else have no.Infants cannot own free baggage, but can bring one folding handcart within 20CM×40CM×55CM and 5KG (do not exceed 7KG in international flight). If the size or weight of the handcart cannot accord with the regulation, it must be viewed as check-in baggage.</p>
        <p>机上服务：</p>
        <p>Cabin service</p>
        <p>机上无免费餐食和饮品，但为您准备了品类丰富的付费餐食和饮品，如有需要，请至少在航班起飞36小时前购买，此外，上机后您也可以联系空乘人员购买。</p>
        <p>There is no free catering service on board, but the service can be charged. If you need, please purchase through official website, official Wechat or 24-hour service hotline 95373/950716 at least 36 hours ahead before flight-launching.</p>
        <p class="p-title-small">危险品运输</p>
        <p class="p-title-small">Dangerous goods transportation</p>
        <p>为保证飞行安全，请严格遵守我司危险品运输规定，我们强调严禁携带或托运三星NOTE7手机上机。严禁托运充电宝、锂电池等相关物品，随身携带充电宝额定能量不能超过100Wh。</p>
        <p>In order to be sure safe flight, please comply with the dangerous goods transportation regulation of WestAir strictly, WestAir emphasizes that SAMSUNG NOTE7 must be not brought on board.WestAir prohibits transporting portable battery, lithium battery and related goods. Do not bring portable battery out of 100Wh on board.</p>
        <p class="p-title-small">航班延误/取消服务</p>
        <p class="p-title-small">Flight delay/cancellation service</p>
        <p>根据中华人民共和国交通运输部2016年第56号令和经中国民航总局批复的《西部航空运输总条件》的相关规定，我司航班发生延误/取消等情况时，我们将为您提供以下服务。</p>
        <p>According to 56th Order 2016 of Ministry of Transportation of PRC and related regulations of 《West Air Conditions of Carriage》approved by CAAC, In case of the situation, WestAir can provide the following service for you.</p>
        <p>信息通知：</p>
        <p>Notification</p>
        <p>发生航班延误/取消等情况时，我们将在30分钟内将相关信息通知到您。您也可以登录西部航空官方网站首页进行航班动态自助查询。</p>
        <p>In case of flight delay/cancellation, please be sure to fill in your contact while make the reservation. If irregularity occurs, we will notify you the irregularity in 30mins and keep updating. You may also log on “www.westair.cn” for flight status query.</p>
        <p>客票处理：</p>
        <p>Ticket</p>
        <p>发生航班延误/取消后，您可以联系原出票单位办理全额退款，若您需要继续行程，您也可以联系原出票单位、机场售票柜台及西部航空呼叫中心，我们可以为您免费变更至前后三天西部航空的航班上，或为您签转至和我司有签转协议的合作伙伴航班上。</p>
        <p>You may contact the original ticket issuer for a full refund after the flight delay/cancellation. Passengers make a reservation by West Air official website/wechat/app could submit the refund application on www.westair.cn. Passengers chose to continue their travel may log on official website/wechat/app for a self-service amendment. Passengers may also contact the original ticket issuer, west air sales counter or service line 95373/950716, and we will change the ticket to the flight 3 days before/after of the original flight, or endorse to the flight which has the ticket endorsement agreement with West Air.</p>
        <p>机上延误：</p>
        <p>Delay in cabins</p>
        <p>发生机上延误时，乘务组每30分钟向旅客通告最新动态。延误超过2小时（含），乘务人员将为您提供免费的食品和饮料。预知机上延误超过3小时（含）且无明确起飞时间的，在不违反航空安全及各项安全保卫规定的情况下，我们将联系地面安排旅客下飞机。</p>
        <p>"On-board delay" means that the passengers wait in the plane for more than the scheduled ground taxiing time after the door is closed before flying-off or before the door is open after landing .If it delay, the flight attendants should ask for the latest flight situation every 30 minutes from flight crew, and tell the passengers the latest situation timely. If the delay is more than 2 hours (inclusive) and to the meal time, the food and water should be free arranged for the passengers according to the capability of the local airport. If the delay is more than 3 hours (inclusive) and there is no clear departure time, the company should arrange the passengers to leave the plane without violating the aviation safety and security regulations.</p>
        <p>延误证明：</p>
        <p>Flight Delay (Cancellation) Certification</p>
        <p>若您需要延误/取消证明，请通过以下方式获取：①前往西部航空在各机场的服务柜台 ②联系24小时客服热线③登录官方网站④登录西部航空微信公众号⑤登录西部航空官方APP。</p>
        <p>Passengers may acquire the Flight Delay (Cancellation) Certification by the following way: ①service counter in airport ②24h service line 95373/950716 ③official website: WWW.WESTAIR.CN ④wechat official account（westair95071095） ⑤west air official APP.</p>
        <p>食宿安排：</p>
        <p>Accommodations</p>
        <p>由于机务维护、航班调配、机组等航空公司原因，造成航班在始发地延误或者取消，我们会按需为您提供免费的餐食或住宿服务。由于天气、突发事件、空中交通管制、安检以及旅客等非航空公司原因，造成航班在始发地出港延误或者取消，我们会协助您安排餐食和住宿，费用由您自理。国内航班在经停地延误或者取消，或在飞行途中发生备降，我们会按需向您提供免费的餐食或者住宿服务。</p>
        <p>Flight delay/cancellation at the original airport caused by aircraft maintenance, flight dispatch, crew and other airline reasons, West Air will provide free meal or accommodation service for the passengers. Flight delay/cancellation caused by weather condition, emergency situation, air traffic control, security check, passenger and other non-airline reasons at the original departure airport, West Air will assist passengers to arrange meal and accommodation, but the cost is on passenger themselves. Domestic stopping-over flight delayed/canceled at the stopping-over point, or diversion occurs during the flight, West Air will provide free meal or accommodation service for the passengers.</p>
        <p>经济补偿:</p>
        <p>Compensations</p>
        <p>作为国内领先的低成本航空公司，我们一直致力于降低旅客的出行成本。受制于航空业高昂的成本和我们提供的低廉票价，因此无论何种原因导致的航班延误或取消，我们均无法向您提供除上述条款之外的经济补偿，希望得到您的理解。</p>
        <p>As a domestic leading LCC airline, West Air strives to reduce the travel cost of the passenger. Limited by high cost of aviation industries and low ticket fare, due all reasons, West Air will not provide any other compensations except mentioned above. We appreciate your understanding.</p>
        <p class="p-title-small">超售服务</p>
        <p class="p-title-small">Over-Selling service</p>
        <p>基于已购票旅客存在误机情况，同时满足更多旅客的出行需求，西部航空可能会对部分航班进行超售，我们建议您及早办理值机手续。</p>
        <p>Due to mistaking, WestAir may sell ticket out of the number of actual seat in some flights,in order to meet more passengers’ travelling requirement. WestAir suggest you to transact boarding procedure earlier.</p>
        <p>发生航班超售时，我们将根据乘客意愿免费保障至后续航班经济舱确保成行。等待后续航班起飞过程中，每个饭点我们都将为您提供免费的餐食和饮料。候机时间超过4小时，我们还将提供免费酒店休息，并协助您重新办理后续乘机手续，同时根据规定予以旅客200至400元不等的现金补偿。若您放弃本次出行，我们将为您办理客票全退手续，并予以200元现金补偿。</p>
        <p>In the case of over-selling, WestAir can ensure to offer passengers free next flight with economy cabin based on the willingness of passengers. WestAir can provide free food and beverage in meal time for passengers waiting for next flight. WestAir can provide free hotel for passengers waiting for next flight out of 4 hours and assist them in transacting boarding procedure again. Moreover, WestAir offers passengers cash compensation within 200 to 400RMB. If you give up your travel, WestAir gives you full refund and cash compensation with 200RMB</p>
        <p class="p-title-small">其他</p>
        <p class="p-title-small">Others</p>
        <p style="text-decoration: underline;">请您文明乘机，合法维权。任何谩骂殴打工作人员，进入机场控制区，堵塞安检口、登机口，冲闯机坪、滑行道、跑道，拦截、强登、强占航空器，破坏设施设备，或者实施其他扰乱民航运输生产秩序的行为均需承担民事或刑事责任。</p>
        <p style="text-decoration: underline;">Please maintain the flight order and safeguard your rights in proper way. Any insults or attack on staff, or entering restricted area, block of security check entrance, boardinggate, rushing of apron, ortaxi lane, or runway, force intercept, force boarding, occupation of aircraft, damage of facility and equipment, or conduct of other acts that disrupt the production order of the civil aviation transport shall bear the civil or criminal liability.</p>
        <br/>
         <br/>
         <p >掌握更多更详细的信息，您还可以登录西部航空官方网站，点击《西部航空旅客及行李国内运输总条件》、《关于西部航空差异化服务告知内容》、《不正常航班服务指南》、《超售服务指南》等相关规定进行了解。</p>
          <p >再次感谢您的理解和支持，祝您旅途愉快！</p>
          <p  style="float:right">西部航空有限责任公司</p>
          <p style="float:left">For more information, you can log on WWW.WESTAIR.CN, click《West Air Conditions of Carriage》《The Notice of Differentiated Services》、《Service Guide For Flight Delay/Cancellation》、《Service Guide For Over-booking》to know more.</p>
          <p  style="float:right">West Air Ltd.Co.</p>
        
      </div>
    </div> -->
    <!-- <div v-if="tipNotes=='PNX'" class="reservation-detail">
      <div>
        <h3>西部航空旅客、行李国内运输总条件</h3>
        <p><strong>第一章 定　义</strong></p>
        <p>第一条《西部航空有限责任公司旅客、行李国内运输总条件》(以下简称“总条件”)是旅客与西部航空之间订立的航空运输合同文本，是双方设立航空运输合同法律关系、明确双方权利和义务的法律文件。经由西部航空签发的包括但不限于客票、航空运输电子客票行程单等，同为航空运输合同的一部分，与本条件具有同等法律效力。总条件中的下列用语，除具体条款中有其他要求或另有明确规定外，含义如下：</p>
        <p>(一)“国内航空运输”指根据旅客运输合同，其出发地点、约定经停地点和目的地点均在中华人民共和国境内的航空运输。</p>
        <p>(二)“西部航空”是西部航空有限责任公司的简称(英文名称：China West Air Co. Ltd.)；国际航空运输协会IATA两字代码：PN；国际民用航空组织ICAO指定代码：CHB；国际航空运输协会IATA结算代码：847；网址www. westair.cn；官方电话为：95373。</p>
        <p>(三)“承运人”指填开客票的航空运输企业和承运或约定承运该客票所列旅客及其行李的所有航空运输企业。</p>
        <p>(四)“出票承运人”指填开客票的航空运输企业。其数字代码显示在客票乘机联或电子客票乘机联上。</p>
        <p>(五)“销售承运人”指约定承运该客票上所列旅客的航空运输企业。其代码被作为运输承运人记录在客票乘机联或电子乘机联上。</p>
        <p>(六)“实际承运人”指提供实际航空运输及其附带服务的航空运输企业。在代码共享协议中，实际承运人可能不是销售承运人。</p>
        <p>(七)“承运人规定”指除本条件外，西部航空依法制定、公布的并于客票填开之日起有效的关于对旅客及其行李运输管理的规定，包括有效的适用票价及适用条件等。</p>
        <p>(八)“销售代理企业”指从事民用航空运输销售代理业务的企业。</p>
        <p>(九)“授权销售代理企业”指经西部航空授权为西部航空航班提供销售业务的代理企业。</p>
        <p>(十)“地面服务代理人”指从事民用航空运输地面服务代理业务的企业。</p>
        <p>(十一)“西部航空地面服务代理人”指已被西部航空指定为其航班提供地面服务的地面服务代理人。</p>
        <p>(十二)“旅客”指除机组成员以外经西部航空同意在飞机上载运或已经载运的任何人。</p>
        <p>(十三)“团体旅客”指统一组织的人数在10人(含)以上(或西部航空具体产品附有最低成团人数)，航程、乘机日期、航班和舱位等级相同并按同一类团体票价支付票款的旅客。</p>
        <p>(十四)“儿童”指旅行开始之日起年龄满2周岁(含)，但不满12周岁的人。</p>
        <p>(十五)“无成人陪伴的儿童”指开始旅行之日起，年龄满5周岁(含)，但不满12周岁，且没有年满18周岁且有民事行为能力的成年人陪伴乘机的儿童。</p>
        <p>(十六)“婴儿”指旅行开始之日起年龄不满2周岁的人。出于医学、安全等原因的考虑，西部航空不接受出生未满14天的婴儿乘机。</p>
        <p>(十七)“定座”指对旅客预定的座位、舱位等级或对行李的重量、体积的预留。</p>
        <p>(十八)“航班”指飞机按规定的航线、日期、时刻的定期飞行。</p>
        <p>(十九)“超售”指承运人接受定座数超过航班飞机最大允许旅客座位数，以期满足更多旅客成行需求并将航班座位虚耗降到最低的销售行为。</p>
        <p>(二十)“代码共享航班”指承运人通过协议在另一承运人实际承运的航班上使用自己公司航班号或多家公司通过协议在同一个航班上使用各自的航班号的航班。</p>
        <p>(二十一)“旅客定座单”指旅客购票前必须填写的供承运人或其授权销售代理企业据以办理定座和填开客票的业务单据。</p>
        <p>(二十二)“有效身份证件”指旅客购票和乘机时必须出示的由政府主管部门规定的证明其身份的证件。如：居民身份证、按规定可使用的有效护照、港、澳地区居民和台湾同胞旅行证件、军官证、警官证、士兵证、文职干部或离退休干部证明，16周岁以下未成年人户口簿等有效证件。</p>
        <p>(二十三)“客票”是指承运人或其授权代理企业销售或认可并赋予运输权利的有效文件，包括运输合同条件、声明、通知以及乘机联和旅客联等内容。客票通常表现为纸质客票和电子客票。本条件使用“客票”一词的，除特别说明予以排除或上下文可以另行推断，其含义均包括纸质客票和电子客票。</p>
        <p>(二十四)“纸质客票”指由承运人或代表承运人所填开的被称为“客票及行李票”的凭证，包括运输合同条件、声明、通知以及乘机联和旅客联等内容。</p>
        <p>(二十五)“乘机联”指纸质客票中标明“运输有效”的部分，表示该乘机联适用于指定的两个地点之间的运输。</p>
        <p>(二十六)“旅客联”指纸质客票中标明“旅客联”的部分，始终由旅客持有。</p>
        <p>(二十七)“电子客票”是指由承运人或其授权销售代理企业销售并赋予运输权利的以电子数据形式体现的有效运输凭证，是纸质客票的电子替代品。</p>
        <p>(二十八)“航空运输电子客票行程单”是指旅客购买承运人民用航空运输电子客票的付款凭证和报销凭证，同时具备提示旅客行程的作用。</p>
        <p>(二十九)“联程客票”指列明有两个(含)以上航班的客票。</p>
        <p>(三十)“来回程客票”指从出发地点至目的地点并按原航程返回原出发地点的客票。</p>
        <p>(三十一)“连续客票”指填开给旅客与另一本客票连在一起，共同构成一个单一运输合同的客票。</p>
        <p>(三十二)“日”指日历日，一周包括七日。用于发通知时，通知发出日不计算在内。用于确定客票有效期限时，客票填开日或航班飞行开始日，均不计算在内。</p>
        <p>(三十三)“定期客票”指列明航班、乘机日期和定妥座位的客票。</p>
        <p>(三十四)“不定期客票”指未列明航班、乘机日期或未定妥座位的客票。</p>
        <p>(三十五)“普通票价”指在票价适用期内的头等、公务、经济各舱位等级的销售票价中适用于普通成人旅客的最高票价。“普通票价”以旅客开始乘机之日承运人公布的票价为准。如票价管制方法发生变化的，以当时的规定为准。</p>
        <p>(三十六)“优惠票价”指不属于普通票价的其他票价。“优惠票价”以旅客开始乘机之日承运人公布的票价为准。</p>
        <p>(三十七)“免费运输”指西部航空以飞机运送旅客、行李但不收取报酬(税费除外)的国内航空运输，包括但不限于西部航空因礼遇、市场促销、雇员因私或因公出行、常旅客奖励等的免费运输。</p>
        <p>(三十八)“误机”指旅客未按规定时间办妥乘机手续或因旅行证件不符合规定而未能乘机。</p>
        <p>(三十九)“漏乘”指旅客在始发站办理乘机手续后或经停站过站时未搭乘上指定的航班。</p>
        <p>(四十)“错乘”指旅客乘坐了非客票上列明的航班。</p>
        <p>(四十一)“行李”指旅客在旅行中为了穿着、使用、舒适或便利而携带的必要或适量的物品和其他个人财物。除另有规定外，包括旅客的托运行李和非托运行李。</p>
        <p>(四十二)“托运行李”指旅客交由西部航空负责照管和运输并填开行李票的行李。</p>
        <p>(四十三)“非托运行李”指除旅客的托运行李以外，经西部航空同意在规定的行李品种、数量、重量和体积范围内，由旅客自行携带进入客舱并负责照管的自理行李和免费随身携带物品。</p>
        <p>(四十四)“自理行李”指经西部航空同意，交西部航空计重或计件，在旅行期间包括经停站停留期间，由旅客自己照管和负责的行李。</p>
        <p>(四十五)“免费随身携带物品”指在西部航空限定的品种和数量范围内并经西部航空同意，在旅行期间包括经停站停留期间，免费由旅客自行携带乘机的零星小件物品。</p>
        <p>(四十六)“行李票”指客票中与运输旅客托运行李有关的部分。</p>
        <p>(四十七)“行李牌识别联”指西部航空专为识别托运行李出具给旅客的凭据。</p>
        <p>(四十八)“办理乘机手续”指西部航空或其地面服务代理为旅客办理登机牌和托运行李手续的过程。</p>
        <p>(四十九)“离站时间”指航班旅客登机后，关机门的时间。</p>
        <p>(五十)“乘机登记截止时间”指航班停止办理乘机登记手续和领取登机牌的时间，除机场或西部航空另有规定外，一般均在航班规定离站时间前45分钟。</p>
        <p>(五十一)“约定经停地点”指除出发地点和目的地点以外，在客票或西部航空的班期时刻表内列明作为旅客旅行路线上预定停留的地点。</p>
        <p>(五十二)“转机”旅客在出发地点和目的地点间旅行时，在中间地点乘坐同一承运人的其他航班或其他承运人的航班到达目的地。</p>
        <p>(五十三)“损失”指在西部航空提供的航空运输中或与航空运输有关的其他服务时发生的直接的实际损失，包括死亡、受伤、延误、丢失、部分丢失或其他损坏。</p>
        <p>(五十四)“签转”指改变客票上列明的承运人代码。</p>
        <p>(五十五)“变更”指改变客票上列明的航班、日期、舱位等级、航程。</p>
        <p>(五十六)“舱位差价”指旅客自愿从低等级舱位变更到高等级舱位，或者从较低票价改为较高票价的差价。</p>
        <p>(五十七)“退票”指由于旅客或西部航空或其他原因，未能使用部分或全部客票，在客票有效期内，按规定退还旅客票款的过程。</p>
        <p>(五十八)“非自愿退票”指因航班取消、延误、提前、航程改变或不能提供原定座位时，旅客要求退票。</p>
        <p>(五十九)“退票费”指旅客自愿退票，承运人依照规定所收取的费用。</p>
        <p>(六十)“不可抗力”是指非正常的、无法预见的并且无法控制的情况，即使采取一切可能的措施，仍不能避免其后果的发生。</p>
        <p>(六十一)“上、下西部航空飞机过程”是指旅客在登机口跨入廊桥或者在停机坪跨上舷梯直至进入西部航空飞机、旅客走出西部航空飞机直至跨出廊桥或者跨下舷梯时止的过程。</p>
        <p>(六十二) “航班延误”是指航班实际到港挡轮挡时间晚于计划到港时间超过15 分钟的情况。</p>
        <p>(六十三)“航班出港延误”是指航班实际出港撤轮挡时间晚于计划出港时间超过15 分钟的情况。</p>
        <p>(六十四) “航班取消”是指因预计航班延误而停止飞行计划或者因延误而导致停止飞行计划的情况。</p>
        <p>(六十五) “机上延误”是指飞机关门后至起飞前或者降落后至开门前，旅客在航空器内等待超过机场规定的地面滑行时间的情况。</p>
        <p>(六十六) “西部航空合同单位” （以下简称“合同单位”）指与西部航空签订定座或购票合同的单位或个人。</p>
        <p>(六十七)“超售”指承运人接受定座数超过航班飞机最大允许旅客座位数，以期满足更多旅客成行需求并将航班座位虚耗降到最低的销售行为。</p>
        <p>(六十八)“中途分程”指经西部航空事先同意，旅客在出发地点和目的地点间旅行时由旅客有意安排在某个地点的旅程间断。</p>
        <p> </p>
        <p><strong>第二章 适用范围</strong></p>
        <p><strong>第二条</strong></p>
        <p>(一)除本条第(二)(三)(四)(五)款中另有规定外，本条件适用于西部航空以飞机运送旅客、行李而收取报酬的国内航空运输，特殊管理的国内航线除外。</p>
        <p>(二)除免费运输条件、合同、票证另有规定外，本条件亦适用于免费运输。</p>
        <p>(三)根据西部航空包机合同提供的运输，接受包机运输的旅客及行李应遵守西部航空包机合同条款规定，包机合同未约定的内容，以本条件规定为准。</p>
        <p>(四)在本条件中如果含有与国家法律、政府规定、命令或要求不一致的条款，以国家法律、政府规定、命令或要求为准。本条件的其余条款仍然有效。</p>
        <p>(五)在本条件中如果含有与西部航空最新颁布的规定不一致的条款，一律以西部航空最新颁布的规定为准。除不一致的条款外，本条件的其余条款仍然有效。</p>
        <p>(六)承运旅客和旅客的行李，旅客还应当遵守西部航空其它可适用的规定和条件。这些规定可能会变动，而且非常重要，其中包括特殊旅客的运输规定；电子设备的限制使用规定；在飞机上饮用酒精饮料的规定等。上述有关运输规定和条件，可向西部航空查询。</p>
        <p> </p>
        <p><strong>第三章 客票</strong></p>
        <p><strong>第一节 一般规定</strong></p>
        <p>第三条 客票是承运人和客票上所列姓名的旅客之间运输合同的初步证据。西部航空只向持有由西部航空或其授权代理企业填开的客票的旅客、或只向持有由西部航空或其授权代理企业填开的作为付款或部分付款证明的其他运输凭证的旅客提供运输。客票始终是西部航空的财产。客票中的运输合同条件或旅客须知是本条件部分条款的概述。</p>
        <p>第四条 客票为记名式，只限客票上所列旅客姓名与有效身份证件信息一致的旅客本人使用。</p>
        <p>第五条 客票不得转让。转让的客票无效，票款不退。如旅客不是由有权乘机或退票的人出示，而西部航空非故意、非过失向出示该客票的人提供了运输或退款，西部航空对原客票有权乘机或退票的人，不承担责任。</p>
        <p>第六条 未经西部航空允许客票不得涂改。涂改的客票无效，票款不退。</p>
        <p>第七条 客票使用要求</p>
        <p>(一)每位旅客应单独持有客票。</p>
        <p>(二)旅客要求乘机时，应出示有效乘机身份证件，并遵守以下规定：</p>
        <p>1. 持纸质客票的旅客未能出示根据西部航空规定填开的并包括所乘航班的乘机联和所有其它未使用的乘机联和旅客联的有效客票，无权要求乘机。旅客出示残缺客票或非西部航空或其销售代理企业更改的客票，也无权要求乘机。</p>
        <p>2. 电子客票经西部航空或其地面服务代理人验证其电子客票状态有效后，方可要求乘机。《航空运输电子客票行程单》仅作为旅客购买电子客票的报销凭证，具备提示旅客行程的作用，不作为机场办理乘机手续和安全检查的必要凭证。</p>
        <p>(三)除西部航空另有规定外，客票的所有航段必须按照客票所列明的航程，从始发地点开始顺序使用。如客票的第一航段未被使用，而旅客在约定的经停地点开始旅行，该客票运输无效，西部航空不予接受运输及退款。</p>
        <p>(四)每一航段必须列明舱位等级，并在航班上定妥座位和日期后方可由西部航空接受运输。对未定妥座位的航段，西部航空应按旅客的申请，根据适用的票价和所申请航班的座位可利用情况为旅客预定座位。</p>
        <p>(五)旅客应在客票有效期内，完成客票上列明的全部航程。</p>
        <p>(六)旅客应按客票列明的航程旅行，未经西部航空同意不得在经停地点提前终止旅行。否则，客票运输无效，西部航空不予接受。</p>
        <p>(七)含有国内航段的国际联程客票，其国内航段的乘机联可直接使用，不需换开成国内客票。</p>
        <p>(八)旅客在我国境外购买的用纸质国际客票填开的国内航空运输客票，应换开成我国国内客票后才能使用。国际IET电子客票，不需要换开成我国国内客票，可直接使用。</p>
        <p>(九)定期客票只适用于客票上列明的承运人、乘机日期、航班和舱位等级，不定期客票应在定妥座位后方能使用。</p>
        <p> </p>
        <p><strong>第二节 客票的有效期</strong></p>
        <p><strong>第八条</strong></p>
        <p>(一)除另有约定外，客票有效期的计算，从旅行开始或填开客票之日的次日零时起至有效期满之日的次日零时为止。</p>
        <p>(二)除另有约定外，普通票价的客票有效期自旅行开始之日起，一年内运输有效；如果客票全部未使用，则视为不定期客票，客票有效期从填开客票之日起，一年内运输有效。</p>
        <p>(三)优惠票价的客票有效期，按照西部航空优惠票价客票使用规定计算。</p>
        <p>(四)除另有规定外，变更后客票的有效期与原客票相同。</p>
        <p> </p>
        <p><strong>第三节 客票有效期的延长</strong></p>
        <p><strong>第九条</strong></p>
        <p>(一)由于西部航空的下列原因之一，致使旅客未能在客票有效期内旅行，其客票有效期将延长到西部航空能够按照该客票已付票价的舱位等级提供座位的第一航班为止：</p>
        <p>1. 取消旅客已经定妥座位的航班。</p>
        <p>2. 取消的航班约定经停地点中含有旅客的出发地点、目的地点。</p>
        <p>3. 未能在合理的时间内按照班期时刻进行飞行。</p>
        <p>4. 造成旅客已定妥座位的航班衔接错失。</p>
        <p>5. 更换了旅客的舱位等级。</p>
        <p>6. 未能提供事先已定妥的座位。</p>
        <p>(二)持普通票价客票或与普通票价客票有效期相同的优惠票价客票的旅客未能在客票有效期内旅行，是由于西部航空在旅客定座时未能按其客票的舱位等级提供航班座位，其客票有效期可以延长至西部航空能够按照该客票已付票价的舱位等级提供座位的第一个航班为止，但延长期不得超过七天。</p>
        <p>(三)持与普通票价客票有效期不同的优惠票价客票的有效期按西部航空优惠票价客票使用规定执行。</p>
        <p>(四)已开始旅行的旅客在其持有的客票有效期内因病使旅行受阻时，除西部航空对所付票价另有规定外，西部航空可将该旅客的客票有效期延长至根据医生诊断证明确定该旅客适宜旅行之日为止，或延长至适宜旅行之日以后承运人能够按照该旅客已付票价的舱位等级提供座位的自恢复旅行地点起的第一个航班为止。如客票中未使用的乘机联包含一个或一个以上中途分程地点，该客票有效期的延长不能超过自该医生诊断证明出具之日起3个月。西部航空也可同等延长患病旅客的陪伴直系亲属的客票有效期。</p>
        <p>(五)如旅客在旅途中死亡，该旅客陪同人员的客票可用延长客票有效期的方法予以更改。如已开始旅行旅客的直系亲属死亡，该旅客及其陪同的直系亲属的客票也可予以更改。此种更改应在收到死亡证明书后办理，此种客票有效期的延长不得超过死亡之日起45日。</p>
        <p> </p>
        <p><strong>第四节 客票遗失</strong></p>
        <p>第十条 纸质遗失客票的挂失</p>
        <p>(一)旅客的客票全部或部分遗失或残损，或旅客出示的客票未能包括旅客联和所有未使用的乘机联，旅客应以书面形式向西部航空或其授权的销售代理人申请挂失。</p>
        <p>(二)旅客申请挂失，不需提供公安机关出具的遗失证明，但须出示其有效身份证件。如申请挂失者不是旅客本人，需出示旅客本人和挂失者的有效身份证件，并提供书面申请、原购票的出票人联及足以证明该客票遗失的其他资料或证明。</p>
        <p>(三)在旅客申请挂失前，客票如全部或部分已被冒用或冒退，西部航空不承担责任。</p>
        <p>第十一条 纸质定期客票的补开</p>
        <p>纸质定期客票遗失后，旅客须经受理报失的西部航空直属销售部门批准，在原定航班停止办理乘机手续前向西部航空提供符合规定的资料与证明，经西部航空查证后，在下列条件下可以补开原定航班新客票：</p>
        <p>(一)旅客须填写《西部航空遗失票证报失申请书》。</p>
        <p>(二)旅客须声明同意赔偿可能由此造成的西部航空的一切损失，包括已经或今后被他人冒用或冒退以及必要的诉讼费用。</p>
        <p>第十二条 遗失纸质客票的退款</p>
        <p>(一)不定期客票遗失，旅客应当及时按本章第十条规定的手续以书面形式向西部航空申请挂失。经查证该客票未被冒用、冒退，待客票有效期满后30日内，凭符合本条件第十条第(二)款规定的资料与证明办理退款手续。</p>
        <p>(二)定期客票遗失应在遗失客票有效期满30日内，经西部航空查证后，凭符合本条件第十条第(二)款规定的资料与证明以及重新购票的旅客联，予以办理遗失客票的退款手续。</p>
        <p>第十三条 电子客票行程单的遗失</p>
        <p>(一)电子客票行程单遗失不补，旅客以书面形式向西部航空提出申请，可凭有效身份证件在原购票地点或西部航空售票处办理购票证明。</p>
        <p>(二)购票证明只证明旅客的购票行为，不是有效的旅行证件和报销凭证。</p>
        <p> </p>
        <p><strong>第四章 票价和税费</strong></p>
        <p>第十四条 票价</p>
        <p>(一)客票价(简称“票价”)指旅客由出发地机场至目的地机场的航空运输价格，不包括机场与市区之间或同一城市机场与机场之间的地面运输费用及各项附加费。</p>
        <p>政府或有关当局规定对旅客征收的税款和费用以及政府或有关当局批准的由机场经营人或承运人对旅客征收的费用不包括在客票价之内，该项税款或费用应由旅客支付。在旅客购票时，西部航空应告知旅客未包括在票价中的税款和费用。</p>
        <p>(二)客票价为旅客购票之日适用的票价。客票出售后，如票价调整，客票不涉及自愿变更操作，票款不作变动。</p>
        <p>(三)西部航空公布的票价，适用于直达航班运输。如旅客要求经停或转乘其他航班时，应按实际航段分段相加计算票价。</p>
        <p>(四)使用优惠票价的旅客，应遵守该优惠票价的相关规定。优惠票价的客票可以附有限制或排除旅客签转、变更、退票权利的条件。旅客应选择适合需求的客票票价。</p>
        <p>第十五条 票款</p>
        <p>(一)旅客应按国家规定的货币和付款方式交付票款，除西部航空与旅客另有协议外，票款一律现付。</p>
        <p>(二)当收取的票款与适用的票价不符或计算有错误时，应按照西部航空规定，由旅客补付不足的票款或由西部航空退还多收的票款。</p>
        <p>(三)除特殊促销票价外，客票价以人民币10元为计算单位，尾数一律四舍五入。西部航空收取或支付的任何其他费用均以承运人的规定为准。</p>
        <p>第十六条 革命伤残军人、因公致残的人民警察、儿童、婴儿票价</p>
        <p>(一)革命伤残军人和因公致残的人民警察凭民政部颁发的《中华人民共和国革命伤残军人证》和《中华人民共和国人民警察伤残怃恤证》，按照同一航班成人适用普通票价的50%购票。</p>
        <p>(二)儿童按照同一航班成人适用普通票价的50%购买儿童票，并提供座位。</p>
        <p>(三)婴儿按照同一航班成人适用普通票价的10%购买婴儿票，不提供座位。如需要单独占用座位时，应购买儿童票。每一年满18周岁、具有完全民事行为能力的成人旅客携带婴儿的数量不能超过2名(含2名)，超过1名时，超过的人数应购儿童票。</p>
        <p>第十七条 税费</p>
        <p>政府、有关当局或机场经营人规定的对旅客或由旅客享用的任何服务或设施而征收的税款或费用不包括在公布票价之内。该项税款或费用应由旅客支付。</p>
        <p> </p>
        <p><strong>第五章 定座</strong></p>
        <p>第十八条 定座基本要求</p>
        <p>(一)定座只有在旅客按照西部航空规定的手续提交相关信息、证件并指定乘坐具体航班的要求被西部航空所接受时，才能认为已经定妥并有效。</p>
        <p>(二)未经西部航空或西部航空销售代理企业记录认可，不得认为定座已确认。</p>
        <p>(三)按照西部航空规定，优惠票价可以附有限制或排除旅客签转、更改、退票、取消定座权利的条件。</p>
        <p>(四)旅客出示的客票经证实其定座记录是无效的，西部航空不保证旅客乘坐原定航班成行，但可视情况协助旅客成行，产生的费用由造成定座记录无效的责任人承担。</p>
        <p>(五)持有连程或来回程客票的旅客未能搭乘已定妥座位的航班，且未预先通知西部航空对其客票上列明的续程或回程航班予以保留，西部航空有权取消旅客相应后续航班的定座。但是，如果旅客预先通知西部航空，旅客相应后续航班的定座仍然有效。</p>
        <p>第十九条 购票时限</p>
        <p>购票时限已经定妥的座位，旅客应在西部航空规定或预先约定的时限内购买客票，否则，原定座位不予保留。</p>
        <p>第二十条 个人资料</p>
        <p>旅客认可向西部航空提供的个人资料，旨在用于定座和安排相关的运输服务。为此，旅客授权西部航空保留其个人资料并善加保密且可将必须的资料传递给政府机构、西部航空有关部门、其他相关承运人或相关服务的提供者。旅客有责任按照西部航空规定提供真实、准确、完整的有效身份信息、联系电话等。</p>
        <p>第二十一条 定座优先权</p>
        <p>(一)非自愿改变航程的旅客，在航班有可利用座位的条件下，可优先定座。</p>
        <p>(二)旅客持没有定妥座位的全部或部分航段的客票要求定座，或持已定妥座位的全部或部分航段的客票要求更改定座，都无权要求优先。</p>
        <p>第二十二条 机上座位安排</p>
        <p>西部航空不保证提供旅客指定的机上座位，只负责按旅客已经定妥的航班及舱位等级提供座位。</p>
        <p>第二十三条 更改或取消定座</p>
        <p>旅客更改或者取消定座，应当在西部航空规定的时限内提出。票价附有条件的，旅客更改或者取消定座，应当符合该条件的规定。</p>
        <p>第二十四条 座位再证实</p>
        <p>旅客持有在境外购买的定妥座位的西部航空国内段客票，须按西部航空规定办理座位再证实手续。</p>
        <p> </p>
        <p><strong>第六章 拒绝运输和限制运输</strong></p>
        <p>第二十五条 拒绝运输权</p>
        <p>西部航空出于安全原因或根据合理的判断，认为属下列情形之一时，有权拒绝运输旅客及其行李：</p>
        <p>(一)为遵守国家的有关法律、法规和政府规章及其他规范性文件的规定。</p>
        <p>(二)旅客的年龄、精神或身体状况不适合航空旅行。</p>
        <p>(三)旅客的行为影响其他旅客正当权利的实现及对机上安全秩序产生不利影响，或对其自身或其他人员或财产可能造成任何危险或危害。</p>
        <p>(四)旅客未遵守国家的有关法律、法规和政府规章及其他规范性文件的规定，或未遵守西部航空相关规定。</p>
        <p>(五)旅客拒绝接受安全检查。</p>
        <p>(六)旅客未支付适用的票价、费用以及(或)未承兑其与西部航空或有关承运人之间的信用付款。</p>
        <p>(七)旅客未能出示本人的有效的身份证件。</p>
        <p>(八)旅客出示的客票经证实是非法获得或不是在出票承运人或其销售代理企业处购买的、或属已挂失或被盗的、或是伪造的、或不是由西部航空或其销售代理企业更改的乘机联或乘机联被涂改的。</p>
        <p>(九)出示客票的人不能证明本人即是客票上“旅客姓名”栏内列明的人。</p>
        <p>(十)旅客出示的客票经证实其定座记录是无效的。</p>
        <p>(十一)旅客没有遵守西部航空有关安全或安保方面的指令。</p>
        <p>(十二)旅客未能遵守机上禁烟或使用电子设备的规定。</p>
        <p>(十三)旅客曾有航班上的不良行为纪录，并且西部航空有理由相信此种不良行为仍有可能再次发生。</p>
        <p>第二十六条 当航班超售时，西部航空有权决定超售航班的旅客及行李的载运安排。</p>
        <p>第二十七条 对被拒绝运输旅客的安排</p>
        <p>对被拒绝运输的旅客，承运人按下列规定办理：</p>
        <p>(一)属本章第二十五条第(一)款情形的旅客，已购客票按非自愿退票的规定办理。</p>
        <p>(二)属本章第二十五条第(二)款，由于年龄、精神或身体状况不适合旅行的，已购客票按非自愿退票的规定办理。</p>
        <p>(三)属本章第二十五条（三）、（四）、（五）、（十一）、（十二）、（十三）款情形的旅客，已购客票按自愿退票的规定办理。</p>
        <p>(四)属本章第二十五条第(六)款情形的旅客，由旅客补付不足的票款或税费，或按非自愿退票的规定办理，退还旅客已支付的票款。</p>
        <p>(五)属本章第二十五条第(七)款情形的旅客，按自愿改变航班、日期或按自愿退票的规定办理。</p>
        <p>(六)属本章第二十五条第（八）、（九）、（十）款情形的旅客，承运人保留扣留其客票的权利，必要时呈报有关主管部门处理。</p>
        <p>第二十八条 限制运输</p>
        <p>(一)无成人陪伴儿童、婴儿、无自理能力的人、孕妇、病患旅客或需要特殊帮助的旅客等，由于年龄、身体或精神状况在旅途中需要特殊照顾或在一定条件下才能运输，只有在符合西部航空规定的条件下，经西部航空预先同意并在必要时做出安排后方予载运。上述有关运输规定和条件，可向西部航空查询。</p>
        <p>(二)限制运输旅客的数量：出于安全的考虑，西部航空对每一航班限制运输旅客数量进行相应的控制。西部航空航班上每名成人旅客限携带两名儿童旅客出行，超过两名儿童的其他儿童旅客按无成人陪伴儿童进行保障，无成人陪伴儿童人数限制参照限制运输旅客的数量。每一航班限制运输旅客人数总和可向西部航空查询。</p>
        <p> </p>
        <p><strong>第七章 购票</strong></p>
        <p>第二十九条 一般规定</p>
        <p>(一)旅客可在西部航空或其销售代理企业、海航集团内各航空公司直属售票处购票，也可登陆西部航空官方网站（www.westair.cn）或通过西部航空呼叫中心95373进行咨询和购票。</p>
        <p>(二)旅客在售票处购票须凭本人有效身份证件或公安机关出具的其他有效身份证件，并填写《旅客定座单》。通过官方网站或西部航空呼叫中心购买客票应按西部航空要求如实提供旅客有效身份证件、联系电话、儿童、婴儿出生日期等信息。旅客应对其提供的证件及信息的真实性、准确性负责，并且确保其与办理乘机登记手续时使用的证件相同，否则由此产生的损失由旅客自行承担。</p>
        <p>(三)限制运输旅客购票，应向西部航空或其授权的销售代理企业的售票处提出申请并按西部航空要求提供相关证明，经西部航空或有关承运人同意后，方可购票。</p>
        <p>第三十条 西部航空或其授权销售代理人应根据旅客的要求，出售各类客票。</p>
        <p> </p>
        <p><strong>第八章 班期时刻、航班取消与变更</strong></p>
        <p>第三十一条 航班时刻</p>
        <p>(一)西部航空应尽力在合理的期限内运送旅客及其行李，遵守公布的在旅行之日内有效的班期时刻。但是，航班时刻表或其他场所所列的时刻或机型仅供参考,在其公布之日与旅客实际开始旅行之日期间有可能发生变动，西部航空对航班时刻表或其他场所所列的时刻或机型不予保证,而且该航班时刻或机型也并非航空运输合同的组成部分。</p>
        <p>(二)旅客购买客票应按西部航空的规定如实申报个人有效身份证件、联系电话等重要信息。旅客在西部航空直属购票处或其授权销售代理企业的售票处购票须填写《旅客定座单》。购买儿童票或婴儿票，应提供儿童或婴儿出生年月日的有效证明。旅客应对其提供的证件及信息的真实性、准确性负责，并且确保其与办理乘机登记手续时使用的证件相同，否则由此产生的损失由旅客自行承担。</p>
        <p>(三)西部航空在接受旅客的订票之前，将告知旅客当时有效的预订航班时刻，并在旅客的客票上列明。在客票售出后，西部航空可能会更改航班时刻。如果旅客给西部航空提供了有效联系方式，西部航空应通知旅客航班时刻的变更。在旅客购票之后，如果西部航空对航班时刻做出变更而旅客不能接受，并且西部航空无法为旅客安排其可以接受的替代航班，可按照本条件第四十七条“非自愿退票”的规定办理退票。</p>
        <p>第三十二条 航班取消与变更</p>
        <p>有下列情形之一的，西部航空可按规定不经事先通知，改变机型或航线、取消、中断、推迟或延期航班飞行：</p>
        <p>(一)为遵守国家的法律、政府规定和命令。</p>
        <p>(二)为保证飞行安全。</p>
        <p>(三)其他不可抗力或不可预见的原因。</p>
        <p>(四)其他非西部航空的原因。</p>
        <p>第三十三条 因航班取消或延误，而未能向旅客提供已定妥的座位（包括舱位等级），或未能在旅客的目的地点停留，或造成旅客已定妥座位的航班衔接错失，西部航空可根据旅客的合理需求, 协助采取以下措施之一。</p>
        <p>(一)为旅客安排有可利用座位的西部航空后续航班。</p>
        <p>(二)征得旅客及有关承运人的同意后，办理签转手续。</p>
        <p>(三)变更原客票列明的航程，安排西部航空或其他承运人的航班将旅客运达目的地或中途分程地点，票款、逾重行李费和其他服务费用的差额多退少不补。</p>
        <p>(四)按本条件第四十七条“非自愿退票”的规定办理。</p>
        <p>(五)按旅客要求及时提供航班延误或者取消证明。</p>
        <p> </p>
        <p><strong>第九章　客票变更</strong></p>
        <p>第三十四条 客票变更</p>
        <p>“客票变更”指改变客票上列明的航班、日期、舱位等级、航程。客票变更分非自愿变更及自愿变更两类。</p>
        <p>第三十五条 非自愿变更</p>
        <p>航班取消、提前、延误、航程改变或不能提供原定座位时，西部航空应优先安排旅客乘坐本公司后续航班或按本条件第四十七条非自愿退票的规定办理。因西部航空的原因，旅客的舱位等级变更时，票款的差额多退少不补。</p>
        <p>(二)除另有协议外，非自愿变更的要求应在西部航空能够提供座位的第一个后续航班所规定的离站时间之前提出。旅客在上述规定时间以外提出非自愿变更申请，按照本条件第四十七条非自愿退票办理。</p>
        <p>第三十六条 自愿变更指旅客自愿改变航班、日期、舱位等级、航程。</p>
        <p>第三十七条 自愿改变舱位等级</p>
        <p>旅客购票后，如从较低舱位等级变更为较高舱位等级，或从较低票价变更为较高票价，需向旅客收取票价价差。如从较高舱位等级变更为较低舱位等级或从较高票价变更为较低票价，则按自愿退票处理。</p>
        <p>第三十八条 自愿改变航班、日期</p>
        <p>旅客购票后，如要求改变航班、日期，西部航空及其销售代理企业在航班有可利用座位和时间允许的条件下按西部航空现行《多等级舱位管理规定》及相关产品规定办理。</p>
        <p>第三十九条 自愿改变航程</p>
        <p>旅客如自愿改变航程，则按自愿退票处理。</p>
        <p> </p>
        <p><strong>第十章 客票签转</strong></p>
        <p>第四十条 客票签转</p>
        <p>指改变客票上列明的承运人代码。客票签转分自愿签转及非自愿签转两类。</p>
        <p>第四十一条 非自愿签转</p>
        <p>航班取消、延误、航程改变或不能提供原定座位时，西部航空应优先安排旅客乘坐西部航空后续航班。除西部航空另有规定外，在征得旅客及有关承运人同意后，可办理签转手续。</p>
        <p>第四十二条 自愿签转</p>
        <p>(一)一般规定</p>
        <p>旅客自愿要求改变承运人，应征得原承运人或其授权代理企业的同意，并在新承运人允许及符合下列全部条件下，承运人可予以签转：</p>
        <p>1.旅客使用的票价无签转限制。</p>
        <p>2.旅客的客票未改变过舱位等级。</p>
        <p>3.所签转的承运人与原承运人有互售关系或票证结算关系且所签转的承运人航班有相应服务等级可利用。</p>
        <p>(二)若接收签转的承运人票价与西部航空票价不一致，产生的票款差价多退少补。</p>
        <p>(三)凡不符合本条第(一)、(二)款规定的旅客要求改变承运人，一律按自愿退票的规定办理。</p>
        <p>(四)西部航空的销售代理企业未经特别授权不得为旅客办理签转手续。</p>
        <p> </p>
        <p><strong>第十一章　退　票</strong></p>
        <p>第四十三条 一般规定</p>
        <p>(一)由于西部航空未能按照运输合同提供运输或旅客要求自愿改变其旅行安排，对旅客未能使用的全部或部分客票，西部航空应按本章相关规定办理退票。退票分自愿退票及非自愿退票两类。</p>
        <p>(二)旅客要求退票，除遗失客票的情形外，购买纸质客票的旅客必须凭客票未使用的全部乘机联和旅客联，方可办理退票。购买电子客票的旅客凭本人有效身份证件办理退票，并交回已打印的电子客票行程单，退票时其电子客票须为有效状态，方可办理退票。</p>
        <p>(三)在非客票上列明的地点发生不正常航班，旅客要求退票，须凭始发站登机牌原件、不正常航班证明及本人有效身份证件办理(纸质客票还须提供旅客联原件或复印件)。</p>
        <p>第四十四条 退票受款人</p>
        <p>(一)西部航空有权向客票上列明姓名的旅客本人办理退票。</p>
        <p>(二)当客票上列明的旅客不是该客票的付款人，西部航空应按列明的退票限制条件将票款退给付款人或其指定人。</p>
        <p>(三)旅客退票应出示本人有效身份证件，如退票受款人不是客票上列明的旅客本人，应出示旅客本人和退票受款人的有效身份证件。</p>
        <p>(四)西部航空将票款退给持有未使用航段的有效客票并符合本条第(一)、(二)、(三)款规定的人，应被视为正当退票。西部航空也随即解除责任。</p>
        <p>第四十五条 退票期限</p>
        <p>除本条件第十二条遗失纸质客票的退款情况以外，旅客要求退票，应在其客票有效期内向西部航空提出并办理退款手续，否则西部航空有权拒绝办理。</p>
        <p>第四十六条 退票地点</p>
        <p>(一)旅客非自愿退票，可在原购票地、西部航空直属售票处或引起非自愿退票发生地的西部航空授权的代理企业售票处办理。</p>
        <p>(二)旅客自愿退票，应在下列地点办理：</p>
        <p>1.在出票地要求退票，只限在原购票售票处办理。通过西部航空官网、西部航空呼叫中心销售的客票除原购票售票处外，还可在西部航空直属柜台办理。</p>
        <p>2.在出票地以外的航班始发地或终止旅行地要求退票，可在西部航空直属售票处或经西部航空特别授权的销售代理人办理。</p>
        <p>第四十七条 非自愿退票</p>
        <p>(一)航班取消、延误、航程改变或不能提供原定座位时旅客可办理非自愿退票。始发地应退还旅客所付全部票款；经停地应按旅客的订座舱位退还未使用航段的票款，但不得超过原付票款金额。均不收取退票费。</p>
        <p>(二)持由定期客票更改为不定期客票的旅客在确认座位时，若因西部航空航班取消原因提出退票，按“非自愿退票”处理，不收退票手续费。</p>
        <p>(三)旅客因病要求退票，需在航班规定离站时间前提出申请并退座，同时提供县级（含）以上医疗单位出具的医生诊断证明（盖章有效）、收费证明，免收退票费。患病旅客的陪伴人员要求退票，应与患病旅客同时办理退票手续。若出现多位陪同人员，其中一位陪同人员免收退票费，其他陪伴人员按自愿退票规定办理。</p>
        <p>第四十八条 自愿退票</p>
        <p>(一)旅客自愿退票，按西部航空现行《多等级舱位管理规定》及相关产品规定执行。</p>
        <p>(二)除另有规定外，持不定期客票的旅客要求退票，免收退票费。持由定期更改为不定期客票的旅客要求退票，按客票票面列明的订座舱位对应的退票规定收取退票费。持由定期客票更改为不定期客票的旅客在确认座位时，若因西部航空航段取消原因提出退票，按本条件第四十七条“非自愿退票”处理，不收退票手续费。</p>
        <p>(三)按成人适用普通票价50%购票的革命伤残军人，因公致残人民警察、自愿退票，免收退票款。</p>
        <p>(四)持婴儿客票的旅客要求退票，免收退票费。</p>
        <p>(五)旅客在航班的经停地自动终止旅行，该航班未使用航段的票款不退。</p>
        <p> </p>
        <p><strong>第十二章 团体旅客</strong></p>
        <p>第四十九条 人数的计算</p>
        <p>除另有规定外，团体旅客是指统一组织的人数在10人(含)以上，航程、乘机日期、航班和舱位等级相同并支付团体票价的旅客，凡购买婴儿、儿童及其它优惠票价客票的旅客不得计算在团体人数内。</p>
        <p>第五十条 自愿变更</p>
        <p>团体旅客购票后，如自愿改变航班、日期、舱位等级、航程，均按西部航空团体旅客现行规定办理。</p>
        <p>第五十一条 退票地点</p>
        <p>(一)团体旅客自愿退票只限在原购票的售票处办理。</p>
        <p>(二)团体旅客非自愿退票，可在原购票地、西部航空直属售票处或引起非自愿退票发生地的西部航空授权的代理企业售票处办理。</p>
        <p>第五十二条 非自愿变更</p>
        <p>团体旅客非自愿变更，按西部航空现行规定办理。</p>
        <p>第五十三条 非自愿退票</p>
        <p>(一)团体旅客或团体旅客中部分成员非自愿退票，按照本条件第四十七条非自愿退票办理。在航班始发地应退还旅客所付全部票款。经停地应按旅客的订座舱位退还未使用航段的票款，但不得超过原付票款金额。</p>
        <p>(二)团体旅客因病退票，除特别规定外，应在乘机手续登记截止时间前提出并退座，同时提供县级(含)以上医疗单位出具的医生诊断证明，免收退票费。患病旅客的陪伴人员要求退票，应与患病旅客同时办理退票手续，免收退票费。</p>
        <p>第五十四条 自愿退票</p>
        <p>团体旅客购票后自愿要求退票，西部航空以订座终端中的退座时间为准，并按现行团体客票退票规定收取退票费办理。</p>
        <p>第五十五条 团体旅客误机</p>
        <p>团体旅客误机，客票作废，票款不退，仅退税费。</p>
        <p> </p>
        <p><strong>第十三章 超 售</strong></p>
        <p>第五十六条 按照国际航空运输行业通行的做法，西部航空根据市场信息以及收益管理系统数据分析，为满足更多旅客成行需求并将航班座位虚耗降到最低，西部航空可能会在某些航班上进行适当的超售。</p>
        <p>第五十七条 超售处理原则</p>
        <p>(一)西部航空应以适当的方式告知旅客超售的含义以及超售旅客享有的权利。</p>
        <p>(二)当航班出现超售时，西部航空将首先寻找自愿放弃座位的旅客，并给予旅客经济补偿。</p>
        <p>(三)当没有足够的旅客自愿放弃座位时，西部航空可根据规定的优先登机原则拒绝部分旅客登机。</p>
        <p>(四)发生超售后优先保障顺序为：</p>
        <p>1.重要旅客（VVIP、VIP、CIP）及其随行人员。</p>
        <p>2.衔接国际航班的旅客。</p>
        <p>3.金鹏卡的常旅客。</p>
        <p>4.到达站转机衔接时间短的联程旅客。</p>
        <p>5.有控座的加机组人员或机务跟机人员。</p>
        <p>6.公司同意并事先安排的老弱病残等特殊旅客。</p>
        <p>7.有证明特别困难急于成行的旅客。</p>
        <p>8.团体旅客。</p>
        <p>9.购买机加酒等辅营产品的旅客。</p>
        <p>10.普通定座旅客（按票面价由高至低顺序，同等舱位先到旅客优先）。</p>
        <p>(五)发生超售后旅客拉减顺序为：</p>
        <p>1.无定座记录（虚假定座）旅客及假RR旅客。</p>
        <p>2.晚到旅客。</p>
        <p>3.持职工及家属优惠票的旅客（拉减顺序：Shoulder Season产品票，1/5 优惠票，职工年度免票）。</p>
        <p>4.原机过站的我司无定座记录工作人员。</p>
        <p>5.本站始发的我司有定座记录工作人员（有控座加机组人员除外）。</p>
        <p>6.原机过站的我司有定座记录工作人员（有控座加机组人员除外）。</p>
        <p>7.本站始发的直达票价由低到高的旅客（不含老、弱、病、残、孕等特殊旅客及其陪护人员，携带婴儿或儿童的旅客）。</p>
        <p>8.本站始发的持联程客票票价由低到高的旅客。</p>
        <p>9.持公司免票的旅客（包含但不限于金鹏卡积分免票，机构客户免票，宾客免票）。</p>
        <p>(六)西部航空为被拒绝登机的旅客提供相应的服务并给予经济补偿。</p>
        <p>(七)服务及经济补偿标准</p>
        <p>1.票务改签标准：</p>
        <p>(1)当航班发生实际超售时，免费为旅客改签或购买至后续最早的且有空余座位的航班。</p>
        <p>(2)我司承担签转或购买其它公司航班的费用，仅限经济舱。</p>
        <p>(3)如果旅客选择退票，按照非自愿退票处理。</p>
        <p>2.补偿标准</p>
        <p>(1) 旅客购买机票票面价(不含燃油附加费、民航发展基金及其他税费)超过200元(含)的，根据改签航班起飞时刻制定赔偿标准如下：</p>
        <p>A改签至原航班计划起飞时刻后4小时(含)以内且为当日后续航班的，现金补偿200元。</p>
        <p>B改签至原航班计划起飞时刻后4小时(含)以内但为次日后续航班的，现金补偿300元。</p>
        <p>C改签至原航班计划起飞时刻后4小时(不含)以外且为当日后续航班的，现金补偿300元。</p>
        <p>D改签至原航班计划起飞时刻后4小时(不含)以外但为次日后续航班的，现金补偿400元。</p>
        <p>(2) 旅客购买机票票面价(不含燃油附加费、民航发展基金及其他税费)不足200元(不含)的，不论改签航班时刻如何，现金补偿200元。</p>
        <p>(3)如旅客选择退票，按非自愿退票处理，并给予旅客现金补偿200元。</p>
        <p>(4)不向公司职工及家属票、机构客户免票、代理人免票提供现金补偿。</p>
        <p>3. 住宿安排标准：</p>
        <p>(1) 在等待后续航班过程中，在用餐时间段，为旅客提供免费餐食和饮用水。</p>
        <p>(2)后续航班在3小时(含)以内，旅客在隔离区内/外休息，我司工作人员协助旅客重新办理登机手续。</p>
        <p>(3)后续航班在原航班计划起飞时间4小时(含)以上的旅客，为旅客提供免费酒店休息，免费提供机场往返酒店的交通，免费提供旅客餐食，协助旅客重新办理乘机手续。</p>
        <p> </p>
        <p><strong>第十四章 代码共享航班</strong></p>
        <p>第五十八条 西部航空或其销售代理企业在旅客购票时，应告知旅客代码共享航班的实际承运人。</p>
        <p>第五十九条 销售承运人根据与实际承运人的代码共享协议内容办理旅客客票签转、变更、退票及乘机手续等工作。</p>
        <p> </p>
        <p><strong>第十五章　乘　机</strong></p>
        <p>第六十条 一般规定</p>
        <p>(一)办理乘机手续</p>
        <p>1.各机场的乘机登记截止时间并不一致，西部航空建议旅客自行了解并遵守各运营机场的乘机登记截止时间，西部航空始终保留根据各机场规定变更乘机登记截止时间的权利。关于西部航空航班的乘机登记截止时间,旅客可以咨询西部航空或授权代理企业。西部航空开始办理航班乘机手续的时间一般不迟于客票上列明的航班离站时间前90分钟，除运营机场当局或西部航空另有规定外，截止办理乘机手续时间为航班离站时间前45分钟。</p>
        <p>2.旅客应当在航班始发前充足的时间内到达西部航空的乘机登记处，以便办妥所有政府规定的手续和乘机手续。西部航空及其地面服务代理企业应按时开放乘机手续柜台，按规定接受旅客出具的客票，快速、准确地办理乘机登记手续。</p>
        <p>3.西部航空及其地面服务代理人应按时开放乘机手续柜台，按规定接受旅客出具的客票，快速、准确地办理乘机登记手续。</p>
        <p>4.旅客可在机场乘机手续办理柜台或自助CUSS机办理乘机手续。</p>
        <p>5.持未定妥座位客票的旅客，办理乘机手续的部门可不予办理。</p>
        <p>6.对于旅客不遵守本条规定而产生的任何损失或费用，西部航空不承担责任。</p>
        <p>(二)登机</p>
        <p>旅客办理完乘机手续通过安全检查后，必须按时到达指定的登机门。如旅客未能在飞机舱门关闭前按时到达指定登机门，由此所产生的损失和费用，旅客自行承担。</p>
        <p>第六十一条 乘机前，旅客及其行李和免费随身携带物品必须经过安全检查。</p>
        <p>第六十二条 根据国家有关规定不能乘机的旅客，西部航空有权拒绝其乘机，已购客票按自愿退票的规定处理。</p>
        <p>第六十三条 旅客误机后，如要求变更或退票，按自愿变更或自愿退票的规定办理。</p>
        <p>第六十四条 旅客漏乘</p>
        <p>(一)由于旅客原因发生漏乘，按自愿退票规定办理。</p>
        <p>(二)由于承运人原因旅客漏乘，西部航空将尽早安排旅客乘坐后续航班成行。如旅客要求退票，按非自愿退票的规定办理。</p>
        <p>第六十五条 旅客错乘</p>
        <p>旅客错乘飞机，西部航空应尽早安排错乘旅客乘坐后续航班飞往旅客客票上列明的目的地，票款不补不退。如因旅客原因错乘，旅客要求在错乘的到达站终止旅行，票款差额不补不退。如因西部航空或机场原因错乘，旅客要求退票，按非自愿退票的规定办理。</p>
        <p>第六十六条 关舱门后终止飞行</p>
        <p>(一)当航班正常时，旅客在航班始发地关舱后自愿提出终止旅行，按照西部航空现行规定中离站时间后自愿变更及退票规定处理，并扣取相应的手续费。若旅客在航班经停地自愿提出终止旅行后，其客票作废，西部航空不予以变更或退票。</p>
        <p>(二)当航班不正常时，无论旅客是自愿或被动终止旅行，西部航空都免费为旅客办理客票退、改、签业务(特殊产品以提前约定的特殊退、改、签规定为准)。</p>
        <p> </p>
        <p><strong>第十六章　行李运输</strong></p>
        <p> </p>
        <p>第一节 一般规定</p>
        <p>第六十七条 西部航空承运的行李，只限于符合本条件第一条第（四十一）款定义范围内的物品。西部航空承运的行李，按照运输责任分为托运行李和非托运行李。非托运行李包括自理行李和随身携带物品。旅客携带危险品规定详细见西部航空官方网站（www.westair.cn）“危险品”相关规定。国家规定的禁运物品、限制运输物品、危险物品，以及具有异味或容易污损飞机的其它物品，不能作为行李或夹入行李内托运。西部航空在收运行李前或在运输过程中，发现行李中装有不得作为行李或夹入行李内运输的任何物品，可以拒绝收运或随时终止运输。</p>
        <p>第六十八条 禁运物品</p>
        <p>下列物品不得作为行李或夹入行李内托运，也不得作为自理行李和随身携带物品带入客舱运输：</p>
        <p>(一)内装锂电池和/或烟火材料等危险品的公文箱、现金箱、现金袋等保密型设备。</p>
        <p>(二)梅斯毒气、胡椒喷雾器等带刺激性或使人丧失能力的装置。</p>
        <p>(三)液氧的个人医用氧气装置。</p>
        <p>(四)爆炸品、压缩气体、锂电池等危险品的电击武器。</p>
        <p>(五)枪支，含各种类型仿真玩具枪、枪型打火机及其他各种类型带有攻击性的武器，但体育运动用器械除外。</p>
        <p>(六)军械、警械，管制刀具。</p>
        <p>(七)活体动物，但本条件规定的小动物及导盲犬和助听犬除外。</p>
        <p>(八)国家规定的其他禁运物品。</p>
        <p>第六十九条 经西部航空批准，仅可作为托运行李运输的物品</p>
        <p>下列物品经西部航空批准后，仅可作为托运行李进行运输：</p>
        <p>(一)弹药。包装牢固的1.4S项弹药筒(小型武器子弹)，每人携带毛量不超过5KG(11LB),不包括爆炸性或燃烧性的射弹。</p>
        <p>(二)装有密封型湿电池或符合特殊规定A123电池的轮椅/助行器。</p>
        <p>(三)装有非密封型电池的轮椅/助行器。</p>
        <p>(四)装有锂电池的轮椅/助行器。</p>
        <p>(五)野营炉以及装有易燃液体燃料的燃料容器。</p>
        <p>(六)公文箱、现金箱、现金袋等将危险品作为设备的一部分，内装锂电池/或烟火材料的保安型设备。</p>
        <p>第七十条 仅可作为非托运行李运输的物品</p>
        <p>下列物品不得作为托运行李或在托运行李中夹带，仅可作为非托运行李进行装运，由旅客带入客舱并自行保管。对托运行李中放置或夹带以下物品的遗失和损坏，西部航空按一般托运行李承担责任：</p>
        <p>(一)水银气压计或温度计。须经西部航空批准，可由政府气象局或类似官方机构的代表每人只能携带一支，且必须装进坚固的外包装中。</p>
        <p>(二)超过100WH，但不超过160WH额定值的锂离子电池。经西部航空批准，每人可携带不多于两个的分别保护的备用电池。</p>
        <p>(三)重要文件和资料。</p>
        <p>(四)包括但不限于货币、汇票等有价证券，珠宝、贵重金属(金、银等)及其制品，古玩字画。</p>
        <p>(五)易碎和易损坏物品、易腐物品。</p>
        <p>(六)旅行证件。</p>
        <p>(七)其他需要专人照管的物品。</p>
        <p>第七十一条 经西部航空批准，可作为行李运输的物品</p>
        <p>西部航空对运输下列物品有严格的数量限制和包装要求，只有在符合西部航空运输条件的情况下，并经西部航空批准，方可作为托运行李或非托运行李进行运输：</p>
        <p>(一)医用的气态氧气或空气气瓶。每个气瓶的毛重不能超过5KG；</p>
        <p>(二)盛装2.2项的小型气瓶。每人携带不超过4个，每个气瓶的水容量不超过50ML。</p>
        <p>(三)内装隐含的危险品的雪崩救援背包。每人可携带一件，雪崩救援背包也可内装含有净重不超过200MG 1.4S项爆炸品的烟火引发装置。</p>
        <p>(四)化学品监视设备。</p>
        <p>(五)固体二氧化碳(干冰)。每人携带数量不超过2.5KG。</p>
        <p>(六)产生热量的物品。能产生大量热量的以电池组为动力的设备，如潜水高强度灯，如果启动可能引起火灾。</p>
        <p>(七)轻便医用电子装置。装有锂金属或锂离子电芯或电池的轻便医用电子装置。</p>
        <p>(八)精密仪器、电器等类物品，应作为货物托运。如按托运行李运输，必须有符合西部航空要求及该类物品应有妥善包装，并且此类物品的重量不得计算在免费行李额内,按逾重行李费收取运费。</p>
        <p>(九)体育运动用器械。包括体育运动用枪支和弹药，必须出具枪支运输许可证或者国家体育行政部门的许可证明作为托运行李运输，枪支必须卸下子弹和扣上保险并妥善包装。</p>
        <p>(十)小动物，导盲犬和助听犬等工作犬。</p>
        <p>(十一)外交信袋，机要文件。</p>
        <p>(十二)管制刀具以外的利器、钝器。例如菜刀、水果刀、餐刀、工艺品刀、手术刀、剪刀、镰刀、演出用刀、剑、矛，古董或者作为旅游纪念品的刀、剑以及钢锉、斧子、短棍、锤子等，不能随身携带，应放入托运行李内运输。</p>
        <p> </p>
        <p><strong>第二节 行李包装及体积、重量限制</strong></p>
        <p>第七十二条 托运行李</p>
        <p>(一)托运行李必须包装完善、锁扣完好、捆扎牢固，能承受一定的压力，能够在正常的操作条件下安全装卸和运输，并应符合下列条件：</p>
        <p>1.旅行箱、旅行袋和手提包等必须加锁。</p>
        <p>2.两件以上的包件，不能捆为一件。</p>
        <p>3.行李上不能附插其他物品。</p>
        <p>4.竹篮、网兜、草绳、草袋等不能作为行李的外包装物。</p>
        <p>5.行李包装内不能用锯末、谷壳、草屑等作衬垫物。行李上应写明旅客的姓名、详细地址、电话号码。</p>
        <p>(二)托运行李每件重量不能超过50公斤，体积不能超过40×60×100厘米。超过上述规定的行李，应事先征得西部航空的同意才能托运。</p>
        <p>第七十三条 非托运行李(包括自理行李和随身携带物品)</p>
        <p>西部航空允许每位旅客免费携带一件重量以5公斤为限的非托运行李进入客舱，其体积不得超过20×30×40厘米。否则应作为托运行李运输。</p>
        <p> </p>
        <p><strong>第三节 免费行李额及逾重行李费</strong></p>
        <p>第七十四条 免费行李额</p>
        <p>(一)符合本条件第七十一条规定的非托运行李可免费运输。</p>
        <p>(二)以托运方式运输的行李，每位旅客的免费行李额：持西部航空Y/B/H/K/L/M/R/Q舱票价的旅客，其免费托运行李的重量以10公斤为限。除另有规定外，持上述票价以外的其他特价及产品客票的旅客无免费托运行李额。</p>
        <p>(三)持婴儿票的旅客无免费行李额。</p>
        <p>(四)搭乘同一航班前往同一目的地的两个(含)以上的同行旅客，如在同一时间、同一地点办理行李托运手续，其免费行李额可以按照各自的免费行李额标准合并计算。</p>
        <p>(五)旅客非自愿改变舱位等级，应按原舱位等级享受免费行李额。</p>
        <p>(六)构成国际运输联程客票的国内航段，每位旅客的免费行李额按适用的国际航线免费行李额计算。</p>
        <p>(七)非国际运输联程客票的国内航段：对于国内、国际航班同为西部航空运输，但客票分别填开不属于同一运输合同，且在国内转机点转机时间在24 小时以内的，国内航段按照国际段标准运输规定执行。对于国际航班为非西部航空运输，客票分别填开不属于同一运输合同，则国内航段按照票面行李额度执行。</p>
        <p>(八)残疾人乘坐民航班机，对其必须携带的辅助器具(折叠轮椅、手杖、假肢等)，依照旅客购买座位的数量在规定的限额内给予免费运输。</p>
        <p>第七十五条 逾重行李费</p>
        <p>(一)旅客的托运行李和非托运行李重量，超过该旅客免费行李额的部分，称为逾重行李，应当支付逾重行李费。</p>
        <p>(二)收取逾重行李费，应填开逾重行李票。</p>
        <p>(三)逾重行李费率以每公斤按逾重行李票填开当日所适用的单程直达经济舱正常票价的1.5％计算，以人民币分为单位。收费总金额以元为单位，尾数四舍五入。</p>
        <p> </p>
        <p><strong>第四节 行李声明价值</strong></p>
        <p>第七十六条</p>
        <p>(一)旅客的托运行李，每公斤价值超过人民币100元时，可办理行李的声明价值。</p>
        <p>(二)托运行李的声明价值不能超过行李本身的实际价值。每一旅客的行李声明价值最高限额为人民币8，000元。如西部航空对声明价值有异议而旅客又拒绝接受检查时，西部航空有权拒绝收运。</p>
        <p>(三)西部航空按照旅客声明的价值中超过本条第(一)款规定限额部分的价值的5‰收取声明价值附加费。金额以人民币元为单位，尾数四舍五入。</p>
        <p>(四)办理声明价值的行李不包含在免费行李额内。</p>
        <p>(五)旅客办理声明价值的托运行李仅限于整包行李。行李中的任何单个物品不得办理声明价值。</p>
        <p>(六)旅客非托运行李(自理行李与免费随身携带物品)不办理声明价值。</p>
        <p> </p>
        <p><strong>第五节 行李的收运</strong></p>
        <p>第七十七条 拒绝运输权</p>
        <p>(一)旅客的托运行李、非托运行李(自理行李和免费随身携带物品)，如属于或夹带有不得作为行李运输的物品，西部航空有权拒绝接受该行李的运输。</p>
        <p>(二)旅客的托运行李，如属于或夹带有不得作为托运行李运输的物品，西部航空有权拒绝接受该行李作为托运行李运输。</p>
        <p>(三)旅客携带了属于限制运输的物品，如旅客没有或拒绝遵守西部航空的限制运输条件，西部航空有权拒绝接受该物品的运输。</p>
        <p>(四)旅客的托运行李、非托运行李(自理行李或免费随身携带物品)，如因其形态、包装、体积、重量或特性等原因不符合西部航空运输条件，西部航空应请旅客加以改善，如旅客不能或拒绝改善，西部航空有权拒绝接受该行李的运输。</p>
        <p>第七十八条 检查权</p>
        <p>西部航空为了运输安全，有权要求旅客接受对其行李进行检查。必要时，也可以在旅客没有到场的情况下，会同机场安检进行检查。如果旅客拒绝接受检查，西部航空有权拒绝接受该行李的运输。</p>
        <p>第七十九条 收运要求</p>
        <p>(一)旅客必须凭有效客票托运行李。西部航空应在客票及行李票上填写托运行李的件数和重量，或者在行李识别联上填写托运行李的件数。</p>
        <p>(二)西部航空只在航班离站当日办理乘机手续时收运行李。</p>
        <p>(三)西部航空对旅客托运的每件行李应拴挂行李牌，并将其中的识别联交给旅客。经西部航空同意的非托运行李，计重后交由旅客带入客舱自行照管。</p>
        <p>(四)旅客托运有运输责任争议的行李时，西部航空应向旅客说明情况，应经旅客同意后，拴挂免除责任行李牌，以免除西部航空相应的运输责任。</p>
        <p>第八十条 行李载运</p>
        <p>(一)旅客的托运行李，应与旅客同机运送，特殊情况下不能同机运送时，西部航空应向旅客说明，并优先安排在载量允许的后续航班上运送。</p>
        <p>(二)旅客的逾重行李在飞机载量允许的条件下，应与旅客同机运送。如载量不允许，而旅客又拒绝使用后续可利用航班运送，西部航空可拒绝收运旅客的逾重行李。</p>
        <p>第八十一条 小动物、导盲犬、助听犬运输</p>
        <p>(一)小动物是指家庭驯养的小狗、猫。除小狗、猫以外，其他观赏宠物、野生动物和具有形体怪异或者易于伤人等特性的动物如蛇、狼狗等，不属于小动物范围，不能作为行李运输，只能作为货物运输。</p>
        <p>(二)旅客应在乘机当日(不含)前至少48小时向西部航空或经西部航空特别授权的直属售票处提出小动物运输申请，并提供动物检疫部门出具的《动物检疫合格证明》，经西部航空同意后方可托运。如为联程运输，还应征得西部航空的同意。</p>
        <p>(三)旅客应在乘机当日自行携带小动物及其宠物箱以及《小动物运输申请书》和其他证明文件至少于起飞前2小时到达机场西部航空所属值机柜台办理乘机手续。</p>
        <p>(四)装运小动物的容器及其包装要求应符合西部航空小动物运输相关规定，如旅客不能或不愿意按照西部航空规定完善运输小动物容器及包装，西部航空有权拒绝运输。</p>
        <p>(五)经西部航空判断，因小动物年龄、身体状况、运输文件、机型限制、国家相关政策法规限制等不符合西部航空小动物运输规定的，西部航空有权拒绝运输。</p>
        <p>(六)装运小动物的容器应符合下列要求：</p>
        <p>1.能防止小动物破坏、逃逸和防止小动物将身体某一部位伸出容器以外损伤人员、行李、货物或飞机。</p>
        <p>2.能保证小动物站立和适当活动，保证空气流通，不致使小动物窒息。</p>
        <p>3.能防止粪便渗溢，以免污染飞机、机上设备以及其他物品。</p>
        <p>(七)旅客携带的小动物，除西部航空特许外，必须装在货舱内运输。</p>
        <p>(八)小动物及其容器和携带的食物的重量，不得计算在旅客的免费行李额内，应按逾重行李交付逾重行李费。</p>
        <p>(九)小动物运输不能办理声明价值。</p>
        <p>(十)除西部航空原因外，在运输中出现的小动物患病、受伤和死亡，西部航空不承担责任。</p>
        <p>(十一)导盲犬或者助听犬，是指经过专门训练能够为盲人导盲或者为聋人助听的狗。盲人或者持有医生证明的聋人旅客携带导盲犬或者助听犬乘机，按下列规定办理：</p>
        <p>1.在符合西部航空运输条件的情况下，导盲犬、助听犬可以由盲人或聋人旅客本人带入客舱运输。导盲犬、助听犬连同其容器和食物可以免费运输而不计算在免费行李额内；</p>
        <p>2.带进客舱的导盲犬或者助听犬，必须在上航空器前为其戴上口套和系上牵引绳索，并不得占用座位和让其任意跑动。装在货舱内运输的，其容器必须符合本规则第七十九条(六)的规定；</p>
        <p>3.收运导盲犬或者助听犬的其他运输条件，按照本规则第七十九条第(二)、（三）和（九）的规定办理；</p>
        <p>4.在中途不降停的长距离飞行航班上或者在某种型号的航空器上，不适宜运输导盲犬或者助听犬的，西部航空可以不接受运输。</p>
        <p>第八十二条 外交信袋</p>
        <p>(一)外交信袋应当由外交信使随身携带，自行照管。根据外交信使的要求，西部航空也可以按照托运行李办理，但西部航空只承担一般托运行李的责任。</p>
        <p>(二)外交信使携带的外交信袋和行李，可以合并计重或计件，超过免费行李额部分，按照逾重行李的规定办理。</p>
        <p>(三)外交信袋运输需占用座位时，旅客必须在定座时提出，经西部航空同意，方可予以运输。</p>
        <p>(四)占用每一座位的外交信袋的总重量不得超过75公斤，总体积不得超过40×60×100厘米。占座外交信袋的票价均实行见舱销售，占用座位的外交信袋无免费行李额。</p>
        <p>第八十三条 违章行李</p>
        <p>旅客的托运行李、非托运行李(自理行李和免费随身携带物品)中，凡夹带国家规定的禁运物品、限制携带物品或危险物品等，其整件行李称为违章行李。对违章行李，西部航空按下列规定处理：</p>
        <p>(一)在始发地发现违章行李，西部航空拒绝收运。如已承运，有权取消运输或将违章夹带物品取出后运输，已收逾重行李费不退。</p>
        <p>(二)在经停地发现违章行李，应立即停运，已收逾重行李费不退。</p>
        <p>(三)对违章行李中夹带的国家规定的禁运物品、限制携带物品或危险物品，交有关部门处理。</p>
        <p>第八十四条 行李退运</p>
        <p>(一)旅客在始发地要求退运行李，必须在行李装机前提出。如旅客退票，已收运的行李也必须同时退运。以上退运均退还已收逾重行李费。</p>
        <p>(二)旅客在经停地退运行李，除时间不允许外，可予以办理。但未使用航段的已收逾重行李费不退。</p>
        <p>(三)办理声明价值的行李退运时，在始发地退还已交付的声明价值附加费，在经停地不退已交付的声明价值附加费。</p>
        <p>(四)由于西部航空的原因，需要安排旅客改乘西部航空其他航班，行李运输应随旅客作相应的变更，已收逾重行李费多退少不补。已交付的声明价值附加费不退。如安排旅客签转其他承运人航班，应办理行李退运，退还已收逾重行李费和已交付的声明价值附加费。</p>
        <p> </p>
        <p><strong>第六节 行李交付</strong></p>
        <p>第八十五条 行李交付</p>
        <p>(一)旅客应在航班到达后立即在机场凭行李牌的识别联领取行李。必要时，应交验客票。</p>
        <p>(二)如旅客未立即领取行李，西部航空从行李到达的次日起向旅客收取行李保管费。对于旅客行李中的易腐物品，西部航空有权在行李到达24小时后予以处理。</p>
        <p>(三)西部航空凭行李牌的识别联交付行李，对于领取行李的人是否确是旅客本人，以及由此造成的损失及费用，不承担责任。</p>
        <p>(四)旅客行李延误到达后，西部航空应立即通知旅客领取，也可直接送达旅客。对延误行李不收取保管费。</p>
        <p>(五)旅客在领取行李时，未提出书面异议，应即认为该行李已经按照运输合同完好交付。</p>
        <p>(六)旅客遗失行李牌的识别联，应立即向西部航空挂失。旅客如要求领取行李，应向西部航空提供足够的证明，并在领取行李时出具收据。如在声明挂失前行李已被冒领，西部航空不承担责任。</p>
        <p>第八十六条 无法交付的行李</p>
        <p>行李自到达的次日起，超过90日仍无人认领，表明旅客已遗弃该行李，西部航空可做遗弃物处理。</p>
        <p>第八十七条 行李不正常运输的处理</p>
        <p>(一)行李运输发生延误、遗失或损坏，西部航空或其他地面服务代理人应会同旅客填写《行李运输事故记录》或《破损行李事故记录》，尽快查明情况和原因，并将调查结果答复旅客和有关单位。如发生行李赔偿，可在始发地、经停地或目的地办理。</p>
        <p>(二)因西部航空原因使旅客的托运行李未能与旅客同机到达，造成旅客旅途生活的不便，可根据实际情况，给予旅客临时生活补偿费供旅客在等候行李到达期间临时购买必须的日用品。提供临时生活费用金额：根据到达地生活水平和旅客的身份，临时生活费由到达站行李查询部门(或者行李查询代理方)一次性付给旅客。一般情况下，经济舱旅客为100元。最多不超过两晚。</p>
        <p>第八十八条 行李运输事故索赔</p>
        <p>(一)旅客在领取托运行李时，发现有毁灭、遗失或者损坏的，应当场提出书面异议，取得《行李运输事故记录》，作为提出索赔的原始依据。旅客在领取行李时未提出书面异议，即应认为行李已经按照运输合同完好交付。</p>
        <p>(二)确认托运行李发生毁灭、遗失或者损坏的，旅客最迟应当自取得《行李运输事故记录》之日起七日内提出索赔要求。旅客在领取托运行李时未提出异议，但事后发现托运行李有损失的，应当及时向西部航空提出异议，对于确实有证据证明，是西部航空原因造成的损失，旅客最迟应当在收到托运行李7日内书面向西部航空提出。托运行李发生延误的，最迟应自托运行李到达目的地机场之日起二十一日内提出异议或索赔要求。旅客逾期未提出异议或索赔的，视为放弃延误损失索赔或没有造成损失。</p>
        <p>(三)提出异议或索赔要求时应附客票(或复印件)、行李牌的识别联、《行李运输事故记录》、证明行李内容和价格的凭证以及其他有关的证明。</p>
        <p> </p>
        <p><strong>第十七章 旅客服务</strong></p>
        <p><strong>第一节 一般服务</strong></p>
        <p>第八十九条 西部航空应以保证飞机安全和航班正常，提供良好服务为准则，以文明礼貌、热情周到的服务态度，认真做好空中和地面的旅客运输的各项服务工作。</p>
        <p>第九十条 旅客在联程航班衔接地点的地面膳宿费用，应由旅客自理。</p>
        <p>第九十一条 在航空运输过程中，旅客发生急病、分娩、遇险时，西部航空应积极采取措施，尽力救助。</p>
        <p>第九十二条 根据西部航空自身保障和服务条件，在和旅客达成一致的前提下，西部航空可向旅客提供特殊额外的有偿服务。</p>
        <p> </p>
        <p><strong>第二节 不正常航班服务</strong></p>
        <p>第九十三条 信息告知</p>
        <p>(一)西部航空在掌握航班状态发生变化之后的30分钟内通过公共信息平台、官方网站、呼叫中心、短信、电话、广播等方式，及时、准确地向旅客发布航班出港延误或者取消信息，包括航班出港延误或者取消原因及航班动态。</p>
        <p>(二)西部航空与西部航空销售代理企业加强信息沟通和共享，将西部航空通告的航班出港延误或者取消的信息及时通告旅客。</p>
        <p>第九十四条 不正常航班服务原则</p>
        <p>（一）由于西部航空机务维护、航班调配、机组等航空公司原因，造成航班在始发地出港延误或者取消，西部航空按要求为旅客提供带盥洗设施的标准间住宿或餐食服务。</p>
        <p>（二）由于天气原因、空管原因、军事活动、公共安全、场区次序、机场设施、安全检查、联检、油料保障、离港系统、旅客原因等非西部航空原因，造成航班在始发地出港延误或取消，西部航空应协助旅客安排餐食和住宿，费用应由旅客自理。</p>
        <p>（三）国内航班在经停地延误或取消，无论何种原因，西部航空应按规定负责向经停旅客提供餐食或者住宿服务。国内航班发生备降，无论何种原因，西部航空应按规定向备降旅客提供餐食或者住宿服务。</p>
        <p>（四）发生机上延误时，机组人员每30分钟向旅客通告最新状态。机上延误超过2小时（含），西部航空将为旅客免费提供食品和饮用水。当航班延误超过3小时（含）且无明确起飞时间，在不违反安全、安保规定的情况下，西部航空将安排旅客进行下机等待，并按照西部航空国内不正常航班服务标准，给予旅客进行安排或协助安排。</p>
        <p>（五）航班延误或者取消的票务服务，详见本条件第八章、第九章、第十章和第十一章。</p>
        <p>第九十五条 旅客服务</p>
        <p>（一）在航班出港延误或者取消时，西部航空、西部航空销售代理企业或者地面服务代理企业优先为残疾人、老年人、孕妇、无成人陪伴儿童等需特别照料的旅客提供服务。</p>
        <p>（二）旅客要求出具航班延误或者取消书面证明的，西部航空及时提供。</p>
        <p>（三）航班延误或取消，西部航空及其授权地面服务代理企业应做好解释和服务工作，并迅速将航班延误或取消等信息通知旅客。</p>
        <p>（四）西部航空制定并向社会公布机上延误应急预案，预案内容包括机上延误时的信息通告等服务和下机的条件及限制。</p>
        <p>第九十六条 西部航空应和其他各保障单位相互配合，认真负责，共同保障航班正常，避免不必要的航班延误。无论何种原因航班延误或取消，西部航空不提供经济补偿。</p>
        <p> </p>
        <p><strong>第十八章 飞机上的行为</strong></p>
        <p>第九十七条 如果旅客在飞机上的行为危及到飞机或飞机上任何人或财产的安全，或妨碍机组人员履行职责，或不遵守机组的指示，包括但不限于吸烟、酗酒或吸食毒品，对机组或其他旅客造成或有可能造成不适、不便、损害或者伤害的行为，西部航空可以采取认为合理的措施，包括实施管束，以阻止该行为的继续。旅客有可能在任何地点被要求下机并被拒绝续运，而且旅客有可能因机舱内的不当行为被起诉。</p>
        <p>第九十八条 出于安全的原因，旅客不得在飞机上开启和使用与飞机正常飞行无关的主动发射无线电信号的便携式电子设备，这些设备包括：移动电话、对讲机、遥控玩具和其他带遥控装置的电子设备、发射机(业余台、城市波段、传真机、电话机)、电视机、调幅/调频无线电、双向BP机等其他局方或公司认定干扰飞机安全运行的其他无线电发射装置。允许使用下列设备：便携式录音机、助听器、心脏起博器和其他体内医疗设备、电子表、电动剃须刀、可接受的个人使用的维持生命装置、公司所安装的设备(如：电话/视听设备等)等公司认定不会干扰飞机航行和通讯系统的其他便携式电子设备。</p>
        <p>第九十九条 西部航空所有的航班均已禁烟，机上所有区域均不允许吸烟。</p>
        <p>第一百条 飞机上，除西部航空供应的含酒精饮料外，不得饮用其他含酒精饮料。</p>
        <p>第一百零一条 当旅客在机上就座时，应按要求系好安全带。</p>
        <p> </p>
        <p><strong>第十九章 行政手续</strong></p>
        <p>第一百零二条 旅客必须遵守中华人民共和国的法律、政府规定、命令、要求和旅行条件的各项规定，并应服从政府或机场管理和西部航空的任何安全检查。</p>
        <p>第一百零三条 旅客应出示国家的法律、政府规定、命令、要求或旅行条件所要求的有效证件。西部航空对未遵守国家法律、规定、命令、或旅行条件或其证件不符合要求的旅客，保留拒绝载运的权利。</p>
        <p>第一百零四条 政府有关主管部门检查旅客的托运行李或非托运行李时，旅客应当到场。对旅客未到场接受检查而发生的任何损失，西部航空不承担责任。</p>
        <p> </p>
        <p><strong>第二十章 连续承运人</strong></p>
        <p>第一百零五条 根据一本客票或一本客票和与其有关而填开的连续客票，由几个连续的承运人共同承担的运输，应视为是一个单一运输。</p>
        <p> </p>
        <p><strong>第二十一章 损失责任及赔偿限额</strong></p>
        <p>第一百零六条 损失责任</p>
        <p>旅客因在机场区域内、机场与市区之间或在同一城市的机场与机场之间发生的事件造成人身损害或行李损失，应由实际提供服务的第三人承担责任。</p>
        <p>西部航空因履行航空运输合同所承担的赔偿责任，应不超过航空运输合同订立时西部航空能够预见到的因违反合同可能造成的损失，亦应当不超过经证明旅客直接损失的数额。</p>
        <p>西部航空对间接的或随之引发的财产损失不承担责任。</p>
        <p>第一百零七条 旅客人身伤亡</p>
        <p>(一)除旅客自身健康原因或者旅客故意、重大过失原因外，因发生在西部航空飞机上或者在旅客上、下西部航空飞机过程中的事件，所造成旅客的人身伤亡，西部航空应当承担损害赔偿责任。</p>
        <p>(二)西部航空对每名旅客死亡、受伤的赔偿责任限额为人民币400，000元。</p>
        <p>第一百零八条 行李损失</p>
        <p>(一)因发生在西部航空飞机上或者在旅客上、下西部航空飞机过程中的事件，所造成旅客的随身携带物品毁灭、遗失或者损坏，西部航空有过错的，应当承担损害赔偿责任。</p>
        <p>(二)因发生在航空运输期间的事件，所造成旅客的托运行李毁灭、遗失或者损坏，西部航空应当承担损害赔偿责任。但该托运行李的毁灭、遗失或者损坏完全是由于行李本身的自然属性、质量或者缺陷造成的，西部航空不承担责任。</p>
        <p>(三)旅客的行李毁灭、遗失或者损坏，西部航空按照行李降低的价值赔偿或负担修理费用。</p>
        <p>西部航空对托运行李损失的赔偿金额每公斤不超过人民币100元，如行李的价值每公斤低于100元时，按实际价值赔偿。西部航空对旅客的自理行李和免费随身携带物品损失的赔偿金额为每位旅客不超过人民币3,000元。如行李的价值低于上述限额时，按实际价值赔偿。</p>
        <p>如旅客已办理行李声明价值，西部航空应按声明的价值赔偿。行李的声明价值高于实际价值时，应按实际价值赔偿。</p>
        <p>(四)旅客的行李或行李中任何物件的重量只能以该受损行李或物件的实际重量为限。如果无法确定受损行李或物件重量，每一位旅客的受损行李最多只能按该旅客享受的免费行李额来计算。</p>
        <p>(五)由于旅客行李对他人造成伤害或对他人物品或西部航空财产造成损失，旅客应赔偿西部航空的所有损失和由此支付的一切费用。</p>
        <p>(六)对于旅客在托运行李内夹带的(限制运输的物品)的丢失或损坏，只按一般托运行李承担赔偿责任。</p>
        <p>(七)在联程运输中，西部航空仅对发生在其实际承运的航段上的行李损失承担赔偿责任。</p>
        <p>(八)已赔偿的丢失行李找到后，西部航空应尽快通知旅客。旅客可将自己的行李领回，退还全部赔偿，临时生活用品补偿费不退。</p>
        <p>第一百零九条 航班延误</p>
        <p>(一)因西部航空过错造成旅客行李运输延误的，西部航空应当承担赔偿责任。</p>
        <p>(二)由于天气原因、空管原因、军事活动、公共安全、场区次序、机场设施、安全检查、联检、油料保障、离港系统、旅客原因等非西部航空原因造成旅客行李运输延误的，西部航空不承担赔偿责任，但应尽力为旅客提供必要的帮助。</p>
        <p>(三)西部航空为了避免运输延误损失的发生，已经采取一切必要措施或者不可能采取此种措施的，不承担责任。</p>
        <p>第一百一十条 其他规定</p>
        <p>(一)在旅客、行李运输中，经证明，损失是由索赔人的过错造成或者促成的，应当根据造成或者促成此种损失的过错的程度，相应免除或者减轻西部航空的责任。旅客以外的其他人就旅客死亡或者受伤提出赔偿要求时，经证明死亡或者受伤是旅客本人的过错造成或者促成的，同样应当根据造成或者促成此种损失的过错的程度，相应免除或者减轻西部航空的责任。</p>
        <p>(二)西部航空的责任的任何免除或限制适用于西部航空的代理人、雇员和代表以及将飞机提供给西部航空使用的任何人及其代理人、雇员和代表。承运人和上述代理人、雇员、代表以及任何人可以支付的赔偿总额，不得超过西部航空的责任限额。</p>
        <p>第一百一十一条 索赔和诉讼期限</p>
        <p>（一）确认托运行李发生毁灭、遗失或者损坏的，旅客最迟应当自取得《行李运输事故记录》之日起七日内提出索赔要求。旅客在领取托运行李时未提出异议，但事后发现托运行李有损失的，应当及时向西部航空提出异议，对于确实有证据证明，是西部航空原因造成的损失，旅客最迟应当在收到托运行李7日内书面向西部航空提出。托运行李发生延误的，最迟应自托运行李到达目的地机场之日起二十一日内提出异议或索赔要求。旅客逾期未提出异议或索赔的，视为放弃延误损失索赔或没有造成损失。</p>
        <p>（二）关于航空运输赔偿责任的诉讼时效期间为二年，应从飞机到达目的地点之日起，或从飞机应当到达目的地点之日起，或从运输终止之日起计算，超过此期限未提起诉讼即就丧失对损失赔偿的权利。</p>
        <p> </p>
        <p><strong>第二十二章 生效与修改</strong></p>
        <p>第一百一十二条 本条件自2017年5月15日起生效并施行。在此之前制定实施的《西部航空有限责任公司旅客、行李国内运输总条件》同时废止。</p>
        <p>第一百一十三条 西部航空有权依照中国民用航空总局规定的程序，不经通知修改其运输条件、运输规定、票价和费用。但此类修改不适用于修改前已经开始的运输。西部航空的工作人员、销售代理企业或雇员都无权更改或违反西部航空适用的运输条件、运输规定、票价和费用。</p>
        <p>第一百一十四条 本条件以中文为准，若使用其他语言书写仅作参考之用。</p>
        
      </div>
    </div> -->
    <!-- <div v-if="tipNotes=='AQ'" class="reservation-detail">
        <div>
            <h3 style="font-size: 0.35rem;">九元航空旅客、行李国内运输总条件</h3>
            <div>
                <p class="order_title">第一章 总则</p>
                <p class="order_title">第一条 为建立和维护九元航空有限公司（以下简称“九元航空”）</p>
                <p class="order_pra">国内旅客和行李正常的运输秩序，加强运输管理，保障旅客、九元航空和其他利益相关者的合法权益，根据有关法律法规及规章，制定本国内旅客和行李运输总条件（以下简称“本条件”）。</p>
                <p class="order_title">第二条 本条件适用于九元航空以飞机运送旅客、行李而收取报酬的国内航空运输及经九元航空同意而办理的免费运输。</p>
                <p class="order_title">第三条 本条件使用下列用语。</p>
                <p class="order_pra">（一）国内航空运输：是指根据旅客运输合同，其出发地、约定经停地和目的地均在中华人民共和国境内的航空运输。</p>
                <p class="order_pra">（二）承运人：指使用民用航空器从事旅客、行李或者货物运输的公共航空运输企业，包括国内承运人、港澳台地区承运人和外国承运人。</p>
                <p class="order_pra">（三）九元航空：九元航空是一家航空承运人。其英文名称为9 Air Co.,Ltd.；航空公司二字代码为AQ ；国际民航组织航行三字码为JYH； IATA 结算代码为902 ；网址www.9air.com。</p>
                <p class="order_pra">（四）九元航空运输规定：九元航空根据本条件制定和公布的并于填开客票之日时有效的其他关于旅客及行李运输管理的规定，包括但不限于适用的票价及适用条件。</p>
                <p class="order_pra">（五）销售代理人：指从事民用航空运输销售代理业务的企业。</p>
                <p class="order_pra">（六）九元航空授权销售代理人（以下简称“授权销售代理人”）：</p>
                <p class="order_pra">指根据九元航空的委托，向九元航空收取代理费，并在九元航空的授权的范围内代为办理民用航空运输销售业务的销售代理人。</p>
                <p class="order_pra">（七）地面服务代理人：指从事民用航空运输地面服务代理业务的企业。</p>
                <p class="order_pra">（八）九元航空授权地面服务代理人（以下简称“授权地面服务代理人）：指根据九元航空的委托，向九元航空收取代理费，并在九元航空的授权的范围内代为办理民用航空运输地面服务的地面服务代理人。</p>
                <p class="order_pra">（九）旅客：指经九元航空同意在飞机上载运除机组成员以外的任何人。</p>
                <p class="order_pra">（十）团体旅客：指统一组织的人数在10 人（含）以上，航程、乘机日期、航班和舱位等级相同并支付团体票价的旅客。</p>
                <p class="order_pra">（十一）儿童：指旅行开始之日起年龄满2 周岁（含）但不满12 周岁的人。</p>
                <p class="order_pra">（十二）婴儿：指旅行开始之日起年龄满14 日但不满2 周岁的人。</p>
                <p class="order_pra">（十三）定座：指对旅客预订的座位、舱位等级或对行李的重量、体积的预留。</p>
                <p class="order_pra">（十四）九元航空合同单位（以下简称“合同单位”）：指与九元航空签订定座或购票合同的单位或个人。</p>
                <p class="order_pra">（十五）航班：指承运人按规定的航线、日期、时刻的定期飞行。</p>
                <p class="order_pra">（十六）旅客定座单：指旅客购买客票前必须填写的供承运人或其授权销售代理人据以办理定座和填开客票的业务单据。</p>
                <p class="order_pra">（十七）有效身份证件：指旅客购票和乘机时必须出示的由政府主管部门规定的证明其身份的证件。如：居民身份证、按规定可使用的有效护照、港澳通行证、台湾同胞往来大陆通行证、军官证、警官证、士兵证、文职干部或离退休干部证明，16 周岁以下未成年人的学生证、户口簿、婴儿的出生证，以及公安部门认可的其他证件。</p>
                <p class="order_pra">（十八）客票：是指承运人或其销售代理人所填开的被称为“客票及行李票” 的凭证，包括运输合同条件、声明、通知以及乘机联和旅客联等内容。客票通常表现为纸质客票和电子客票。</p>
                <p class="order_pra">（十九）电子客票：是指由承运人或其销售代理人销售并赋予运输权利的以电子数据形式体现的有效运输凭证，是纸质客票的电子替代产品。</p>
                <p class="order_pra">（二十）航空运输电子客票行程单：是指旅客购买电子客票时承运人或其授权销售代理人出具的付款凭证或报销凭证，同时具备提示旅客行程的作用。</p>
                <p class="order_pra">（二十一）联程客票：指列明有两个（含）以上航班的客票。</p>
                <p class="order_pra">（二十二）来回程客票：指从一地出发至另一地并按原航程返回该地的客票。</p>
                <p class="order_pra">（二十三）连续客票：填开给旅客并与另一本客票连在一起，共同构成一个单一运输合同的客票。</p>
                <p class="order_pra">（二十四）日：是指日历日，按照世界协调时或者当地时间划分的一个时间段，从当日零点到次日零点之间的24 小时。本条件适用北京时间。用于发通知时，通知发出日不计算在内；用于确定客票有效期限时，客票填开日或航班飞行开始日，亦不计算在内。</p>
                <p class="order_pra">（二十五）定期客票：指列明航班、乘机日期和定妥舱位的客票。</p>
                <p class="order_pra">（二十六）不定期客票:指未列明航班、乘机日期和未定妥座位的客票。</p>
                <p class="order_pra">（二十七）乘机联：指纸质客票中标明“运输有效”的部分，表示该乘机联适用于指定的两个地点之间的运输。</p>
                <p class="order_pra">（二十八）旅客联：指纸质客票中标明“旅客联”的部分，始终由旅客持有。</p>
                <p class="order_pra">（二十九）中国民航公布运价：指在票价适用期内价格主管部门和民用航空主管部门公布的经济舱各舱位等级中适用于普通成人旅客的最高票价。</p>
                <p class="order_pra">（三十）特种票价：低于中国民航公布运价，并附有使用限制条件的票价。</p>
                <p class="order_pra">（三十一）超售：是指航班预订的座位数超出航班实际可允许的销售座位数。</p>
                <p class="order_pra">（三十二）误机：指旅客未按规定时间办妥乘机手续或因旅行证件不符合规定而未能乘机。</p>
                <p class="order_pra">（三十三）漏乘：指旅客在航班始发站办理乘机手续后或经停站过站时未搭乘上指定的航班。</p>
                <p class="order_pra">（三十四）错乘：指旅客实际乘坐的航班并非客票上列明的航班。</p>
                <p class="order_pra">（三十五）行李：指旅客在旅行中为了穿着、使用、舒适或便利而携带的必要或者适量的物品和其他个人财物。除另有规定者外，包括旅客的托运行李和自理行李。</p>
                <p class="order_pra">（三十六）托运行李：指旅客交由九元航空负责照管和运输并填开行李票的行李。</p>
                <p class="order_pra">（三十七）自理行李：指经九元航空同意在规定的行李品种、数量、重量和体积范围内由旅客自行携带进入客舱并负责照管的行李。</p>
                <p class="order_pra">（三十八）随身携带物品：指经九元航空同意由旅客自行携带乘机的零星小件物品。</p>
                <p class="order_pra">（三十九）行李票：指客票中与运输旅客托运行李有关的部分。</p>
                <p class="order_pra">（四十）行李识别牌：栓挂或粘贴在托运行李上的带有编号及始发站、终点站内容的识别标识牌。</p>
                <p class="order_pra">（四十一）离站时间：指航班旅客登机后关机门的时间。</p>
                <p class="order_pra">（四十二）办理乘机手续截止时间：指由航空公司规定的旅客应该办理完毕乘机登记手续和领取登机牌的时间。</p>
                <p class="order_pra">（四十三）约定经停地点：指除出发地点和目的地点以外，在客票中列明作为地面停留的中途机场。</p>
                <p class="order_pra">（四十四）中途分程：指经九元航空事先同意，旅客在出发地点和目的地点间旅行时由旅客有意安排在某个地点的旅程间断。</p>
                <p class="order_pra">（四十五）转机：指旅客在出发地点和目的地点间旅行时，在中间地点转乘同一承运人的其他航班或其他承运人的航班到达目的地。</p>
                <p class="order_pra">（四十六）损失：指在九元航空提供的航空运输中或与航空运输有关的其它服务时发生的直接的实际损失，包括因死亡、受伤、延误、丢失、损坏或其他原因造成的损失。</p>
                <p class="order_pra">（四十七）不可抗力：指无法预见的、无法避免并且无法控制的情况。</p>
                <p class="order_pra">（四十八）“航班延误”是指航班实际到港挡轮挡时间晚于计划到港时间超过15分钟的情况。</p>
                <p class="order_pra">（四十九） “航班取消”是指因预计航班延误而停止飞行计划或者因延误而导致停止飞行计划的情况。</p>
                <p class="order_pra">第二章 限制运输和拒绝运输</p>
                <p class="order_pra">第四条 限制运输</p>
                <p class="order_pra">（一） 无成人陪伴儿童、婴儿、病患旅客、孕妇、盲人、聋哑人、犯人或犯罪嫌疑人等由于身体或精神状况在旅途中需要特殊照顾或在一定条件下才能运输的旅客，只有在符合九元航空运输规定的条件下，经九元航空预先同意并在必要时做出安排后方予载运。上述有关运输规定和条件，可向九元航空查询。</p>
                <p class="order_pra">（二）除安全或法律另有规定外，九元航空向具有乘机条件的残疾人提供航空运输服务；具备乘机条件的残疾人需要承运人提供下列设备设施或服务时，应在定座时提出，最迟不能晚于航班离站时间前72小时：</p>
                <p class="order_pra">1、供航空器上使用的医用氧气；</p>
                <p class="order_pra">2、托运电动轮椅；</p>
                <p class="order_pra">3、提供机上专用窄型轮椅；</p>
                <p class="order_pra">4、为具备乘机条件的残疾人团体提供服务；</p>
                <p class="order_pra">5、携带服务犬进入客舱。</p>
                <p class="order_pra">（三） 限制运输旅客的数量：出于安全的考虑，九元航空根据机型对每一航班限制运输旅客数量进行相应的控制，航班座位数为101-200 个时， 限制运输旅客人数总和不得超过5 人，其中没有陪伴人员，但需要他人协助的残疾旅客人数不得超过4 名（含4 名）。</p>
                <p class="order_pra">第五条 拒绝运输</p>
                <p class="order_pra">九元航空出于安全原因或根据合理的判断，可以拒绝承运旅客和其行李。由于下列一种或多种原因，九元航空有权拒绝承运旅客和其行李：</p>
                <p class="order_pra">（一）九元航空为遵守国家的有关法律、法规和政府规章及其它规范性文件的规定；</p>
                <p class="order_pra">（二）旅客的行为、年龄、精神或身体状况不适合航空旅行，或使其他旅客不舒适或反感，或对其自身或其他人员或财产可能造成任何危险或危害；</p>
                <p class="order_pra">（三）旅客不遵守国家的有关法律、法规和政府规章及其它规范性文件的规定，或不遵守九元航空相关规定；</p>
                <p class="order_pra">（四）旅客拒绝接受安全检查；</p>
                <p class="order_pra">（五）旅客未支付适用的票价、费用以及未承兑其与九元航空之间的信用付款；</p>
                <p class="order_pra">（六）旅客未能出示本人的有效的旅行证件；</p>
                <p class="order_pra">（七）旅客出示的客票经证明是非法获得或不是在九元航空或其授权销售代理人处购买的，或属已挂失或被盗的、或是伪造的、或不是由九元航空或其授权销售代理人更改的乘机联或乘机联被涂改的；</p>
                <p class="order_pra">（八）出示客票的人不能证明本人即是客票上“旅客姓名”栏内列明的人;</p>
                <p class="order_pra">（九）旅客出示的客票经证实其定座记录是无效的；</p>
                <p class="order_pra">（十）旅客没有遵守九元航空有关安全或安保方面的指令；</p>
                <p class="order_pra">（十一）旅客未能遵守机上禁烟或使用电子设备的规定；</p>
                <p class="order_pra">（十二）旅客曾有搭乘航班过程中的不良行为纪录，并且九元航空有理由相信此种不良行为仍有可能再次发生。</p>
                <p class="order_pra">第六条 对被拒绝运输旅客的安排</p>
                <p class="order_pra">对被拒绝运输的旅客，九元航空按下列规定办理：</p>
                <p class="order_pra">（一）属本条件第五条第（一）款情形的旅客，已购客票按本条件第三十六条非自愿退票的规定办理。</p>
                <p class="order_pra">（二）属本条件第五条第（二）、（三）、（四）、（十）、（十一）、（十二）款情形的旅客，已购客票按本条件第三十七条自愿退票的规定办理。</p>
                <p class="order_pra">（三）属本条件第五条第（五）款情形的旅客，按本条件第十一条第（二）款的规定，由旅客补付不足的票款或税费，或按本条件第三十六条非自愿退票的规定办理，退还旅客已支付的票款。</p>
                <p class="order_pra">（四）属本条件第五条第（六）款情形的旅客，按本条件第三十七条自愿改变航班、日期或第五十五条旅客误机的规定办理。</p>
                <p class="order_pra">（五）属本条件第五条第（七）、（八）、（九）款情形的旅客，九元航空保留扣留其客票的权利，必要时呈报有关主管部门处理。</p>
                <p class="order_pra">第三章 客票</p>
                <p class="order_pra">第七条 一般规定</p>
                <p class="order_pra">（一） 客票是九元航空和客票上所列姓名的旅客之间运输合同的初步证据。九元航空只向持有由九元航空或其授权销售代理人填开的客票的旅客、或只向持有由九元航空或其授权销售代理人填开的作为付款或部分付款证明的其他运输凭证的旅客提供运输。客票始终是九元航空的财产。客票中的运输合同条件或旅客须知是本条件部分条款的概述。</p>
                <p class="order_pra">（二） 客票为记名式，只限客票上所列旅客姓名与有效身份证件信息一致的旅客本人使用。</p>
                <p class="order_pra">（三） 客票不得转让。转让的客票无效，票款不退。除非九元航空明知而故意，如客票不是由有权乘机或退票的人出示，而九元航空依照九元航空运输规定及相关作业流程向出示该客票的人提供了运输或退款，九元航空对原客票有权乘机或退票的人，不承担责任。</p>
                <p class="order_pra">（四） 客票不得涂改。涂改的客票无效，票款不退。</p>
                <p class="order_pra">（五） 本条件使用“客票”一词的，除特别说明予以排除或上下文可以另行推断，其含义均包括纸质客票和电子客票。</p>
                <p class="order_pra">（六） 客票使用要求</p>
                <p class="order_pra">1. 使用电子客票的旅客，应出示有效身份证件，否则无权乘机。</p>
                <p class="order_pra">2. 旅客使用纸质客票要求乘机时，应出示有效身份证件及有效纸质客票。旅客出示残缺纸质客票或非九元航空或其授权销售代理人更改的客票，无权要求乘机。</p>
                <p class="order_pra">3. 联程客票必须按照客票所列明的航程，从始发地点开始顺序使用。未经九元航空同意，旅客不得在经停地点提前终止旅行。否则，客票运输无效，九元航空不予接受。</p>
                <p class="order_pra">4. 每一乘机联上必须列明舱位等级，并在航班上定妥座位和日期后方可由九元航空接受运输。对未定妥座位的乘机联，九元航空应按旅客的申请，根据适用的票价和所申请航班的座位可利用情况为旅客预订座位。</p>
                <p class="order_pra">5. 旅客应在客票有效期内，完成客票上列明的全部航程。</p>
                <p class="order_pra">6. 定期客票只适用于客票上列明的承运人、乘机日期、航班和舱位等级；不定期客票应在定妥座位后方能使用。</p>
                <p class="order_pra">第八条 客票有效期</p>
                <p class="order_pra">中国民航公布运价的客票有效期自旅行开始之日起，一年内运输有效；如果客票全部未使用，则从填开客票之日起，一年内运输有效。</p>
                <p class="order_pra">特种票价的客票有效期，按九元航空运输规定执行。</p>
                <p class="order_pra">客票有效期的计算，从旅行开始或填开客票之日的次日零时起至有效期满之日的次日零时为止。</p>
                <p class="order_pra">第九条 客票有效期的延长</p>
                <p class="order_pra">（一）由于九元航空的下列原因之一，造成旅客未能在客票有效期内旅行，其客票有效期将延长到九元航空能够按照该客票已付票价的舱位等级提供座位的第一航班为止：</p>
                <p class="order_pra">1. 取消旅客已经定妥座位的航班；</p>
                <p class="order_pra">2. 取消的航班约定经停地点中含有旅客的出发地点、目的地点或者中途分程地点；</p>
                <p class="order_pra">3. 未能在合理的时间内按照班期时刻进行飞行；</p>
                <p class="order_pra">4. 造成旅客已定妥座位的航班衔接错失；</p>
                <p class="order_pra">5. 更换了旅客的座位等级；</p>
                <p class="order_pra">6. 未能提供已定妥的座位。</p>
                <p class="order_pra">（二）持中国民航公布运价客票或与中国民航公布运价客票有效期相同的特种票价客票的旅客未能在客票有效期内旅行，是由于九元航空在旅客定座时未能按其客票的舱位等级提供航班座位，其客票有效期可以延长至九元航空能够按照该客票已付票价的座位等级提供座位的第一个航班为止，但延长期不得超过七天。</p>
                <p class="order_pra">（三）已开始旅行的旅客在其持有的客票有效期内因病使旅行受阻时，除九元航空对所付票价另有规定外，九元航空可将该旅客的客票有效期延长至根据医生诊断证明确定该旅客适宜旅行之日为止；或延长至适宜旅行之日以后九元航空能够按照该旅客已付票价的舱位等级提供座位的自恢复旅行地点起的第一个航班为止。如客票中未使用的乘机联包含一个或一个以上中途分程地点，该客票有效期的延长不能超过自该医生诊断证明列明之日起三个月。九元航空也可同等延长无自理能力旅客的陪伴直系亲属的客票有效期。如旅客在旅途中死亡，该旅客陪同人员的客票可用取消最短停留期限或延长客票有效期的方法予更改。如已开始旅行旅客的直系亲属死亡，该旅客及其陪同的直系亲属的客票也可予以更改。此种更改应在收到死亡证明后办理，此种客票有效期的延长不得超过死亡之日起45 日。</p>
                <p class="order_pra">第四章 票价和税费</p>
                <p class="order_pra">第十条 票价的适用</p>
                <p class="order_pra">（一） 票价指旅客由出发地机场至目的地机场的航空运输价格，不包括机场与市区之间或同一城市机场与机场之间的地面运输费用。政府或有关当局规定对旅客征收的税款和费用以及政府或有关当局批准的由机场经营人或承运人对旅客征收的费用不包括在客票价之内。该项税款或费用应由旅客支付。</p>
                <p class="order_pra">（二） 客票价为旅客购票之日适用的票价。客票出售后，如票价调整，票款不作变动。</p>
                <p class="order_pra">（三） 九元航空公布的票价，适用于直达航班运输。如旅客要求经停或转乘其他航班时，应按实际航段分段相加计算票价。</p>
                <p class="order_pra">（四） 使用特种票价的旅客，应遵守该特种票价规定的条件。</p>
                <p class="order_pra">第十一条票款的交付</p>
                <p class="order_pra">（一）旅客应按国家规定的货币和付款方式交付票款，除九元航空与旅客另有协议外，票款一律现付。</p>
                <p class="order_pra">（二）当收取的票款与适用的票价不符或计算有错误时，应按照九元航空运输规定，由旅客补付不足的票款或由九元航空退还多收的票款。</p>
                <p class="order_pra">（三）除特殊促销票价外，客票价以人民币10 元为计算单位；九元航空收取或支付的任何其他费用均以人民币为计算单位，尾数一律四舍五入。</p>
                <p class="order_pra">第十二条 特种票价</p>
                <p class="order_pra">（一）革命伤残军人和因公致残的人民警察凭《中华人民共和国革命伤残军人证》和《中华人民共和国人民警察伤残抚恤证》，按照同一航班成人普通票价的50%购票。</p>
                <p class="order_pra">（二）儿童按照同一航班成人普通票价的50%购买儿童票，提供座位。</p>
                <p class="order_pra">（三）婴儿按同一航班成人普通票价的10%购买婴儿票，不提供座位；如需要单独占用座位时，应购买儿童票。每一成人旅客携带婴儿超过一名时，超过人数的婴儿应支付儿童票价。以上三类优惠客票，无附加购票时限等限制性条件。</p>
                <p class="order_pra">（四）特殊促销票价，旅客购买九元航空网站www.9air.com 所提供的特殊促销票价的客票，其适用条件以网站公布的规定为准。</p>
                <p class="order_pra">（五）团体旅客票价，适用于符合本条件第三条第（十）款定义的旅客。凡购买婴儿、儿童客票的旅客不得计算在团体人数内。使用团体旅客票价的客票，应遵守九元航空的特别规定。</p>
                <p class="order_pra">第十三条 特种票价的客票可以附有限制或排除旅客签转、变更、退票权利的条件。旅客应选择适合需求的客票票价。</p>
                <p class="order_pra">第五章 购票</p>
                <p class="order_pra">第十四条 购票方式</p>
                <p class="order_pra">旅客可在九元航空公布的网站，九元航空直属购票处或其授权销售代理人的售票处办理购票。</p>
                <p class="order_pra">第十五条 购票规定</p>
                <p class="order_pra">（一）旅客购买客票应按九元航空的规定如实申报个人有效身份证件、联系电话等重要信息。旅客在九元航空直属购票处或其授权销售代理人的售票处购票须填写《旅客定座单》。</p>
                <p class="order_pra">（二）购买儿童票或婴儿票，应提供儿童或婴儿出生年月日的有效证明。</p>
                <p class="order_pra">（三）限制运输旅客购票，应按九元航空要求提供相关证明，经九元航空同意后，方可购票。</p>
                <p class="order_pra">第十六条 每一位旅客应单独持有客票。</p>
                <p class="order_pra">第十七条 九元航空或其授权销售代理人应根据旅客的要求，出售单程、联程或来回程客票。</p>
                <p class="order_pra">第十八条 九元航空售票场所及售票网站应设置旅客须知和本条件或提供相关查阅途径。</p>
                <p class="order_pra">第六章 定座</p>
                <p class="order_pra">第十九条 九元航空应按旅客已经定妥的航班等级提供座位。</p>
                <p class="order_pra">第二十条 旅客在定妥座位后，凭该定妥座位的客票乘机。</p>
                <p class="order_pra">不定期客票应在向九元航空定妥座位后才能使用。定期客票在向九元航空购票同时已定妥座位。</p>
                <p class="order_pra">第二十一条 已经定妥的座位，旅客应在承运人规定或预先约定的时限内购买客票，承运人对所定座位在规定或预先约定的时限内予以保留。</p>
                <p class="order_pra">第二十二条 持有联程或来回程客票的旅客未能搭乘已定妥座位的航班，且未预先通知九元航空对其客票上列明的续程或回程航班予以保留，九元航空有权取消旅客相应后续航班的定座。但是，如果旅客预先通知九元航空，旅客相应后续航班的定座仍然有效。</p>
                <p class="order_pra">第二十三条 为了定座和安排相关服务的需要，旅客必须向九元航空提供准确完整的个人资料（如有效身份信息、地址、电话等）。同时，旅客授权九元航空保留其个人资料且可将资料传送给九元航空的有关部门、其他相关承运人或相关服务的提供者。</p>
                <p class="order_pra">第二十四条九元航空可按照运行实际情况规定航班开始和截止接受定座的时限，必要时可暂停接受某一航班的定座。</p>
                <p class="order_pra">第二十五条 团体旅客定妥座位后，应在规定或预先约定的时限内购票，否则，所定座位不予保留。</p>
                <p class="order_pra">第七章 班期时刻、航班取消与变更</p>
                <p class="order_pra">第二十六条 班期时刻</p>
                <p class="order_pra">九元航空将尽力按照旅行之日起生效的航班时刻表运输旅客与行李。但是，航班时刻表或其他场所所列的时刻，仅供参考，并非航空运输合同的组成部分。</p>
                <p class="order_pra">九元航空对《班期时刻表》或其它公布的班期时刻中的差错或遗漏不承担责任，除非损失是由于九元航空的故意或明知可能造成损失而轻率地作为或不作为所造成的。九元航空对其代表、雇员或代理人就始发或到达时间、日期或航班飞行所作的解释也不承担责任。</p>
                <p class="order_pra">第二十七条 航班取消与变更</p>
                <p class="order_pra">有下列情形之一的，九元航空可按规定不经事先通知，改变机型或航线、取消、中断、推迟或延期航班飞行：</p>
                <p class="order_pra">（一）为遵守国家的法律、政府规定和命令；</p>
                <p class="order_pra">（二）为保证飞行安全；</p>
                <p class="order_pra">（三）其他无法控制的原因。</p>
                <p class="order_pra">第二十八条 由于本条件第二十七条原因之一，九元航空取消或延误航班，因而未能向旅客提供已定妥的座位（包括舱位等级），或未能在旅客的中途分程地点或目的地点停留，或造成旅客已妥座位的航班衔接错失，九元航空将考虑旅客的合理需要并采取以下措施之一：</p>
                <p class="order_pra">（一） 为旅客安排有可利用座位的九元航空后续航班；</p>
                <p class="order_pra">（二） 变更原客票列明的航程，安排九元航空的航班将旅客运达目的地或中途分程地点，票款、逾重行李费和其他服务费用的差额多退少不补；</p>
                <p class="order_pra">（三） 按本条件第三十六条非自愿退票的规定办理。</p>
                <p class="order_pra">第二十九条 延误、取消航班的旅客服务</p>
                <p class="order_pra">对延误、取消航班的旅客，九元航空应分别按本条件第八十五条、第八十六条、第八十七条、第八十八条和第八十九条的规定办理。</p>
                <p class="order_pra">第八章 客票变更</p>
                <p class="order_pra">第三十条 旅客购票后，如要求改变航班、日期、舱位等级，九元航空及其授权销售代理人应根据实际可能积极办理。</p>
                <p class="order_pra">第三十一条 非自愿变更</p>
                <p class="order_pra">（一） 航班取消、提前、延误、航程改变或不能提供原定座位时，九元航空应优先安排旅客乘坐本公司后续航班或按本条件第三十六条非自愿退票的规定办理。因九元航空的原因，旅客的舱位等级变更时，由九元航空承担票款的差额。</p>
                <p class="order_pra">（二） 除另有协议外，非自愿变更的要求应在九元航空能够提供座位的第一个后续航班所规定的离站时间之前提出。旅客在上述规定时间以外提出非自愿变更申请，按照本条件第三十六条非自愿退票办理。</p>
                <p class="order_pra">第三十二条 变更承运人</p>
                <p class="order_pra">旅客购票后，自愿要求改变承运人的，按照本条件第三十七条自愿退票规定办理。由于本条件第三十一条第（一）款所列原因，旅客提出变更承运人的，按照本条件第三十六条非自愿退票的规定办理。</p>
                <p class="order_pra">第三十三条 自愿变更</p>
                <p class="order_pra">（一） 旅客购票后，如要求改变航班、日期，九元航空及其授权销售代理人应根据九元航空运输规定，在航班有可利用座位和时间允许的条件下，除本条第（二）、（三）、（四）、（五）款另有规定外，按照下表予以办理：</p>
                <p class="order_pra images1"></p>
                <p class="order_pra">（二） 革命伤残军人和因公致残的人民警察凭《中华人民共和国革命伤残军人证》和《中华人民共和国人民警察伤残抚恤证》要求客票变更，免收变更费。</p>
                <p class="order_pra">（三） 持婴儿客票的旅客要求变更，免收变更费。</p>
                <p class="order_pra">（四） 持儿童客票的旅客要求变更，按中国民航公布运价68％以上计费的客票办理。</p>
                <p class="order_pra">（五） 持团体客票的旅客要求变更，按照本条件第三十八条团体旅客自愿退票办理。</p>
                <p class="order_pra">第九章 退票</p>
                <p class="order_pra">第三十四条 由于九元航空未能按照运输合同提供运输或旅客要求自愿改变其旅行安排，对旅客未能使用的全部或部分客票，九元航空应按本章相关规定办理退票。</p>
                <p class="order_pra">（一） 退票分为自愿退票和非自愿退票两种。自愿退票是指由于旅客原因造成购票后提出退票要求。非自愿退票是指由于承运人原因、天气原因、政府原因以及其他不可抗力原因造成旅客购票后提出退票要求。其中，承运人原因包括：因机务维护不善、航班调配不当、商务或机组失职等九元航空可预见可克服且可避免的原因。</p>
                <p class="order_pra">（二） 旅客要求退票，应填妥九元航空规定的退款单。旅客必须凭客票未使用的全部乘机联和旅客联或航空运输电子客票行程单原件，方可办理退票。</p>
                <p class="order_pra">第三十五条 退票的一般规定</p>
                <p class="order_pra">（一） 由于本条件第九条第（一）款所列原因之一，九元航空未能按照运输合同提供运输，旅客提出退票按照本条件第三十六条非自愿退票办理。</p>
                <p class="order_pra">（二） 旅客因自愿改变其旅行安排而要求退票，按照本章第三十七条办理。</p>
                <p class="order_pra">第三十六条 非自愿退票</p>
                <p class="order_pra">（一） 航班取消、延误三小时以上（包括已知航班计划延误三小时以上的）旅客提出退票，按非自愿退票办理：始发地应退还全部票款；经停地应按旅客订座舱位对应的票价退还未使用航段的全部票款，但不得超过原付票款金额。均不收取退票费。</p>
                <p class="order_pra">（二） 由于本条件第三十四条第（一）款所列的承运人原因，航班在非规定的航站降落，取消当日飞行或航班延误三小时（包括已知航班计划延误三小时以上的），旅客要求退票，应按旅客所持客票的舱位等级，退还由降落站至到达站的票款，但退款金额以不超过原付票款为限。</p>
                <p class="order_pra">（三） 由于天气原因、政府原因以及其他不可抗力等非承运人原因，航班在非规定的航站降落，若取消当日飞行，旅客提出退票按本条件第三十六条非自愿退票第（二）款规定办理；若当日飞行未被取消，旅客提出终断旅行的，未使用航段的票款不予退还。</p>
                <p class="order_pra">第三十七条 自愿退票</p>
                <p class="order_pra">（一） 旅客自愿要求退票，除本条第（二）、（三）、（四）、（五）、（六）、（七）款另有规定外，按下表规定办理：</p>
                <p class="order_pra images2"></p>
                <p class="order_pra">注：退票时，同时退还已经代为实际征收的机场建设费和燃油附加费。</p>
                <p class="order_pra">（二） 革命伤残军人和因公致残的人民警察凭《中华人民共和国革命伤残军人证》和《中华人民共和国人民警察伤残抚恤证》要求退票，免收退票费。</p>
                <p class="order_pra">（三） 持婴儿客票的旅客要求退票，免收退票费。</p>
                <p class="order_pra">（四） 持儿童客票的旅客要求退票，按照按中国民航公布运价68％（含）以上计费的客票办理。</p>
                <p class="order_pra">（五） 旅客因病要求退票，需在航班规定的离站时间之前，向九元航空提供县级（含）以上医疗单位出具的医生诊断证明（盖章有效）、收费证明，免收退票费。患病旅客的陪伴人员要求退票，应与患病旅客同时办理退票手续。若出现多位陪同人员，其中一位陪同人员免收退票费，其他陪伴人员按自愿退票规定办理。</p>
                <p class="order_pra">（六） 持联程、来回程客票的旅客自愿要求退票，根据九元航空有关业务规定按本条件第三十七条自愿退票第（一）款的规定收取各航段的退票费。</p>
                <p class="order_pra">（七） 旅客在航班的经停地自动终止旅行，该航班未使用航段的票款不退。</p>
                <p class="order_pra">第三十八条 团体旅客</p>
                <p class="order_pra">团体旅客自愿退票，按以下规定办理：</p>
                <p class="order_pra">（一） 本规定适用于按正常票价36％（含）以上计费的团体客票，且团体旅客退票人数不得超过总人数的10%。按正常票价36％以下计费的团体客票，按照本条件第三十七条办理。</p>
                <p class="order_pra">（二） 在航班规定离站时间72 小时（含）以前，持团体客票的旅客提出自愿退票，收取客票价20%的退票费，同时退还已经代为实际征收的机场建设费和燃油附加费。</p>
                <p class="order_pra">（三）在航班起飞48 小时前，72 小时以内，持团体客票的旅客提出自愿退票，收取客票价30%的退票费，同时退还已经代为实际征收的机场建设费和燃油附加费。</p>
                <p class="order_pra">（四） 在航班起飞24 小时前，48 小时以内，持团体客票的旅客提出自愿退票，收取客票价50%的退票费，同时退还已经代为实际征收的机场建设费和燃油附加费。</p>
                <p class="order_pra">（五） 在航班起飞24 小时以内或在航班规定离站时间以后，持团体客票的旅客提出自愿退票，客票作废，票款不退，同时退还已经代为实际征收的机场建设费和燃油附加费。</p>
                <p class="order_pra">（六） 持联程、来回程客票的团体旅客要求退票，分别按本条件第三十八条第（二）、（三）、（四）款的规定收取各航段的退票费。</p>
                <p class="order_pra">第三十九条 退票时限旅客要求退票，应在其客票有效期内向九元航空提出。否则九元航空有权拒绝办理。</p>
                <p class="order_pra">第四十条 退票地点</p>
                <p class="order_pra">旅客申请退票，应在九元航空售票处办理。具体可咨询九元航空。团体旅客自愿退票只限在原购票的售票处办理。</p>
                <p class="order_pra">第四十一条 退款方式</p>
                <p class="order_pra">九元航空将根据旅客购票的付款方式，以同样的方式将票款退还旅客。旅客使用信用卡或借记卡支付票款的，九元航空有权将票款在三十个工作日退还到原卡账户上。</p>
                <p class="order_pra">第四十二条 退票受款人</p>
                <p class="order_pra">（一）九元航空有权只向客票上列明姓名的旅客本人办理退票。</p>
                <p class="order_pra">（二）当客票上列明的旅客不是该客票的付款人，并且客票上已列明了退票限制条件，九元航空应按列明的退票限制条件将票款退给付款人或其指定人。</p>
                <p class="order_pra">（三）旅客退票应出示本人有效身份证件；如退票受款人不是客票上列明的旅客本人，应出示旅客和退票受款人的有效身份证件。</p>
                <p class="order_pra">（四）九元航空将票款退给持有未使用的全部乘机联和旅客联或航空运输电子客票行程单原件，并符合第四十二条第（一）、第（二）、第（三）款规定的人，应被视为正当退票。九元航空也随即解除责任。</p>
                <p class="order_pra">第十章 客票遗失</p>
                <p class="order_pra">第四十三条 遗失客票的挂失</p>
                <p class="order_pra">（一）旅客的客票全部或部分遗失或残损，或旅客出示的纸质客票未能包括旅客联和所有未使用的乘机联，旅客应以书面形式向九元航空申请挂失。</p>
                <p class="order_pra">（二）旅客申请挂失须出示其有效身份证件；如申请挂失者不是旅客本人，需出示旅客本人和挂失人的有效身份证件；并提供书面申请。</p>
                <p class="order_pra">（三）在旅客申请挂失前，客票如全部或部分已被冒用或冒退，九元航空不承担责任。</p>
                <p class="order_pra">第四十四条 重新购票</p>
                <p class="order_pra">定期客票遗失后，如旅客要求继续乘坐遗失纸质客票上列明的航班或后续航班，需重新购买客票；旅客遗失航空运输电子客票行程单，若无报销需求，旅客不必重新购票，凭本人有效证件可完成旅行。</p>
                <p class="order_pra">第四十五条 遗失客票的退款</p>
                <p class="order_pra">（一）纸质客票遗失应在遗失客票有效期满后30 天内，经九元航空查证后，凭符合本条件第四十三条第</p>
                <p class="order_pra">（二）款规定的资料与证明以及重新购票的旅客联，予以办理遗失客票的退款手续。</p>
                <p class="order_pra">第四十六条 客票遗失终止</p>
                <p class="order_pra">（一）旅客办理了客票遗失申请,但在客票有效期内又找到机票原件,可到九元航空售票处办理客票遗失终止业务。</p>
                <p class="order_pra">（二）旅客办理客票遗失终止业务，应向九元航空工作人员提供：乘机人有效身份证件复印件、客票遗失申请书原件、重新寻获的已挂失机票。</p>
                <p class="order_pra">第十一章 客票超售</p>
                <p class="order_pra">第四十七条 超售补偿</p>
                <p class="order_pra">（一）为满足更多旅客的出行需求，九元航空可能在部分容易出现座位虚耗的航班上采取适当超售的方法，以保证更多的旅客搭乘理想的航班。</p>
                <p class="order_pra">（二）一旦发生超售，导致航班不能满足所有持有定妥座位客票的旅客相应座位时，九元航空将在机场首先征询自愿搭乘后续航班或者自愿取消行程的旅客。在没有足够的自愿者情况下，九元航空将拒绝部分旅客登机。</p>
                <p class="order_pra">（三）因超售额未能乘坐原定航班的旅客，九元航空将采取如下补偿方式：</p>
                <p class="order_pra">1．向每位旅客提供200 元人民币的现金补偿。</p>
                <p class="order_pra">2．旅客如选择退票的，按非自愿退票办理，免收退票费；旅客如选择改乘九元航空后续航班的，按非自愿变更办理，免收变更费。</p>
                <p class="order_pra">3．若九元航空无法向旅客提供当日可成行的航班时，征得旅客同意后，可将旅客改签至其他承运人的当日航班，改签费用由九元航空承担。</p>
                <p class="order_pra">（四）联程旅客超售，按上述规定对超售航段进行现金补偿，后续联程航段可根据旅客行程安排为旅客办理免费变更、退票、食宿等服务。</p>
                <p class="order_pra">（五）当后续的航班时刻和原定航班时刻相差4 小时（含）以上时，为旅客免费安排带盥洗设施的标准间。免费提供机场至酒店的地面往返交通，并协助旅客重新办理乘机手续。</p>
                <p class="order_pra">第四十八条 航班超售时，以下旅客的座位应按顺序优先保证：</p>
                <p class="order_pra">（一）重要旅客及其随行人员；</p>
                <p class="order_pra">（二）公司同意并事先做出安排的特殊旅客；</p>
                <p class="order_pra">（三）衔接国际航班的旅客</p>
                <p class="order_pra">（四）团体旅客；</p>
                <p class="order_pra">（五）到达站转机衔接时间短的联程旅客；</p>
                <p class="order_pra">（六）有特别困难急于成行的旅客；</p>
                <p class="order_pra">（七）本公司常旅客；</p>
                <p class="order_pra">（八）其他普通旅客。</p>
                <p class="order_pra">第四十九条 九元航空售票场所及售票网站应设置超售公示或提供相关查阅途径。</p>
                <p class="order_pra">第十二章 乘机</p>
                <p class="order_pra">第五十条 一般规定</p>
                <p class="order_pra">（一）旅客应当在九元航空规定的时限内到达机场，凭客票及本人有效身份证件按时办理客票查验、托运行李、领取登机牌等乘机手续。</p>
                <p class="order_pra">（二）如旅客未能按时到达九元航空的乘机登记处或登机门，或未能做好旅行准备，九元航空为不延误航班可取消旅客已定妥的座位。对旅客由此所产生的损失和费用，九元航空不承担责任。</p>
                <p class="order_pra">（三）九元航空开始办理航班乘机手续的时间一般不迟于客票上列明的航班离站时间前90 分钟，截止办理乘机手续时间为航班离站时间前45 分钟，但各机场规定的截止办理乘机手续时间可能有差异并会变动，旅客应以机场规定为准。</p>
                <p class="order_pra">（四）九元航空及其地面服务代理人应按时开放乘机登记处，按规定接受旅客出具的客票，及时、准确地为旅客办理乘机手续。</p>
                <p class="order_pra">第五十一条 乘机前，旅客及其行李和随身携带物品必须经过安全检查。</p>
                <p class="order_pra">第五十二条 根据国家有关规定不能乘机的旅客，九元航空有权拒绝其乘机，已购客票按第三十七条自愿退票的规定处理。</p>
                <p class="order_pra">第五十三条 旅客误机</p>
                <p class="order_pra">旅客误机后，如要求变更或退票，按本条件第三十三条自愿变更或第三十七条自愿退票的规定办理。</p>
                <p class="order_pra">第五十四条 旅客漏乘</p>
                <p class="order_pra">（一） 由于旅客原因发生漏乘，按本条件第五十三条旅客误机的规定办理。</p>
                <p class="order_pra">（二）由于九元航空原因旅客漏乘，九元航空将尽早安排旅客乘坐后续航班成行。如旅客要求退票，按本条件第三十六条非自愿退票的规定办理。</p>
                <p class="order_pra">第五十五条 旅客错乘</p>
                <p class="order_pra">（一） 旅客错乘飞机，九元航空应尽早安排错乘旅客乘坐后续航班飞往旅客客票上列明的目的地，票款不补不退。如旅客要求在错乘的到达站终止旅行，票款差额不补不退。</p>
                <p class="order_pra">（二） 由于九元航空原因旅客错乘，九元航空应尽早安排错乘旅客乘坐后续航班飞往旅客客票上列明的目的地。如旅客要求退票，按本条件第三十六条非自愿退票的规定办理。</p>
                <p class="order_pra">第十三章 行李运输</p>
                <p class="order_pra">第五十六条 一般规定</p>
                <p class="order_pra">九元航空承运的行李，只限于符合本条件第三条第（三十五）款定义范围内的物品。</p>
                <p class="order_pra">九元航空承运的行李，按照运输责任分为托运行李、自理行李和随身携带物品。</p>
                <p class="order_pra">国家规定的禁运物品、限制运输物品、危险物品，以及具有异味或容易污损飞机的其它物品，不能作为行李或夹入行李内托运。九元航空在收运行李前或在运输过程中，发现行李中装有不得作为行李或夹入行李内运输的任何物品，可以拒绝收运或随时终止运输。</p>
                <p class="order_pra">第五十七条 不得作为行李运输的物品</p>
                <p class="order_pra">下列物品不得作为行李或夹入行李，也不得带入客舱：</p>
                <p class="order_pra">（一）危险品</p>
                <p class="order_pra">1．爆炸品；</p>
                <p class="order_pra">2．气体，包括易燃和非易燃无毒气体、有毒气体；</p>
                <p class="order_pra">3．易燃液体；</p>
                <p class="order_pra">4．易燃固体、自燃物质和遇水释放易燃气体的物质；</p>
                <p class="order_pra">5．氧化剂和有机过氧化物；</p>
                <p class="order_pra">6．毒性物质和传染性物质；</p>
                <p class="order_pra">7．放射性物质；</p>
                <p class="order_pra">8．腐蚀性物质；</p>
                <p class="order_pra">9．磁性物质；</p>
                <p class="order_pra">10．具有麻醉、令人不快或其他类似性质的物质；</p>
                <p class="order_pra">11．容易污损飞机的物品；</p>
                <p class="order_pra">12.九元航空规定不得作为行李运输的其他危险物品。</p>
                <p class="order_pra">（二）枪支，含各种类型仿真玩具枪、枪型打火机及其他各种类型带有攻击性的武器，但体育运动用器械除外。</p>
                <p class="order_pra">（三）军械、警械。</p>
                <p class="order_pra">（四）管制刀具。</p>
                <p class="order_pra">（五）活体动物，但本条件第六十九条规定的小动物、导盲犬和助听犬除外。</p>
                <p class="order_pra">（六）根据ICAO、IATA-DGR 及国家规定的其他限制运输的危险物品，如额定能量值超过160Wh 的锂电池、充电宝等。</p>
                <p class="order_pra">第五十八条 不得作为托运行李运输的物品</p>
                <p class="order_pra">重要文件和资料、证券、货币、汇票、珠宝、贵重金属及其制品、银制品、贵重物品、古玩字画、易碎和易损坏物品、易腐物品、样品、旅行证件、锂含量不超过2 克的锂金属电池、额定能量值不超过100Wh(瓦特小时)的锂离子电池、充电宝等需要专人照管的物品不得作为托运行李或夹入行李内托运，而应作为随身携带物品带入客舱运输。</p>
                <p class="order_pra">九元航空对托运行李内夹带上述物品的遗失或损坏按一般托运行李承担赔偿责任。</p>
                <p class="order_pra">第五十九条 限制运输的物品</p>
                <p class="order_pra">下列物品只有在符合九元航空运输条件的情况下，并经九元航空同意，方可接受运输：</p>
                <p class="order_pra">（一）精密仪器、电器等类物品，应作为货物托运；如旅客坚持按托运行李运输的，必须有妥善包装，并且此类物品的重量不得计算在免费行李额内，按逾重行李费收取运费。</p>
                <p class="order_pra">（二）体育运动用器械，包括体育运动用枪支和弹药。</p>
                <p class="order_pra">（三）本条件第六十九条规定的小动物、导盲犬和助听犬。</p>
                <p class="order_pra">（四）外交信袋，机要文件。</p>
                <p class="order_pra">（五）旅客旅行途中使用的折叠轮椅或电动轮椅。</p>
                <p class="order_pra">（六）管制刀具以外的利器、钝器，例如菜刀、水果刀、餐刀、工艺品刀、手术刀、剪刀以及钢锉、斧子、短棍、锤子等，应按托运行李运输。</p>
                <p class="order_pra">（七）干冰、含有酒精的饮料、旅客旅行途中所需的烟具、药品、化妆品等。</p>
                <p class="order_pra">（八）额定能量值超过100Wh 但不超过160Wh 的锂离子电池、充电宝。</p>
                <p class="order_pra">第六十条 托运行李</p>
                <p class="order_pra">（一）托运行李必须包装完善、锁扣完好、捆扎牢固，能承受一定的压力，能够在正常的操作条件下安全装卸和运输，并应符合下列条件：</p>
                <p class="order_pra">1.旅行箱、旅行袋和手提包等必须加锁；</p>
                <p class="order_pra">2.两件以上的包件，不能捆为一件；</p>
                <p class="order_pra">3.行李上不能附插其他物品；</p>
                <p class="order_pra">4.竹篮、网兜、草绳、草袋等不能作为行李的外包装物；</p>
                <p class="order_pra">5.行李上应写明旅客的姓名、详细地址、电话号码；</p>
                <p class="order_pra">6.行李包装内不能用锯末、谷壳、草屑等作衬垫物。</p>
                <p class="order_pra">（二） 托运行李每件重量不能超过50 公斤，体积不能超过40×60×100 厘米。超过上述规定的行李，应事先征得九元航空的同意才能托运。</p>
                <p class="order_pra">第六十一条 自理行李和随身携带物品</p>
                <p class="order_pra">每位旅客带入客舱的自理行李和随身携带物品各限一件，总体积不能超过20×30×40 厘米，重量合计不超过7 公斤，超过上述重量、件数或体积限制的自理行李和随身携带物品应作为托运行李运输。</p>
                <p class="order_pra">第六十二条 免费行李额</p>
                <p class="order_pra">（一）符合本条件第六十一条规定的自理行李和随身携带物品可免费运输。</p>
                <p class="order_pra">（二）旅客免费行李额（包括托运行李、自理行李和随身携带物品）为15 公斤，超过免费行李额的部分，九元航空将按照本条件第六十三条的规定收取逾重行李费。</p>
                <p class="order_pra">（三）搭乘同一航班前往同一目的地的两个（含）以上的同行旅客，如在同一时间、同一地点或以其他方式证明为同行旅客的，办理行李托运手续时，其免费行李额可以按照各自的免费行李额合并计算。</p>
                <p class="order_pra">（四）残疾人必须携带的辅助器具（折叠轮椅、手杖、假肢等），给予免费托运。</p>
                <p class="order_pra">第六十三条 逾重行李费</p>
                <p class="order_pra">（一）旅客的托运行李、自理行李和随身携带物品的总重量，超过该旅客免费行李额的部分，称为逾重行李，应当支付逾重行李费。</p>
                <p class="order_pra">（二）收取逾重行李费，应填开逾重行李票。</p>
                <p class="order_pra">（三）逾重行李费率以每公斤按中国民航公布运价的1.5％计算，金额以元为单位，尾数四舍五入。</p>
                <p class="order_pra">第六十四条 声明价值</p>
                <p class="order_pra">（一）旅客的托运行李，每公斤价值超过人民币100 元时，可办理行李的声明价值。</p>
                <p class="order_pra">（二）托运行李的声明价值不能超过行李本身的实际价值。每一旅客的行李声明价值最高限额为人民币8,000 元。如九元航空对声明价值有异议而旅客又拒绝接受检查时，九元航空有权拒绝收运。</p>
                <p class="order_pra">（三）九元航空按照旅客声明的价值中超过本条件第六十四条第（一）款规定限额部分的价值的5‰收取声明价值附加费。金额以元为单位，尾数四舍五入。</p>
                <p class="order_pra">（四）办理声明价值的行李不包含在免费行李额内。</p>
                <p class="order_pra">第六十五条 拒绝运输权</p>
                <p class="order_pra">（一）旅客的行李如属于或夹带有本条件第五十七条所列的物品，九元航空有权拒绝接受该行李的运输。</p>
                <p class="order_pra">（二）旅客的托运行李如属于或夹带有本条件第五十八条所列的物品，九元航空有权拒绝接受该行李作为托运行李运输。</p>
                <p class="order_pra">（三）旅客携带了属于本条件第五十九条所列的物品，如旅客没有或拒绝遵守九元航空的限制运输条件，九元航空有权拒绝接受该物品的运输。</p>
                <p class="order_pra">（四）旅客的行李如因其形态、包装、体积、重量或特性等原因不符合九元航空规定，九元航空有权要求旅客加以改善；未能改善的，九元航空有权拒绝接受该行李的运输。</p>
                <p class="order_pra">第六十六条 检查权</p>
                <p class="order_pra">九元航空为了运输安全原因，可以会同旅客对其行李进行检查；必要时，可会同有关部门进行检查。如果旅客拒绝检查，九元航空有权拒绝接受该行李的运输。</p>
                <p class="order_pra">第六十七条 收运要求</p>
                <p class="order_pra">（一）旅客必须凭有效客票托运行李。九元航空应准确记录托运行李的件数和重量。</p>
                <p class="order_pra">（二）九元航空只在航班离站当日办理乘机手续时收运行李。</p>
                <p class="order_pra">（三）九元航空对旅客托运的每件行李应拴挂行李牌，并将其中的识别联交给旅客。经九元航空同意的旅客自理行李，在与托运行李合并计重后，交由旅客带入客舱自行照管。</p>
                <p class="order_pra">（四）旅客托运有运输责任争议的行李时，九元航空应经旅客同意，拴挂免除责任行李牌，以免除九元航空相应的运输责任。</p>
                <p class="order_pra">第六十八条 行李载运</p>
                <p class="order_pra">（一）旅客的托运行李，应与旅客同机运送，特殊情况下不能同机运送时，九元航空应向旅客说明，并优先安排在载量允许的后续航班上运送。</p>
                <p class="order_pra">（二）旅客的逾重行李在飞机载量允许的条件下，应与旅客同机运送。如载量不允许，而旅客又拒绝使用后续可利用航班运送，九元航空可拒绝收运。</p>
                <p class="order_pra">第六十九条 小动物、导盲犬、助听犬运输</p>
                <p class="order_pra">（一）小动物是指家庭驯养的狗、猫、鸟或其它玩赏宠物。野生动物和具有形体怪异或易于伤人等特性的动物如蛇等，不属于小动物范围。</p>
                <p class="order_pra">（二）旅客托运小动物必须在定座时提出，并提供动物检疫证明，经九元航空同意后方可托运。</p>
                <p class="order_pra">（三）旅客应在乘机的当日，按九元航空指定的时间，将小动物自行运至机场办理托运手续。</p>
                <p class="order_pra">（四）装运小动物的容器应符合下列要求：</p>
                <p class="order_pra">1. 能防止小动物破坏、逃逸和防止小动物将身体某一部位伸出容器以外损伤人员、行李、货物或飞机；</p>
                <p class="order_pra">2. 能保证小动物站立和适当活动，保证空气流通，不致使小动物窒息；</p>
                <p class="order_pra">3. 能防止粪便渗溢，以免污染飞机、机上设备以及其他物品。</p>
                <p class="order_pra">（五）旅客携带的小动物，除经九元航空特许外，必须装在货舱内运输。</p>
                <p class="order_pra">（六）小动物及其容器和携带的食物的重量，不得计算在旅客的免费行李额内，应按逾重行李交付逾重行李费</p>
                <p class="order_pra">（七）小动物运输不能办理声明价值。</p>
                <p class="order_pra">（八）旅客应对所托运的小动物承担全部责任。在运输中除九元航空原因外出现的小动物患病、受伤和死亡，九元航空不承担责任。</p>
                <p class="order_pra">（九）导盲犬或者助听犬，是指经过专门训练能够为盲人导盲或者为聋人助听的狗。盲人或者持有医生证明的聋人旅客携带导盲犬或者助听犬乘机，按下列规定办理：</p>
                <p class="order_pra">1. 在符合九元航空运输条件的情况下，导盲犬、助听犬可以由盲人或聋人旅客本人带入客舱运输。导盲犬、助听犬连同其容器和食物可以免费运输而不计算在免费行李额内；</p>
                <p class="order_pra">2. 带进客舱的导盲犬或者助听犬，必须在上航空器前为其戴上口套和系上牵引绳索，并不得占用座位和让其任意跑动。装在货舱内运输的，其容器必须符合本规则第六十九条第(四)项的规定；</p>
                <p class="order_pra">3. 收运导盲犬或者助听犬的其他运输条件，按照本规则第六十九条第(二)、（三）和（七）的规定办理；</p>
                <p class="order_pra">4. 在中途不降停的长距离飞行航班上或者在某种型号的航空器上，不适宜运输导盲犬或者助听犬的，九元航空可以不接受运输。</p>
                <p class="order_pra">第七十条 违章行李</p>
                <p class="order_pra">旅客的托运行李和自理行李中，凡夹带国家规定的禁运物品、限制携带物品或危险物品等，其整件行李称为违章行李。对违章行李，</p>
                <p class="order_pra">九元航空按下列规定处理：</p>
                <p class="order_pra">（一） 在始发地发现违章行李，九元航空要按照本条件第六十五条的规定拒绝收运；如已承运，有权取消运输，或将违章夹带物品取出后运输，已收逾重行李费不退。</p>
                <p class="order_pra">（二） 在经停地发现违章行李，应立即停运，已收逾重行李费不退。</p>
                <p class="order_pra">（三） 对违章行李中夹带的国家规定的禁运物品、限制携带物品或危险物品，交有关部门处理。</p>
                <p class="order_pra">第七十一条 行李退运</p>
                <p class="order_pra">由于九元航空的原因，需要安排旅客改乘其它航班，行李运输应随旅客作相应的变更，已收逾重行李费多退少不补；已交付的声明价值附加费不退。</p>
                <p class="order_pra">行李的退运按如下规定办理：</p>
                <p class="order_pra">（一）旅客在始发地要求退运行李，必须在行李装机前提出。如旅客退票，已收运的行李也必须同时退运。以上退运，均退还已收逾重行李费。</p>
                <p class="order_pra">（二）旅客在经停地退运行李，除时间不允许外，可予以办理。但未使用航段的已收逾重行李费不退。</p>
                <p class="order_pra">（三）办理声明价值的行李退运时，在始发地退还已交付的声明价值附加费，在经停地不退已交付的声明价值附加费。</p>
                <p class="order_pra">（四）由于九元航空的原因，需要安排旅客改乘其他航班，行李运输应随旅客作相应的变更，已收逾重行李费多退少不补；已交付的声明价值附加费不退。</p>
                <p class="order_pra">第七十二条 行李交付</p>
                <p class="order_pra">（一）旅客应在航班到达后立即在机场凭行李牌的识别联领取行李。必要时，应交验客票。</p>
                <p class="order_pra">（二）如旅客未立即领取行李，九元航空从行李到达的次日起向旅客收取行李保管费。对于旅客行李中的易腐物品，九元航空有权在行李到达24 小时后予以处理。</p>
                <p class="order_pra">（三）九元航空凭识别联交付行李，对于领取行李的人是否确系旅客本人，以及由此造成的损失及费用，不承担责任。</p>
                <p class="order_pra">（四）旅客行李延误到达后，九元航空应立即通知旅客领取，也可直接送达旅客。对延误行李不收取保管费。</p>
                <p class="order_pra">（五）旅客在领取行李时，如果没有提出异议，即为托运行李已经完好交付。</p>
                <p class="order_pra">（六）旅客遗失行李牌的识别联，应立即向九元航空挂失。旅客如要求领取行李，应向九元航空提供足够的证明，并在领取行李时出具收据。如在声明挂失前行李已被冒领，九元航空不承担责任。</p>
                <p class="order_pra">第七十三条无法交付的行李</p>
                <p class="order_pra">行李自到达的次日起，超过90 日仍无人认领，九元航空可按照无法交付行李的有关规定处理。</p>
                <p class="order_pra">第七十四条 行李不正常运输的处理</p>
                <p class="order_pra">（一）行李运输发生延误、遗失或损坏，九元航空或其授权地面服务代理人应会同旅客填写《行李运输事故记录》或《破损行李事故记录》，尽快查明情况和原因，并将调查结果答复旅客和有关单位。如发生行李赔偿，可在始发地、经停地或目的地办理。</p>
                <p class="order_pra">（二）因九元航空原因使旅客的托运行李未能与旅客同机到达，造成旅客旅途生活的不便，可协商给予旅客临时生活用品补偿费人民币100 元。</p>
                <p class="order_pra">第七十五条 赔偿要求</p>
                <p class="order_pra">旅客的托运行李丢失或损坏，应按本条件第九十四条规定的期限向九元航空或其地面服务代理人提出赔偿要求，并随附客票（或复印件）、行李牌的识别联、《行李运输事故记录》或《破损行李事故记录》、证明行李内容和价格的凭证以及其他有关的证明。</p>
                <p class="order_pra">第十四章 飞机上的行为</p>
                <p class="order_pra">第七十六条 如果旅客在飞机上的行为危及到飞机或飞机上任何人或财产的安全，或妨碍机组人员履行职责，或不遵守机组的指示，包括但不限于吸烟、酗酒或吸食毒品，对机组或其他旅客造成或有可能造成不适、不便、损害或者伤害的行为，九元航空可以采取认为合理的措施，包括实施管束，以阻止该行为的继续。旅客有可能在任何地点被要求下机并被拒绝续运，而且旅客有可能因机舱内的不当行为被起诉。</p>
                <p class="order_pra">第七十七条 出于安全的原因，旅客不得在飞机上使用任何电子设备，包括但不限于移动电话、笔记本电脑、便携式收音机、CD 播放器、电子游戏机或包括无线电操纵的玩具和对讲机在内的发射装置。未经九元航空允许，旅客不得在飞机上使用除便携式录放机、助听器和心脏起搏器以外的任何电子设备。</p>
                <p class="order_pra">第七十八条九元航空所有国内航班全程禁烟。</p>
                <p class="order_pra">第七十九条旅客在机上就座时，应全程系好安全带。</p>
                <p class="order_pra">第十五章 旅客服务</p>
                <p class="order_pra">第一节 一般服务</p>
                <p class="order_pra">第八十条 九元航空以保证飞机安全和航班正常，提供良好服务为准则，以文明礼貌、热情周到的服务态度，认真做好空中和地面的旅客运输的各项服务工作。九元航空不为旅客提供免费机上食品及饮料。旅客可在九元航空官方网站购票时付费预定或在机上直接购买食品及饮料。</p>
                <p class="order_pra">第八十一条 九元航空不负责为旅客提供机场区域内、机场与市区之间或在同一城市的机场与机场之间的地面运输。对于此项地面运输服务提供者的行为或疏忽，九元航空不承担责任。如果九元航空根据另外签订的有偿服务协议，向旅客提供地面运输，本条件不适用于该地面运输服务。</p>
                <p class="order_pra">第八十二条 旅客在联程航班衔接地点的地面膳宿费用，应由旅客自理。</p>
                <p class="order_pra">第八十三条 在航空运输过程中，旅客发生疾病时，九元航空应积极采取措施，尽力救护。</p>
                <p class="order_pra">第八十四条 根据九元航空自身保障和服务条件，在和旅客达成一致的前提下，九元航空可向旅客提供特殊额外的有偿服务。</p>
                <p class="order_pra">第二节 不正常航班的服务</p>
                <p class="order_pra">第八十五条 由于机务维护不善、航班调配不当、商务或机组失职等九元航空之原因，造成航班在始发地延误或取消，九元航空应按规定向旅客提供服务：</p>
                <p class="order_pra">（一）因九元航空的原因造成航班延误两小时以上，九元航空为旅客提供免费饮料；就餐时间提供免费餐食。</p>
                <p class="order_pra">（二）因九元航空的原因造成航班延误四小时以上，九元航空为旅客提供带盥洗设施的标准间住宿。</p>
                <p class="order_pra">（三） 因九元航空的原因延误或取消航班，旅客可在不支付额外费用的情况下搭乘本公司后续航班。</p>
                <p class="order_pra">（四）旅客要求退票的，按本条件第三十六条非自愿退票的规定办理。客票在网上订购的，票款在三十个工作日退还。通过其他途径购买九元航空客票的应按第三方服务机构规定的时间内退票。</p>
                <p class="order_pra">第八十六条由于不可抗力、突发事件或第三方的原因，包括但不限于天气、火灾、地震、海啸、瘟疫、战争或武装冲突、政府行为、意外事件、空中交通管制、安检以及旅客原因等非承运人原因，造成航班在始发地延误或取消，九元航空在此情况下不对旅客的损失承担责任。但九元航空可协助旅客安排必要的餐食和住宿，费用应由旅客自理。</p>
                <p class="order_pra">第八十七条航班在经停地延误或取消，无论何种原因，九元航空均负责向经停旅客提供膳宿服务。</p>
                <p class="order_pra">第八十八条国内航班发生备降，无论何种原因，承运人均应当向备降旅客提供餐食或住宿服务。</p>
                <p class="order_pra">第八十九条 航班延误或取消，九元航空及其授权地面服务代理人应做好解释工作，并迅速及时将航班延误或取消等信息通知旅客，做好旅客服务工作。除第八十五条、第八十六、第八十七条、第八十八条服务内容以外的任何其他补偿，九元航空不予提供。</p>
                <p class="order_pra">第九十一条 九元航空应和其他各保障单位相互配合，认真负责，共同保障航班正常，避免不必要的航班延误。</p>
                <p class="order_pra">第十六章 连续运输</p>
                <p class="order_pra">第九十条 航空运输合同各方认为由几个连续的承运人共同承担的运输是一项单一业务活动的，无论其形式是以一本客票订立或者数本客票订立，应视为是一个单一的不可分割的运输。</p>
                <p class="order_pra">第十七章 损失责任及赔偿限额</p>
                <p class="order_pra">第九十二条 损失责任</p>
                <p class="order_pra">（一）九元航空应对发生在其承运的航线上的损失承担责任，合同另有约定的除外。</p>
                <p class="order_pra">（二）九元航空为遵守或旅客未遵守国家法律、政府规定、命令和要求而引起的任何损失，九元航空不应承担责任。</p>
                <p class="order_pra">（三）九元航空的责任，应不超过经证明损失的数额。九元航空对间接的或随之引发的损失不承担责任，九元航空也不对精神损害承担责任。</p>
                <p class="order_pra">第九十三条旅客人身伤亡</p>
                <p class="order_pra">（一）旅客在运输中由于其年龄、精神或身体状况，对本人形成危害和危险，由此造成或加重其本人的任何疾病、受伤、残废或死亡，九元航空不承担责任。</p>
                <p class="order_pra">（二）九元航空责任的任何免除或限制适用于并有利于九元航空的代理人、雇员和代表以及将飞机提供给九元航空使用的任何人及其代理人雇员和代表。九元航空和上述代理人、雇员、代表以及任何人可以支付的赔偿总额，不得超过九元航空的责任限额。</p>
                <p class="order_pra">（三）九元航空对每名旅客死亡、受伤的赔偿责任限额为人民币400,000元。 </p>
                <p class="order_pra">第九十四条 行李赔偿</p>
                <p class="order_pra">（一）旅客的托运行李从托运时起到交付时止，如发生延误、丢失或损坏，九元航空应当承担责任。</p>
                <p class="order_pra">（二）九元航空能够证明为了避免延误损失的发生已经采取一切必要措施或不可能采取措施的，不承担责任</p>
                <p class="order_pra">（三）托运行李的损失完全是由于行李本身的自然属性、质量或缺陷造成的，九元航空不承担责任。</p>
                <p class="order_pra">（四）由于旅客行李内装物品造成该旅客伤害或其行李损失，九元航空不承担责任。由于旅客行李内装物品对他人造成伤害或对他人物品或九元航空财产造成损失，旅客应赔偿九元航空的所有损失和由此支付的一切费用。</p>
                <p class="order_pra">（五）对于旅客在托运行李内夹带的本条件第六十三条所列物品的丢失或损坏，只按一般托运行李承担赔偿责任。</p>
                <p class="order_pra">（六）在联程运输中，九元航空仅对发生在其承运的航线上的行李损失承担赔偿责任。</p>
                <p class="order_pra">（七）旅客的托运行李全部或部分损坏、丢失，赔偿金额每公斤不超过人民币100 元。如行李的价值每公斤低于100 元时，按实际价值赔偿。</p>
                <p class="order_pra">（八）旅客丢失行李的重量按实际托运行李的重量计算，无法确定丢失的行李重量，每一旅客的丢失行李最多只能按该旅客享受的免费行李额赔偿。</p>
                <p class="order_pra">（九）旅客的丢失行李如已办理行李声明价值，九元航空按声明的价值赔偿。行李的声明价值高于在目的地点交付时的实际价值的，按实际价值赔偿。</p>
                <p class="order_pra">（十）行李损坏时，按照行李降低的价值赔偿或负担修理费用。行李箱损坏，赔偿金额按行李箱自身重量每公斤不超过人民币100 元或负担相应的修理费用。</p>
                <p class="order_pra">（十一）由于发生在上、下航空器期间或航空器上的事件造成旅客的自理行李灭失，九元航空承担的最高赔偿金额每位旅客不超过人民币3000 元。如自理行李的价值低于上述限额时，按实际价值赔偿。</p>
                <p class="order_pra">（十二）行李赔偿时，对赔偿行李收取的逾重行李费应退还，已收取的声明价值附加费不退。</p>
                <p class="order_pra">（十三）已赔偿的丢失行李找到后，九元航空应尽快通知旅客。旅客应将自己的行李领回，退还全部赔偿，临时生活用品补偿费不退。如发现旅客有欺诈行为的，九元航空有权追回全部赔偿并追究其法律责任。</p>
                <p class="order_pra">第九十五条 索赔和诉讼期限</p>
                <p class="order_pra">（一）旅客的托运行李发生损失的，如有索赔要求，有权提出索赔的人应当在发现损失后向九元航空书面提出异议。托运行李发生损失的，至迟应当自收到托运行李之日起七日内提出；托运行李发生延误的，至迟应自托运行李交付旅客处置之日起二十一日内提出；未在规定期限内提出异议的，不得向九元航空提出索赔诉讼。</p>
                <p class="order_pra">（二）关于航空运输赔偿责任的诉讼时效期间为二年，应从飞机到达目的地点之日起，或从飞机应当到达目的地点之日起，或从运输终止之日起计算，超过此期限未提起诉讼即就丧失对损失赔偿的权利。</p>
                <p class="order_pra">第十八章行政手续</p>
                <p class="order_pra">第九十六条旅客必须遵守中华人民共和国的法律、政府规定、命令、要求和旅行条件的各项规定，并应服从政府或机场管理和九元航空的任何安全检查。</p>
                <p class="order_pra">第九十七条 旅客应出示国家的法律、政府规定、命令、要求或旅行条件所要求的有效证件。九元航空对未遵守国家法律、规定、命令、或旅行条件或其证件不符合要求的旅客，保留拒绝载运的权利。</p>
                <p class="order_pra">第九十八条 政府有关主管部门检查旅客的托运行李或自理行李时，旅客应当到场。对旅客未到场接受检查而发生的任何损失，九元航空不承担责任。</p>
                <p class="order_pra">第十九章生效与修改</p>
                <p class="order_pra">第九十九条 本条件自二〇一七年一月一日起生效并施行。</p>
                <p class="order_pra">第一百条 本条件的规定如与法律和法规强制性的规定冲突的，应以法律或法规的规定为准，但不影响本条件其它部分的效力。</p>
                <p class="order_pra">第一百零一条 九元航空有权依照中国民用航空总局规定的程序，不经通知修改本条件和九元航空运输规定。但此类修改不适用于修改前已经开始的运输。</p>
                <p class="order_pra">第一百零二条 九元航空的工作人员、授权销售代理人、授权地面服务代理人或其它代理人及其雇员都无权违反或更改本条件。</p>
            </div>         
        </div>
    </div> -->
      <!-- <div v-if="tipNotes=='HO'">
      <div>
        <h3>吉祥航空旅客、行李国内运输总条件</h3>
        <p><strong>0. 总则</strong></p>
        <p>上海吉祥航空股份有限公司制定旅客、行李国内运输总条件是确保国内航班的旅客、行李在航站的地面服务保障工作的有效运行，是上海吉祥航空股份有限公司旅客运输合同的一部分，主要由如下内容组成：</p>
        <p>1. 定义</p>
        <p>2. 适用范围</p>
        <p>3. 客票</p>
        <p>4. 票价与税费</p>
        <p>5. 定座</p>
        <p>6. 购票</p>
        <p>7. 航班超售</p>
        <p>8. 乘机</p>
        <p>9. 行李运输</p>
        <p>10.班期时刻、取消及变更</p>
        <p>11.拒绝运输和限制运输</p>
        <p>12.退票</p>
        <p>13.客票变更</p>
        <p>15.旅客服务</p>
        <p>16.飞机上的行为</p>
        <p>17.延误处置</p>
        <p>18.延误补偿</p>
        <p>19.旅客投诉管理</p>
        <p>20.行政手续</p>
        <p>21.连续承运人</p>
        <p>22.损失责任及赔偿限额</p>
        <p>23.生效与修改</p>
        <p>依据《中华人民共和国民用航空法》、《中国民用航空旅客、行李国内运输规则》、《大型飞机公共航空运输承运人运行合格审定规则》、《民用航空器运行适航管理规定》等有关法律、规定制订本条件。</p>
        <p>0.1.	作为上海吉祥航空股份有限公司的国内旅客、行李运输的客票销售、地面服务等各环节工作人员及地面服务代理人在航站运行时依据的宗旨和准则。各个与国内旅客、行李运输相关的部门和人员、包括分、子公司、营业部及地面服务代理人必须贯彻执行。</p>
        <p>0.2.	总条件的颁发实施，将对国内旅客、行李运输中的客票销售、值机服务、行李运输等各个方面标准化、程序化、规范化管理起到完善作用，从而实现安全第一、飞行正常、优质服务。</p>
        <p><strong>1.	定义</strong></p>
        <p>上海吉祥航空股份有限公司（以下简称“吉祥航空”）旅客、行李国内运输总条件（以下简称“条件”）中的下列用语，除具体条款中有其他要求或另有明确规定外，含义如下：</p>
        <p>1.1.	“国内航空运输”简称“国内运输”，指根据旅客运输合同，其出发地点、约定经停地点和目的地点均在中华人民共和国境内（香港、澳门特别行政区及台湾地区除外）的航空运输。</p>
        <p>1.2.	“吉祥航空”是指上海吉祥航空股份有限公司的简称；其航班英文代号：HO。</p>
        <p>1.3.	“航空公司代码”是指专为识别特定航空承运人的两个字符或三个字母的代码。</p>
        <p>1.4.	“承运人”是指使用民用航空器从事旅客、行李或者货物运输的公共航空运输企业，包括国内承运人、港澳台地区承运人和外国承运人。</p>
        <p>1.5.	“出票承运人”是指在乘机联或有价票联电子客票交易中显示出票证代号的航空运输企业。出票承运人应为电子客票交易的控制与授权实体。</p>
        <p>1.6.	“销售承运人”是指代号被作为销售承运人记录在电子乘机联或有价票联上的航空运输企业，当有双边协议时，例如代码共享协议，销售承运人不一定是实际承运人。</p>
        <p>1.7.	“实际承运人”是指实际履行全部或部分运输合同的航空运输企业。</p>
        <p>1.8.	“吉祥航空规定”指除本运输条件外，吉祥航空为对旅客及其行李安全运输进行管理而公布的并于填开客票之日起生效的各种有效规定，包括有效的适用票价及其适用条件。</p>
        <p>1.9.	“吉祥航空销售代理人”指经吉祥航空授权并代表吉祥航空，在约定的授权范围内销售其航空旅客运输产品的企业法人。</p>
        <p>1.10.	“吉祥航空地面服务代理人”指经吉祥航空授权并代表吉祥航空，在约定的授权范围内提供旅客、行李航空运输服务代理业务的企业法人。</p>
        <p>1.11.	“旅客”指除机组成员以外，经吉祥航空同意在飞机上载运或已经载运的任何人。</p>
        <p>1.12.	“儿童”指旅行开始之日年龄满2周岁（含）但不满12周岁的人。</p>
        <p>1.13.	“无陪儿童”指旅行开始之日年龄满5周岁（含）但不满12周岁，乘坐飞机时无成人（年满18周岁且有民事行为能力的人）陪伴同行的儿童。</p>
        <p>1.14.	“婴儿”指旅行开始之日年龄已满14天，但未满2周岁的人。</p>
        <p>1.15.	“合同单位”指与吉祥航空签订定座、购票合同的单位。</p>
        <p>1.16.	“运价”指吉祥航空公布的票价、费用和相关的运输条件。</p>
        <p>1.17.	“定座”指对旅客预定的座位、舱位等级或对行李的重量、体积的预留。</p>
        <p>1.18.	“航班”指飞机按规定的航线、日期、时刻进行的飞行。</p>
        <p>1.19.	“普通票价”指吉祥航空公布的头等舱、公务舱、经济舱各舱位等级中成人的单程直达最高票价。</p>
        <p>1.20.	“特种票价”指低于普通票价并附有使用限制条件的票价。</p>
        <p>1.21.	“有效身份证件”指旅客购票和乘机时必须出示的由政府主管部门规定的证明其身份的证件。如：居民身份证、按规定可使用的有效护照、军官证、警官证、士兵证、文职干部或离退休干部证明，16周岁以下未成年人的学生证、户口簿、婴儿出生证等证件。</p>
        <p>1.22.	“客票”是指吉祥航空或其销售代理人销售或认可或赋予乘载权利的运输凭证，分为纸质客票和电子客票。</p>
        <p>1.23.	“纸质客票”是指吉祥航空或其销售代理人代表吉祥航空所填开的被称为“客票及行李票”的凭证，包括运输合同条件、声明、通知以及乘机联和旅客联等内容。</p>
        <p>1.24.	“电子客票”是指由吉祥航空或其销售代理人销售的以电子数据形式体现的有效客票，是纸质客票的电子替代产品。</p>
        <p>1.25.	“航空运输电子客票行程单”（以下简称“行程单”）指吉祥航空或其销售代理人提供给旅客作为其购买电子客票的付款凭证，同时具备提示旅客行程的作用。</p>
        <p>1.26.	“联程客票”指列明有两个（含）以上航班的客票。</p>
        <p>1.27.	“来回程客票”指从出发地点至目的地点并按原航程返回原出发地点的客票。</p>
        <p>1.28.	“连续客票”指填开给旅客与另一本或多本客票票号连在一起，共同构成一个单一运输合同的客票。</p>
        <p>1.29.	“日”指日历日而非工作日，一周包括七日。但是在确定客票有效期限时客票填开日或首次旅行开始之日均不计算在内，在通知旅客时，通知发出日不计算在内。</p>
        <p>1.30.	“定期客票”指列明航班、乘机日期和定妥座位的客票。</p>
        <p>1.31.	“不定期客票”指未列明航班、乘机日期或未定妥座位的客票。</p>
        <p>1.32.	“乘机联”是指纸质客票中标明“运输有效”的部分,表示旅客有权搭乘该联指定的地点之间的航班。</p>
        <p>1.33.	“旅客联”指纸质客票中标明旅客联的部分，始终由旅客持有。</p>
        <p>1.34.	“误机”指旅客未按规定时间办妥乘机手续或因旅行证件不符合规定而未能乘机。</p>
        <p>1.35.	“漏乘”指旅客在始发站办妥乘机手续后或在经停地过站时未搭乘上指定的航班。</p>
        <p>1.36.	“错乘”指旅客乘坐了不是客票上列明的航班。</p>
        <p>1.37.	“超售”指超过航班最大允许座位数的销售行为。</p>
        <p>1.38.	“代码共享航班”指吉祥航空通过协议在另一承运人的航班上使用自己航空公司代码或多家航空运输企业在同一个航班上使用各自的航班号的航班。</p>
        <p>1.39.	“行李”指旅客在旅行中为了穿着、使用、舒适或便利而携带的必要或适量的物品和其他个人财物，包括旅客的托运行李和非托运行李。</p>
        <p>1.40.	“托运行李”指旅客交由吉祥航空负责照管和运输并填开行李票的行李。</p>
        <p>1.41.	“非托运行李”指除旅客托运行李外，由旅客自行照管的行李，包括免费随身携带物品。</p>
        <p>1.42.	“免费随身携带物品”指吉祥航空限定的品种和数量范围内并经吉祥航空同意在旅行期间包括经停点停留期间，免费由旅客自行携带乘机的小件物品。</p>
        <p>1.43.	“免费行李额”指根据吉祥航空规定旅客可以免费托运的行李限额。</p>
        <p>1.44.	“行李票”指客票中与旅客行李运输有关的记载。</p>
        <p>1.45.	“行李牌识别联”指由吉祥航空出具给旅客的专为识别托运行李的凭据。</p>
        <p>1.46.	“乘机登记截止时间”是指由吉祥航空规定旅客前来办理乘机登记的最晚时间。</p>
        <p>1.47.	实际“离站时间”指航班旅客登机后，机组得到空管部门许可撤去航空器最后一个轮挡这一动作的时间。。</p>
        <p>1.48.	计划“离站时间”指航班时刻管理部门批准的离站时间，是吉祥航空在航班时刻表公布并在客票上列明的时间。</p>
        <p>1.49.	“约定经停地点”指除出发地点和目的地点以外，在客票或班期时刻表内列明作为旅客旅行路线上预定停留的地点。</p>
        <p>1.50.	“不可抗力”指不能预见、不能避免且不能克服，即使采取一切合理的措施,仍不能避免其后果发生的客观情况旅行而产生的退票。</p>
        <p>1.51.	“非自愿退票”指因吉祥航空航班提前、延误、取消、航程改变、或不能提供原定座位致使旅客未能按运输合同完成旅行而产生的退票。</p>
        <p>1.52.	“变更费”指吉祥航空因旅客原因自愿变更航班或乘机日期而向其收取的符合原客票适用条件和本运输条件的手续费用。</p>
        <p>1.53.	“损害”是指吉祥航空在运输过程中或与之附属服务时所产生的死亡、身体伤害或全部或部分财产损失和其它损坏。</p>
        <p>1.54.	“附载的合同条款的声明”是指旅客的客票或行程单/收据上载有的或与其一并交给旅客的本条件的概述和声明。</p>
        <p>1.55.	“航班延误”是指航班实际到港挡轮挡时间晚于计划到港时间超过15分钟的情况。 </p>
        <p>1.56.	“航班出港延误”是指航班实际出港撤轮挡时间晚于计划出港时间超过15分钟的情况。 </p>
        <p>1.57.	“航班取消”是指因预计航班延误而停止飞行计划或者因延误而导致停止飞行计划的情况。 </p>
        <p>1.58.	“机上延误”是指航班飞机关舱门后至起飞前或者降落后至开舱门前，旅客在航空器内等待超过机场规定的地面滑行时间的情况。</p>
        <p>1.59.	“大面积航班延误”是指机场在某一时段内一定数量的进、出港航班延误或者取消，导致大量旅客滞留的情况。某一机场的大面积航班延误由机场管理机构根据航班量、机场保障能力等因素确定。</p>
        <p>1.60.	“残疾旅客辅助设备”指帮助残疾旅客应对自身残疾障碍、进行听、看、交流、行动的相关设备。</p>
        <p> </p>
        <p><strong>2.	适用范围</strong></p>
        <p>2.1.	除本条第2.2、2.3、2.4、2.5中另有规定外，本条件适用于吉祥航空以飞机运送旅客、行李而收取报酬的国内航空运输，以及吉祥航空作为实际承运人的代码共享航班或航段。</p>
        <p>2.2.	除免费运输条件、合同、票证另有规定外，本条件亦适用于免费运输。</p>
        <p>2.3.	根据吉祥航空包机合同提供的运输，本条件仅适用于该包机合同和包机客票的条款中所涉及的范围。</p>
        <p>2.4.	在本条件中如含有与国家法律、政府规定、命令或要求不一致的条款，除不一致的条款外，本条件的其余条款仍然有效。</p>
        <p>2.5.	除另有约定外，在吉祥航空的规定中如含有与本条件不一致的条款，以本条件为准。</p>
        <p> </p>
        <p><strong>3.	客票</strong></p>
        <p><strong>3.1.	一般规定</strong></p>
        <p>3.1.1.	吉祥航空客票是吉祥航空和旅客之间航空运输合同的初步证据。</p>
        <p>3.1.2.	旅客按照吉祥航空规定支付全部票款后，吉祥航空或其销售代理人为旅客填开客票。</p>
        <p>3.1.3.	吉祥航空为客票上所列姓名的旅客提供运输服务，旅客应按吉祥航空规定出示相应有效证件。</p>
        <p>3.1.4.	客票不得转让。</p>
        <p>3.1.5.	持纸质客票的旅客应出示包括所乘航班的乘机联、所有其它未使用的乘机联和旅客联的有效客票,否则无权乘机。如出示的客票是残损的或不是由吉祥航空或其销售代理人变更的,旅客亦无权乘机。</p>
        <p>3.1.6.	持电子客票的旅客，应出示购票时所提供的有效身份证件。如果电子乘机联状态有效，吉祥航空予以运输；如果旅客的电子客票已换开为纸质客票，则旅客出示有效且完整的纸质客票后，吉祥航空才予以运输。</p>
        <p>3.1.7.	客票的乘机联或电子乘机联必须按客票所列明的航程，从始发地点开始按顺序使用。对于未按顺序使用的乘机联，吉祥航空不予承运，但可以按未使用乘机联对应定座舱位的退票规定办理退票。</p>
        <p>3.1.8.	每一乘机联或电子乘机联上应该列明航段和舱位等级，并在航班上定妥座位和日期后，由吉祥航空接受运输。对未定妥座位的乘机联或电子乘机联，吉祥航空将按旅客的申请，根据其所持客票适用条件的票价和所申请航班的座位可利用情况为旅客定座。</p>
        <p>3.1.9.	纸质客票不得涂改。涂改的客票无效，票款不退。</p>
        <p>3.1.10.	旅客应在客票有效期内，完成客票上列明的全部航程。</p>
        <p>3.1.11.	含有国内航段的国际联程客票，其国内航段的乘机联可直接使用，无需换开成国内客票。</p>
        <p>3.1.12.	旅客在境外（含香港、澳门特别行政区及台湾地区）购买的用国际客票填开的纯国内航空运输客票，及含有国内航段的国际联程客票，其国内航段的乘机联或电子乘机联可直接使用，均无需换开成国内客票。</p>
        <p>3.1.13.	定期客票只适用于客票上列明的乘机日期和航班。</p>
        <p>3.1.14.	不定期客票或含有不定期航段的客票，是指旅客在购票时根据自身需求和运价产品规则，允许整张客票或某一航段的定座状态为“OPEN”。根据航线运价产品的规则，该客票的承运人、航班号、日期、定座状态中的一项或多项在购买时均可为“OPEN”状态，但在实际承运前必须确认方可接受运输。</p>
        <p><strong>3.2.	客票的有效期</strong></p>
        <p>3.2.1.	客票有效期自旅行开始之日起，一年内运输有效；如客票第一段未使用，则从填开客票之日起一年内运输有效，但特种票价客票除外。</p>
        <p>3.2.2.	特种票价的客票有效期，按吉祥航空规定的该特种票价的适用条件之有效期计算。</p>
        <p>3.2.3.	客票有效期的计算，从旅行开始或填开客票之日的次日零时起至有效期满之日的次日零时为止。</p>
        <p><strong>3.3.	客票有效期的延长</strong></p>
        <p>3.3.1.	由于吉祥航空的下列原因之一，造成旅客未能在客票有效期内旅行，其客票有效期将延长到已购客票舱位等级中有空余座位的最早吉祥航空航班为止：</p>
        <p>3.3.1.1.	吉祥航空取消旅客已经定妥座位的航班。</p>
        <p>3.3.1.2.	吉祥航空取消的航班约定经停地，而该约定经停地是旅客的出发地点或目的地点。</p>
        <p>3.3.1.3.	吉祥航空未能合理地按照班期时刻飞行。</p>
        <p>3.3.1.4.	吉祥航空造成旅客错失衔接航班。</p>
        <p>3.3.1.5.	吉祥航空未能提供旅客事先定妥的座位。</p>
        <p>3.3.2.	如果吉祥航空在该旅客定座时未能提供该客票舱位等级的航班座位，造成旅客未能在客票有效期内旅行，该旅客客票有效期将延长到同等舱位等级有可利用座位的最早吉祥航空航班。</p>
        <p>3.3.3.	持普通票价客票或与普通票价客票有效期相同的特种票价客票的旅客未能在客票有效期内旅行，是由于吉祥航空在旅客定座时未能按其客票的舱位等级提供航班座位，其客票有效期可延长至吉祥航空能够按该客票已付票价的舱位等级提供座位的第一个航班为止，但延长期不得超过七天。</p>
        <p>3.3.4.	持与普通票价客票有效期不同的特种票价的有效期按吉祥航空特种票价使用规定执行。</p>
        <p>3.3.5.	旅客开始旅行以后，若因病不能在客票有效期内继续旅行，吉祥航空可将该旅客的客票有效期延长至根据医生诊断证明确定的该旅客适宜旅行之日为止；或根据航班情况延长到该日以后所列舱位等级中有空余座位的吉祥航空最早航班，该旅客应提供二级（含）以上医院（或相当于该级别的医疗机构）出具的诊断证明；与患病旅客同行的旅客，其客票可同样予以延长，但最多不超过2人（含）。</p>
        <p>3.3.6.	如旅客在旅途中死亡，该旅客陪同人员的客票可用延长客票有效期的方法予以更改。如已开始旅行的旅客的直系亲属死亡，该旅客及其陪同的直系亲属的客票也可予以更改。此种更改应在收到死亡证明后办理，此种客票有效期的延长不得超过死亡之日起45日。</p>
        <p><strong>3.4.	纸质客票遗失</strong></p>
        <p>3.4.1.	遗失客票的挂失</p>
        <p>3.4.1.1.	旅客的客票全部或部分遗失或残损，或旅客出示的客票未能包括旅客联和所有未使用的乘机联，旅客应以书面形式向吉祥航空申请挂失。</p>
        <p>3.4.1.2.	旅客申请挂失，须出示其有效身份证件，如申请挂失者不是旅客本人，须出示旅客本人和挂失人的有效身份证件，并提供原购票的日期、地点以及足以证实该客票遗失的其它有效资料证明。</p>
        <p>3.4.1.3.	在旅客申请挂失前，客票如全部或部分已被冒用或冒退，吉祥航空不承担责任。</p>
        <p>3.4.2.	遗失客票的补发</p>
        <p>3.4.2.1.	如定期客票遗失后，最迟应在所乘航班规定离站时间1小时前向吉祥航空提供符合本条件3.4.1.2规定的资料与证明，并经吉祥航空查证认可后，在下列条件下可补发原定航班新客票：</p>
        <p>a)	旅客需填写吉祥航空的《遗失客票补发申请表》，遗失客票作废；</p>
        <p>b)	旅客须申明同意赔偿可能由此造成吉祥航空的一切损失，包括已经或今后被他人冒用或冒退以及由此引起的必要的诉讼费用。</p>
        <p>3.4.2.2.	客票（含定期、不定期）遗失，旅客应及时按3.4.1规定的手续向吉祥航空销售服务热线021-95520申请挂失。经查证该客票未被冒用、冒退，待客票有效期满后30日内，办理相关手续。</p>
        <p>3.4.2.3.	对未经查证或未经吉祥航空认可的遗失客票，吉祥航空有权不予补发客票。如旅客要求乘机，需另购客票。</p>
        <p>3.4.2.4.	补发的客票不能办理退款或变更。</p>
        <p>3.4.2.5.	如用吉祥航空客票填开其他航空公司航班的客票，此类客票一旦遗失，应征得原客票所列承运人的同意后方可补开。</p>
        <p>3.4.3.	遗失客票的退款</p>
        <p>3.4.3.1.	不定期客票遗失，旅客应及时按本条件3.4.1规定的手续以书面形式向吉祥航空申请挂失。经查证该客票未被冒用、冒退，待客票有效期满后30日内，办理退款手续。</p>
        <p>3.4.3.2.	定期客票遗失应在遗失客票有效期满30日内，经吉祥航空查证后，凭符合本条件3.4.1规定的资料与证明以及重新购票的旅客联，予以办理遗失客票的退款手续。</p>
        <p>3.4.4.	电子客票行程单的遗失</p>
        <p>3.4.4.1.	由于旅客原因造成已打印的电子客票行程单遗失，按《航空运输电子客票行程单管理办法（暂行）》规定，不再补打印。</p>
        <p> </p>
        <p><strong>4.	票价和税费</strong></p>
        <p><strong>4.1.	票价的适用</strong></p>
        <p>4.1.1.	票价指旅客由出发地机场至目的地机场的航空运输价格，不包括机场与市区之间或同一城市机场与机场之间的地面运输费用。</p>
        <p>4.1.2.	吉祥航空公布的票价，适用于直达航班运输。如旅客要求经停或转乘其他航班时，应按实际航段分段相加计算票价。</p>
        <p>4.1.3.	票价为旅客购买时所购航班适用的票价。吉祥航空在客票出售后调整票价，旅客已购客票的票价不作变动。</p>
        <p>4.1.4.	使用特种票价的旅客，应遵守该特种票价的适用条件。</p>
        <p><strong>4.2.	票款的交付</strong></p>
        <p>4.2.1.	旅客应按国家规定的货币和付款方式交付票款，除吉祥航空与旅客另有协议外，票款一律现付。</p>
        <p>4.2.2.	当收取的票款与适用的票价不符或计算有错误时，旅客应当补付不足的票款或由吉祥航空向其退还多收的票款。</p>
        <p>4.2.3.	客票价以人民币10元为计算单位，尾数一律四舍五入。吉祥航空收取或支付的任何其他费用均以吉祥航空的规定为准。</p>
        <p><strong>4.3.	革命伤残军人、因公致残的人民警察、儿童、婴儿票价</strong></p>
        <p>4.3.1.	革命伤残军人、因公致残的人民警察凭民政部颁发的《中华人民共和国革命伤残军人证》和《中华人民共和国人民警察伤残抚恤证》，按成人适用普通票价的50%购票。</p>
        <p>4.3.2.	儿童按成人适用普通票价的50%购买儿童票，并提供座位。</p>
        <p>4.3.3.	婴儿按成人适用普通票价的10%购买婴儿票，不提供座位；如需要单独占用座位时，应购买儿童票。每一成人旅客最多只能携带2名婴儿旅客，购票婴儿超过1名时，超过的人数须按儿童票价购票，吉祥航空提供座位。</p>
        <p><strong>4.4.	税费</strong></p>
        <p>4.4.1.	政府、有关当局或机场经营人规定的对旅客或由旅客享用的任何服务或设施而征收的税款或费用不包括在公布票价之内。该项税款或费用应由旅客支付。</p>
        <p>4.4.2.	燃油附加费和民航发展基金由吉祥航空根据国家相关规定收取。</p>
        <p> </p>
        <p><strong>5.	定座</strong></p>
        <p><strong>5.1.	定座基本要求</strong></p>
        <p>5.1.1.	定座只有在旅客按吉祥航空规定的手续和购票时限内交付票款，经吉祥航空或其销售代理人填开客票，并将该定座列入客票有关乘机联内交给旅客或以任何方式支付票款成功以后，才能认为座位已经定妥和有效。未经吉祥航空或其销售代理人记录认可，不得认为定座已确认。</p>
        <p>5.1.2.	按吉祥航空规定，特种票价可附有限制或排除旅客签转、更改、退票、取消定座权利的条件。</p>
        <p><strong>5.2.	合同单位定座</strong></p>
        <p>合同单位应按合同的约定定座。</p>
        <p><strong>5.3.	购票时限</strong></p>
        <p>已经定妥的座位，旅客应在吉祥航空规定或预先约定的时限内购买客票。否则，原定座位不予保留。</p>
        <p><strong>5.4.	个人资料</strong></p>
        <p>旅客认可其向吉祥航空提供的个人资料，旨在用于定座及安排相关运输服务。为此，旅客授权吉祥航空保留其个人资料且可将资料传送给吉祥航空的有关部门、其他相关承运人或此类服务的提供者。</p>
        <p><strong>5.5.	定座优先权</strong></p>
        <p>5.5.1.	吉祥航空有权优先安排重要旅客、抢险、抢救及吉祥航空认可的需优先安排的旅客的定座需求。</p>
        <p>5.5.2.	对于非自愿改变航程的旅客，在航班有可利用座位的条件下，可优先定座。</p>
        <p><strong>5.6.	取消定座</strong></p>
        <p>5.6.1.	旅客未在吉祥航空规定或预先约定的时限内购买客票，原定座位不予保留，包括始发航班座位、去程或回程航班座位。</p>
        <p>5.6.2.	旅客更改或者取消定座，应当在吉祥航空规定的时限内提出。票价附有限制条件的，旅客更改或者取消定座应当符合该限制条件的规定。</p>
        <p> </p>
        <p><strong>6.	购票</strong></p>
        <p><strong>6.1.	一般规定</strong></p>
        <p>6.1.1.	旅客可在吉祥航空或其销售代理人的售票处以及登陆吉祥航空官方网站（www.juneyaoair.com）购票。也可通过吉祥航空销售服务热线进行咨询和购票。吉祥航空销售服务热线：021-95520，吉祥航空会员热线：4007006000。</p>
        <p>6.1.2.	旅客购票须凭本人有效身份证件或公安机关出具的其他有效身份证件。</p>
        <p>6.1.3.	购买儿童票、婴儿票的旅客，应提供儿童、婴儿出生年月的有效证明。</p>
        <p>6.1.4.	每一成人旅客仅限购买1张婴儿票。每一成人旅客最多只能携带2名婴儿旅客，购票婴儿超过1名时，超过的人数须按儿童票价购票，吉祥航空提供座位。旅客须提前在购票环节向吉祥航空提出携带2名婴儿旅客的申请，以便吉祥航空提供机上保障服务。</p>
        <p>6.1.5.	患病旅客、孕妇（怀孕超过32周的）购票，应持二级（含）以上医院（或相当于该级别的医疗机构）出具的医生诊断证明，经吉祥航空同意后，方可购票。</p>
        <p>6.1.6.	每一位旅客应单独持有客票。</p>
        <p>6.2.	如旅客购买的是代码共享航班，在定座、购票时，吉祥航空及其销售代理人应告知旅客该航班的性质、销售承运人和实际承运人。</p>
        <p>6.3.	如旅客购买的是中转联乘航班，在定座、购票时，吉祥航空及其销售代理人应告知旅客中转航班衔接时间的规定。</p>
        <p>6.3.1.	纯国内同场中转航班不得少于2小时；</p>
        <p>6.3.2.	国内+国际同场中转航班不得少于3小时。</p>
        <p>6.4.	吉祥航空或其销售代理人应根据旅客的要求，出售单程、联程、来回程客票。</p>
        <p>6.5.	打印电子客票行程单最迟应在航班起飞后28天内致电吉祥航空销售服务热线021-95520。</p>
        <p> </p>
        <p><strong>7.	航班超售</strong></p>
        <p>7.1.	根据航班运输的惯例，吉祥航空可视情在某些容易出现座位虚耗的航班上进行适当的超售。航班超售时，吉祥航空将在旅客办理乘机手续前，告知旅客航班超售情况、补偿方案及旅客可享有的权利。</p>
        <p>7.2.	在超售情形下，对于弃乘的旅客，吉祥航空将给予合理的补偿并根据旅客的要求为其安排合适的航班或退票。</p>
        <p> </p>
        <p><strong>8.	乘机</strong></p>
        <p><strong>8.1.	一般规定</strong></p>
        <p>8.1.1.	各机场乘机登记截止时间不同，旅客应当在吉祥航空规定的时限内到达机场，凭本人有效身份证件及客票按时办理客票查验、托运行李、领取登机牌等乘机手续。</p>
        <p>8.1.2.	如旅客未能按时到达吉祥航空的的乘机柜台或登机口，或未出示其有效身份证件及运输凭证，为避免航班延误，吉祥航空有权取消该旅客已定妥的座位。</p>
        <p>8.1.3.	吉祥航空开始办理航班乘机手续的时间一般不迟于客票上列明的航班离站时间前90分钟，截止办理乘机手续时间为客票上列明的航班离站时间前45分钟，另有公示规定的除外（具体规定通过吉祥航空销售服务热线021-95520查询）。</p>
        <p>8.1.4.	吉祥航空及其地面服务代理人应按时开放办理乘机手续柜台，按规定接受旅客出具的客票，快速、准确地办理乘机手续。</p>
        <p><strong>8.2.	安全检查</strong></p>
        <p>乘机前，旅客及其非托运行李必须经过安全检查。</p>
        <p><strong>8.3.	旅客误机</strong></p>
        <p>旅客误机后要求改乘后续航班，在后续航班有空余座位的情况下，吉祥航空将积极予以安排并根据规定收取相应费用；旅客要求退票，吉祥航空可以按该客票的适用条件收取退票费。</p>
        <p><strong>8.4.	旅客漏乘</strong></p>
        <p>8.4.1.	由于旅客原因发生漏乘，按条件12.5“自愿退票”的规定办理。</p>
        <p>8.4.2.	由于吉祥航空原因造成旅客漏乘，吉祥航空将尽早安排旅客乘坐后续航班成行，如旅客要求退票，按本条件12.4“非自愿退票”的有关规定办理。</p>
        <p><strong>8.5.	旅客错乘</strong></p>
        <p>8.5.1.	旅客错乘飞机，如要求在错乘的到达站终止旅行，票款不补不退。</p>
        <p>8.5.2.	由于吉祥航空原因造成旅客错乘，吉祥航空将尽早安排错乘旅客搭乘后续航班飞往旅客客票上列明的目的地点，票款不补不退。如旅客要求退票，按本条件12.4“非自愿退票”的有关规定办理。</p>
        <p><strong>8.6.	机上座位安排</strong></p>
        <p>8.6.1.	吉祥航空除按旅客已经定妥的航班和舱位等级提供座位外，尽可能满足旅客对同等舱位等级座位的要求，但不保证提供旅客所指定的座位。</p>
        <p>8.6.2.	为了保证飞行安全，飞机应急出口处的座位将由吉祥航空指定安排。</p>
        <p>8.6.3.	出于运行、安全或安保的需要，吉祥航空保留分配或重新分配机上座位的权利，即使是在旅客登机或就座后。</p>
        <p><strong>8.7.	登机</strong></p>
        <p>8.7.1.	旅客应按照登机牌上的重要提示内容，在吉祥航空规定的时间内在登机口候机。</p>
        <p>8.7.2.	对于旅客未遵守本条件8.7.1的规定，未能在规定时间内至客舱门关闭时限内登机，吉祥航空将取消旅客的座位，也不承担旅客由此而产生的任何损失责任。</p>
        <p> </p>
        <p><strong>9.	行李运输</strong></p>
        <p><strong>9.1.	一般规定</strong></p>
        <p>9.1.1.	不得作为行李运输的物品</p>
        <p>9.1.1.1.	不符合本条件1.39关于“行李”定义的物品；</p>
        <p>9.1.1.2.	危险品（包括但不限于）</p>
        <p>（1） 爆炸品；</p>
        <p>（2） 气体、包括易燃气体、非易燃无毒气体、有毒气体；</p>
        <p>（3） 易燃液体；</p>
        <p>（4） 易燃固体、自燃物质和遇水释放易燃气体的物质；</p>
        <p>（5） 氧化剂和有机过氧化物；</p>
        <p>（6） 毒性物质和传染性物质；</p>
        <p>（7） 放射性物质；</p>
        <p>（8） 腐蚀性物质；</p>
        <p>（9） 磁性物质；</p>
        <p>（10）具有麻醉、令人不快或其他类似性质的物质；</p>
        <p>（11）容易污损飞机的物品；</p>
        <p>（12）锂含量>2克的锂电池或额定能量值>160Wh（瓦特小时）的锂离子电池；</p>
        <p>（13）吉祥航空规定不得作为行李运输的其他危险物品。</p>
        <p>9.1.1.3.	枪支，含各种类型仿真玩具枪、枪型打火机及其他各种类型带有攻击性的武器，但体育运动用器械除外。</p>
        <p>9.1.1.4.	军械、警械。</p>
        <p>9.1.1.5.	管制刀具。</p>
        <p>9.1.1.6.	活体动物，但符合本条件9.1.3.3规定的“服务犬”除外。</p>
        <p>9.1.1.7.	国家规定的其它禁运物品。</p>
        <p>9.1.2.	不得作为托运行李运输的物品</p>
        <p>下列物品不得作为托运行李或在托运行李中夹带，对托运行李中放置或夹带下述物品的遗失和损坏，吉祥航空按一般托运行李承担责任：</p>
        <p>9.1.2.1.	重要文件和资料；</p>
        <p>9.1.2.2.	包括但不限于货币、汇票等有价证劵；</p>
        <p>9.1.2.3.	珠宝、贵重金属（金、银等）及其制品；</p>
        <p>9.1.2.4.	古玩字画；</p>
        <p>9.1.2.5.	易碎和易损坏物品、易腐物品；</p>
        <p>9.1.2.6.	个人自用内含锂金属电池或锂离子电池的便携式电子设备。（锂电池的运输规定，详情参阅吉祥航空官方网站www.juneyaoair.com）</p>
        <p>9.1.2.7.	样品；</p>
        <p>9.1.2.8.	电子数码产品（包括但不限于各种相机、笔记本电脑）；</p>
        <p>9.1.2.9.	旅行证件；</p>
        <p>9.1.2.10.	其它需要专人照管的物品不得作为托运行李或夹入行李内托运的物品，在符合吉祥航空关于行李重量、体积限制的情况下，可作为非托运行李，由旅客带入客舱并自行保管。</p>
        <p>9.1.3.	限制运输的物品</p>
        <p>9.1.3.1.	精密仪器、电器等类物品，应作为货物托运，如按托运行李运输，必须有妥善包装，并且此类物品的重量不得计算在免费行李额内,按逾重行李费收取运费。</p>
        <p>9.1.3.2.	体育运动用器械，包括体育运动用枪支和弹药，必须出具枪支运输许可证或者国家体育行政部门的许可证明作为托运行李运输，枪支必须卸下子弹和扣上保险并妥善包装。</p>
        <p>9.1.3.3.	服务犬是指为残疾人生活和工作提供协助的特种犬，包括：辅助犬、导盲犬、助听犬。</p>
        <p>9.1.3.4.	外交信袋，机要文件。</p>
        <p>9.1.3.5.	旅客旅行途中使用的折叠轮椅或电动轮椅。</p>
        <p>9.1.3.6.	管制刀具以外的利器、钝器，例如菜刀、水果刀、餐刀、工艺品刀、手术刀、剪刀、镰刀、演出用刀、剑、矛，古董或者作为旅客纪念品的刀、剑以及钢锉、斧子、短棍、锤子等，不能随身携带，应放入托运行李内运输。</p>
        <p>9.1.3.7.	干冰、液态物品（包括酒类物品及含有酒精的饮料等）、旅客旅行途中所需的烟具、药品、化妆品等。液态物品的容积、容量应符合政府当局、吉祥航空及有关承运人、机场的限制要求，酒类物品含有酒精的饮料不得随身携带须作为托运行李运输。</p>
        <p>9.1.3.8.	额定能量值超过100Wh但不超过160Wh的锂电池。</p>
        <p>9.1.3.9.	医疗所需的气态氧或者空气小型钢瓶；旅客穿在身上供操作机械肢体用的小型二氧化碳气瓶；含有碳氢化合物的催化卷发器，每个旅客不能超过1个。</p>
        <p>9.1.3.10.	大型乐器等不适宜在航空器或舱内运输，且重量、体积超过非托运行李的限制规定的物品可单独付费，带入客舱占座，由旅客自行保管，并独自承担保管责任。</p>
        <p>9.1.3.11.	每位旅客手提行李中的液体、凝胶及喷雾类物品，均需容量不超过100毫升的容器承载，总量相加不超1升。</p>
        <p>9.1.3.12.	活体器官和血液制品，旅客须将物品妥善安置在座椅底下，自行保管，若重量、体积超过非托运行李的限制规定可单独付费，带入客舱占座，由旅客自行保管，并独自承担保管责任。</p>
        <p><strong>9.2.	托运行李</strong></p>
        <p>9.2.1.	行李一经向吉祥航空交运，吉祥航空为每件托运行李签发一张行李牌。（托运行李规定，详情参阅吉祥航空官方网站www.juneyaoair.com）</p>
        <p>9.2.2.	旅客应该在行李被收运之前贴上姓名或便于识别的其它个人标记。</p>
        <p>9.2.3.	托运行李将与旅客同机载运，如果在特殊情况下无法同机载运，吉祥航空将向旅客说明，并将托运行李改在下一航班运达。</p>
        <p>9.2.4.	托运行李要用行李箱或其它合适的容器包装，锁扣完好，捆扎牢固，能承受一定压力，以保证在正常的操作条件下安全装卸和运输；对于包装不符合要求的行李，吉祥航空可以拒绝作为托运行李收运或不承担损坏的赔偿责任。</p>
        <p>9.2.5.	托运行李每件重量不能超过50千克。体积不超过40×60×100厘米，体积超过上述规定的行李，须事先征得吉祥航空同意方能托运。</p>
        <p><strong>9.3.	非托运行李</strong></p>
        <p>9.3.1.	非托运行李每件重量不能超过5千克，体积不能超过20×40×55厘米。（免费随身携带物品规定，详情参阅吉祥航空官方网站www.juneyaoair.com）</p>
        <p>9.3.2.	带上飞机的行李，应能置于旅客的前排座位之下或客舱顶部行李架内，根据本条件9.3.1标准的判断认为是过大或过重的物品不得带入客舱。</p>
        <p>9.3.3.	持头等舱客票的旅客，每人可随身携带2件非托运行李；持经济舱客票的旅客，每人只能随身携带1件非托运行李。</p>
        <p>9.3.4.	超过上述重量、件数或体积限制的非托运行李，应作为托运行李托运。</p>
        <p>9.3.5.	超过100Wh但小于160Wh的锂离子电池或电池组，仅可作为非托运行李携带；每位旅客只能携带2块上述锂离子电池或电池组并做好符合民航局及吉祥航空安全运输要求的防护措施。</p>
        <p><strong>9.4.	免费行李额</strong></p>
        <p>9.4.1.	每位旅客的免费行李额：持成人或儿童票的头等舱旅客为40千克，经济舱旅客为20千克。持婴儿票的旅客，无免费行李额，每个婴儿可免费托运婴儿手推车1辆。（免费行李额规定，详情参阅吉祥航空官方网站www.juneyaoair.com）</p>
        <p>9.4.2.	搭乘同一航班前往同一目的地的两个（含）以上的同行旅客，如在同一时间、同一地点办理行李托运手续，其免费行李额可按各自的客票价等级标准合并计算。</p>
        <p>9.4.3.	旅客非自愿改变舱位等级，应按原舱位等级享受免费行李额。</p>
        <p>9.4.4.	构成国际运输的国内吉祥航空航段，每位旅客的免费行李额按适用的国际航线免费行李额计算。</p>
        <p>9.4.5.	残疾旅客辅助设备（包括但不仅限于轮椅、手杖、假肢）不计入免费行李额，可以额外免费运输。</p>
        <p><strong>9.5.	逾重行李费</strong></p>
        <p>9.5.1.	旅客的托运行李，超过该旅客免费行李额的部分，称为逾重行李，应支付逾重行李费。</p>
        <p>9.5.2.	收取逾重行李费，向旅客出具逾重行李票。</p>
        <p>9.5.3.	逾重行李费率：每千克按当日所适用的单程直达成人经济舱公布票价的1.5%，收费总金额以元为单位，尾数四舍五入。</p>
        <p><strong>9.6.	行李声明价值</strong></p>
        <p>9.6.1.	旅客的托运行李，每千克价值超过人民币100元时，可办理行李的声明价值。</p>
        <p>9.6.2.	托运行李的声明价值不能超过行李本身的实际价值。每一旅客的行李声明价值最高限额为人民币8,000元。如吉祥航空对声明价值有异议而旅客又拒绝接受检查时，吉祥航空有权拒绝收运。</p>
        <p>9.6.3.	吉祥航空按旅客声明的价值中超过本条件9.6.1规定限额部分的价值的5‰收取声明价值附加费。金额以元为单位，尾数四舍五入。</p>
        <p>9.6.4.	办理声明价值的行李不计入在免费行李额内。</p>
        <p>9.6.5.	旅客办理声明价值的托运行李仅限于整包行李。行李中的任何单个物品不得办理声明价值。</p>
        <p>9.6.6.	旅客非托运行李和占用座位的行李运输不办理声明价值。</p>
        <p><strong>9.7.	行李的收运</strong></p>
        <p>9.7.1.	拒绝运输权</p>
        <p>9.7.1.1.	旅客的托运行李、非托运行李，如属于或夹带有不得作为行李运输的物品，吉祥航空有权拒绝接受该行李的运输。</p>
        <p>9.7.1.2.	旅客的托运行李，如属于或夹带有不得作为行李运输的物品，吉祥航空有权拒绝接受该行李作为托运行李运输。</p>
        <p>9.7.1.3.	旅客携带了属于限制运输的物品，如旅客没有或拒绝遵守吉祥航空的限制运输条件，吉祥航空有权拒绝接受该物品的运输。</p>
        <p>9.7.1.4.	旅客的托运行李、非托运行李，如因其形态、包装、体积、重量或特性等原因不符合吉祥航空运输条件，吉祥航空应请旅客加以改善，如旅客不能或拒绝改善，吉祥航空有权拒绝接受该行李的运输。</p>
        <p>9.7.2.	检查权</p>
        <p>吉祥航空为了运输安全原因，可会同旅客对其行李进行检查；必要时，可会同有关部门进行检查。如旅客拒绝检查，吉祥航空有权拒绝接受该行李的运输。</p>
        <p>9.7.3.	收运要求</p>
        <p>9.7.3.1.	旅客必须凭有效客票托运行李。吉祥航空应在客票及行李票上填写托运行李的件数和重量，或者在行李识别联上填写托运行李的件数。</p>
        <p>9.7.3.2.	吉祥航空只在航班离站当日办理乘机手续时收运行李。</p>
        <p>9.7.3.3.	吉祥航空对旅客托运的每件行李应拴挂行李牌，并将其中的识别联交给旅客。</p>
        <p>9.7.3.4.	旅客托运有运输责任争议的行李时，吉祥航空应经旅客同意，拴挂免除责任行李牌，以免除吉祥航空相应的运输责任。</p>
        <p>9.7.4.	行李载运</p>
        <p>9.7.4.1.	旅客的托运行李，应与旅客同机运送，特殊情况下不能同机运送时，吉祥航空应向旅客说明，并优先安排在后续航班上运送。</p>
        <p>9.7.4.2.	旅客的逾重行李在飞机载量允许的条件下，应与旅客同机运送。如载量不允许，而旅客又拒绝使用后续可利用航班运送，吉祥航空可拒绝收运旅客的逾重行李。</p>
        <p>9.7.5.	小动物（本公司暂不承运小动物），但符合本条件9.1.3.3规定的“服务犬”除外。服务犬（辅助犬、导盲犬、助听犬）在符合吉祥航空运输条件的情况下，可以由具备乘机条件的行走不便的旅客、盲人旅客或聋人旅客本人带入客舱运输，应提供服务犬（辅助犬、导盲犬、助听犬）的身份和检疫证明，服务犬（辅助犬、导盲犬、助听犬）连同其容器和食物可以免费运输而不计算在免费行李额内。</p>
        <p>9.7.6.	外交信袋</p>
        <p>9.7.6.1.	外交信袋应由外交信使随身携带，自行照管。根据外交信使的要求，吉祥航空也可按托运行李办理，但吉祥航空只承担一般托运行李的责任。</p>
        <p>9.7.6.2.	外交信使携带的外交信袋和行李，可合并计重或计件，超过免费行李额部分，按逾重行李的规定办理。</p>
        <p>9.7.6.3.	外交信袋运输需占用座位时，旅客必须在定座时提出，经吉祥航空同意，方可予以运输。</p>
        <p>9.7.6.4.	占用每一座位的外交信袋的总重量不得超过75千克，总体积不得超过40×60×100厘米。占用座位的外交信袋没有免费行李额，运费按下列两种办法计算，取其高者：</p>
        <p>a)	根据占用座位的外交信袋实际重量，按逾重行李费率计算运费；</p>
        <p>b)	根据外交信袋占用的座位数，按运输起讫地点之间，与该外交信使所持客票票价等级相同的票价计算运费。</p>
        <p>9.7.6.5.	机要交通人员携带的机要文件，按本条的规定办理。</p>
        <p>9.7.7.	违章行李</p>
        <p>9.7.7.1.	在始发地发现违章行李，吉祥航空有权拒绝运输；如已承运，有权取消运输，或将违章夹带物品取出后运输，已收逾重行李费不退。</p>
        <p>9.7.7.2.	在经停地发现违章行李，应立即停运，已收逾重行李费不退。</p>
        <p>9.7.7.3.	对违章行李中夹带的国家规定的禁运物品、限制携带物品或危险物品，交有关部门处理。</p>
        <p>9.7.8.	行李退运</p>
        <p>9.7.8.1.	旅客在始发地要求退运行李，必须在行李装机前提出。如旅客退票，已收运的行李也必须同时退运。以上退运，均退还已收逾重行李费。</p>
        <p>9.7.8.2.	旅客在经停地退运行李，除时间不允许外，可予以办理。但未使用航段的已收逾重行李费不退。</p>
        <p>9.7.8.3.	办理声明价值的行李退运时，在始发地退还已交付的声明价值附加费，在经停地不退已交付的声明价值附加费。</p>
        <p>9.7.8.4.	由于吉祥航空的原因，需要安排旅客改乘其他航班，行李运输应随旅客作相应的变更，已收逾重行李费多退少不补；已交付的声明价值附加费不退。如安排旅客签转其他承运人的航班，应办理行李退运，退还已收逾重行李费和已交付的声明价值附加费。</p>
        <p><strong>9.8.	行李交付</strong></p>
        <p>9.8.1.	行李交付</p>
        <p>9.8.1.1.	旅客应在航班到达后立即在机场凭行李牌的识别联领取行李。必要时，应交验客票。</p>
        <p>9.8.1.2.	如旅客未立即领取行李，吉祥航空从行李到达的次日起向旅客收取行李保管费。对于旅客行李中的易腐物品，吉祥航空有权在行李到达24小时后予以处理。</p>
        <p>9.8.1.3.	吉祥航空凭行李牌的识别联交付行李，对于领取行李的人是否确系旅客本人，以及由此造成的损失及费用，不承担责任。</p>
        <p>9.8.1.4.	旅客行李延误到达后，吉祥航空应立即通知旅客领取，也可直接送达旅客。对延误行李不收取保管费。</p>
        <p>9.8.1.5.	旅客在领取行李时，未提出书面异议，应即认为该行李已经按运输合同完好交付。</p>
        <p>9.8.1.6.	旅客遗失行李牌的识别联，应立即向吉祥航空挂失。旅客如要求领取行李，应向吉祥航空提供足够的证明，并在领取行李时出具收据。如在声明挂失前行李已被冒领，吉祥航空不承担责任。</p>
        <p>9.8.2.	无法交付的行李</p>
        <p>行李自到达的次日起，超过90日还无人认领，吉祥航空可按无法交付行李的有关规定处理。</p>
        <p>9.8.3.	行李不正常运输的处理</p>
        <p>9.8.3.1.	行李运输发生延误、遗失或损坏，吉祥航空或其它地面服务代理人应会同旅客填写《行李运输事故记录》，尽快查明情况和原因，并将调查结果答复旅客和有关单位。如发生行李赔偿，可在始发地、经停地或目的地办理。</p>
        <p>9.8.3.2.	因吉祥航空原因使旅客的托运未能与旅客同机到达，造成旅客旅途生活的不便，应给予旅客临时生活用品补偿费，头等舱人民币200元/晚，经济舱100元/晚。</p>
        <p><strong>9.9.	行李赔偿</strong></p>
        <p>9.9.1.	吉祥航空的责任</p>
        <p>9.9.1.1.	旅客的托运行李因发生在航空运输期间的事件，造成延误、毁灭、遗失或者损坏的，吉祥航空应承担责任。</p>
        <p>9.9.1.2.	吉祥航空能够证明为了避免延误损失的发生已经采取一切必要措施或不可能采取措施的，不承担责任。</p>
        <p>9.9.1.3.	托运行李的损失完全是由于行李本身的自然属性、质量或缺陷造成的，吉祥航空不承担责任。</p>
        <p>9.9.1.4.	由于旅客行李内装物品造成该旅客伤害或其行李损失，吉祥航空不承担责任。由于旅客行李内装物品对他人造成伤害或对他人物品或吉祥航空财产造成损失，旅客应赔偿吉祥航空的所有损失和由此支付的一切费用。</p>
        <p>9.9.1.5.	对于旅客在托运行李内夹带的本条件9.1.2所列物品的丢失或损坏，只按一般托运行李承担赔偿责任。</p>
        <p>9.9.1.6.	在联程运输中，吉祥航空仅对发生在其承运的航线上的行李损失承担赔偿责任。</p>
        <p>9.9.2.	赔偿限额</p>
        <p>9.9.2.1.	旅客的托运行李全部或部分损坏、丢失，赔偿金额每公斤不超过人民币100元。如行李的价值每公斤低于100元时，按实际价值赔偿。</p>
        <p>9.9.2.2.	旅客丢失行李的重量按实际托运行李的重量计算，如无法确定丢失的行李重量，每一旅客的丢失行李最多只能按该旅客享受的免费行李额赔偿。</p>
        <p>9.9.2.3.	行李损坏时，按行李降低的价值赔偿或负担修理费用。行李箱损坏，赔偿金额按行李箱自身重量每公斤不超过人民币100元或负担相应的修理费用。</p>
        <p>9.9.2.4.	旅客的丢失行李如已办理行李声明价值，吉祥航空应按声明的价值赔偿。行李的声明价值高于实际价值时，应按实际价赔偿。</p>
        <p>9.9.2.5.	由于吉祥航空原因导致发生在上、下飞机期间或机上的事件造成旅客非托运行李灭失，吉祥航空承担的最高赔偿金额每位旅客不超过人民币3,000元。</p>
        <p>9.9.2.6.	行李赔偿时，对赔偿行李收取的逾重行李费应退还，已收取的声明价值附加费不退。</p>
        <p>9.9.2.7.	构成国际运输的国内航段，行李赔偿按适用的国际运输行李赔偿规定办理。</p>
        <p>9.9.2.8.	已赔偿的丢失行李找到后，吉祥航空应尽快通知旅客。旅客可将自己的行李领回，退还全部赔偿，临时生活用品补偿费不退。发现旅客有明显的欺诈行为，吉祥航空有权追回全部赔偿。</p>
        <p>9.9.3.	赔偿要求</p>
        <p>旅客的托运行李丢失或损坏，应按本条件9.9.4.规定的期限向吉祥航空或其地面服务代理人提出赔偿要求，并随附登机牌或身份证/护照复印件、行李牌的识别联、《行李运输事故记录》、证明行李内容和价格的凭证以及其他有关的证明。</p>
        <p>9.9.4.	索赔和诉讼期限</p>
        <p>托运行李发生损失的，如有索赔要求，有权提出索赔的人应在发现损失后向吉祥航空书面提出异议。托运行李发生损失的，至迟应自收到托运行李之日起七日内提出；托运行李发生延误的，至迟应自托运行李交付旅客处置之日起二十一日内提出，否则就不能向吉祥航空提出索赔诉讼。</p>
        <p> </p>
        <p><strong>10.	班期时刻、取消及变更</strong></p>
        <p><strong>10.1.	班期时刻</strong></p>
        <p>10.1.1.	吉祥航空尽力按照在旅行之日公布的航班时刻，合理地运输旅客及其行李。吉祥航空在接受旅客的定座或购票时，将告知旅客航班时刻，并在旅客的客票上列明。在客票售出后，吉祥航空可能会更改航班时刻。吉祥航空将根据旅客提供的有效联系方式通知旅客航班时刻的变更。旅客不能接受吉祥航空对航班时刻做出变更、并且吉祥航空无法为旅客安排其可以接受的替代航班，旅客可按照本条件12.4“非自愿退票”的规定办理退票。</p>
        <p>10.1.2.	航班时刻表或其它地方所显示的航班时刻或机型，仅是预定的时间和机型而非确定的时间和机型，该航班时刻或机型不构成吉祥航空与旅客之间运输合同的组成部分。</p>
        <p>10.1.3.	除非损害是由于吉祥航空的故意或明知可能造成损失而轻率地作为或不作为所造成的，吉祥航空对航班时刻表或其它公布的班期中的差错或遗漏不承担责任。吉祥航空对其雇员、代理人或吉祥航空的代表就始发或到达时间、日期或任何航班飞行所作的说明，仅作为旅客的参考。</p>
        <p><strong>10.2.	航班取消与变更</strong></p>
        <p>有下列情形之一的，吉祥航空可按规定不经事先通知改变机型或航线、取消、中断、推迟或延期航班飞行，并按照本条件10.3规定办理：</p>
        <p>10.2.1.	为遵守国家的法律、行政法规、规章、命令或要求。</p>
        <p>10.2.2.	为保证飞行安全。</p>
        <p>10.2.3.	吉祥航空无法控制或不能预见的其它原因。</p>
        <p>10.3.	由于本条件10.2“航班取消与变更”原因之一，吉祥航空取消或延误航班，未能向旅客提供已定妥的座位（包括舱位等级），或未能在旅客的中途分程地点或目的地点停留，或造成旅客已妥座位的航班衔接错失，吉祥航空将考虑旅客的合理要求并采取以下措施之一供旅客选择：</p>
        <p>10.3.1.	为旅客安排有可利用座位的吉祥航空后续直达航班，或延长旅客的客票有效期；</p>
        <p>10.3.2.	征得旅客及被签转承运人同意后，签转给其它承运人；</p>
        <p>10.3.3.	变更原客票列明的航程，安排吉祥航空航班将旅客运输至目的地或中途分程地点，票款、逾重行李费的差额多退少不补；</p>
        <p>10.3.4.	按本条件12.4“非自愿退票”的规定办理。</p>
        <p>10.4.	如果发生本条件10.2所规定的任何情形，10.3.1至10.3.4所列的补救措施，是供旅客选择的全部措施，但不排除旅客根据适用法律和本条件的规定，要求吉祥航空承担其它责任。</p>
        <p>10.5.	吉祥航空将采取一切必要的措施来避免旅客以及旅客的行李延误。如吉祥航空已经采取了一切必要的措施或不可能采取该措施的，吉祥航空不承担责任。</p>
        <p>10.6.	吉祥航空可以根据其合理判断或经营所需变更或取消客票或时刻表中标明的经停地点，以及在无须事先通知的情况下替换其它的承运人或飞机。</p>
        <p>10.7.	如果出现非吉祥航空原因造成减载，吉祥航空将依据其合理判断拒绝运输部分旅客或物品。在这种情况下，吉祥航空将依据吉祥航空规定对上述旅客提供后续承运服务、客票变更或退款，但不再承担其它责任。</p>
        <p> </p>
        <p><strong>11.	拒绝运输和限制运输</strong></p>
        <p><strong>11.1.	拒绝运输</strong></p>
        <p>吉祥航空出于安全原因或根据自己合理的判断，认为属下列情形之一时，有权拒绝运输旅客及其行李：</p>
        <p>11.1.1.	为遵守国家的有关法律、政府规定和命令；</p>
        <p>11.1.2.	旅客的行为、年龄、精神或身体状况不适合航空旅行，或对其自身或其他人员或财产可能造成任何危险或危害；</p>
        <p>11.1.3.	旅客不遵守吉祥航空的规定，或不听从吉祥航空工作人员安排和劝导；</p>
        <p>11.1.4.	旅客拒绝接受安全检查；</p>
        <p>11.1.5.	旅客未支付适用的票价、费用以及未承兑其与吉祥航空之间的信用安排；</p>
        <p>11.1.6.	旅客未能出示本人的有效身份证件，或旅客出示的有效身份证件与旅客购买电子客票时使用的不是同一证件；</p>
        <p>11.1.7.	旅客未按照客票顺序使用乘机联；</p>
        <p>11.1.8.	旅客未能出示有效客票，包括：</p>
        <p>11.1.8.1.	客票是非法取得或其客票不是从吉祥航空或其销售代理人处所购；</p>
        <p>11.1.8.2.	客票已办理申请挂失；</p>
        <p>11.1.8.3.	客票是伪造的；</p>
        <p>11.1.8.4.	乘机联没有经过吉祥航空或其销售代理人而被更改、涂改，或已被损毁；</p>
        <p>11.1.8.5.	客票持有人不能证明本人即是客票上“旅客姓名栏”内所列明的人。</p>
        <p><strong>11.2.	限制运输</strong></p>
        <p>11.2.1.	婴儿、无成人陪伴儿童、患病旅客、残疾人旅客、孕妇或犯人（含犯罪嫌疑人）等需要给予特殊礼遇和照顾的旅客，或由于其身体和精神状况需要给予特殊照料的旅客，只有在符合吉祥航空及有关承运人规定的条件下，经吉祥航空及有关承运人预先同意并在必要时做出安排后方予以承运。（以上限制运输的旅客可致电吉祥航空销售服务热线：021-95520咨询和申请。）</p>
        <p>11.2.2.	限制运输旅客的数量，出于安全的考虑，吉祥航空对每一航班限制运输旅客的数量进行相应的控制。</p>
        <p> </p>
        <p><strong>12.	退票</strong></p>
        <p><strong>12.1.	一般规定</strong></p>
        <p>12.1.1.	由于吉祥航空未能按照运输合同提供运输或旅客自愿改变其旅行安排，对旅客未能使用的全部或部分吉祥航空客票，应按吉祥航空规定办理退票。</p>
        <p>12.1.2.	旅客要求退票，除遗失客票的情况外，必须凭纸质客票全部未使用的乘机联和旅客联。电子客票未使用航段的乘机联客票状态应为“OPEN FOR USE”（即有效的开放使用状态）。已打印了“行程单”的旅客必须凭“行程单”办理退票。旅客退票时应持本人购票时的有效身份证原件。委托他人办理退票手续的，受托人应携带委托书、客票所列明的乘机人的有效身份证件及客票、受托人的有效证件。</p>
        <p>12.1.3.	吉祥航空将票款退给持有客票未使用全部乘机联、旅客联或已打印的“行程单”并符合本条件12.1.2规定之对象，视作正式退票，吉祥航空与旅客的运输合同关系随即解除。。</p>
        <p>12.1.4.	遗失纸质客票退款</p>
        <p>在客票全部或部分遗失的情形下，如果旅客在吉祥航空规定的时限内提供了遗失证明并支付了所有适用的费用，且满足了以下全部条件后，吉祥航空将在客票有效期满后将票款退还给旅客：</p>
        <p>12.1.4.1.	吉祥航空已经收到了遗失客票的票款。</p>
        <p>12.1.4.2.	在退款之前遗失客票未被使用和退款，而且吉祥航空没有在旅客未另行支付票价的情形下为其补开新客票。</p>
        <p>12.1.4.3.	旅客须填写吉祥航空的《遗失客票补发申请书》。</p>
        <p>12.1.4.4.	旅客须声明同意赔偿可能由此造成吉祥航空的一切损失，包括已经或今后被他人冒用或冒退以及必要的诉讼费用。</p>
        <p>12.1.4.5.	旅客客票遗失被他人冒用、冒退或者补票是由于吉祥航空过失造成的情况除外。</p>
        <p><strong>12.2.	退票期限</strong></p>
        <p>旅客要求退票，应在旅行之日起（客票第一段未使用的，从客票填开之日起）十三个月内提出，逾期吉祥航空不予办理。</p>
        <p><strong>12.4.	非自愿退票</strong></p>
        <p>由于本条件3.3.1所列任何一个原因导致旅客要求退票的，则：</p>
        <p>12.4.1.	客票全部未使用，退还全部票款及税费，免收退票手续费；</p>
        <p>12.4.2.	客票部分未使用，应从全部票款中，扣除已使用航段的适用票价，将其余额与未使用航段的票价比较，取其高者退还旅客，但不得超过原票价总额，未使用的税费退还旅客，免收退票手续费；</p>
        <p>12.4.3.	航班如在非客票所列经停地的其他航站降落，旅客要求退票，应退还由降落站至到达站的票款，但不得超过原付票款金额，不收取退票费。如旅客所付票价为折扣票价，应按相同折扣率计算退票款，如果降落站至到达站没有公布票价，则退还降落站至到达站之间火车（动车、高铁）二等座票价水平的票款。</p>
        <p>12.4.4.	旅客自愿变更航班并支付变更费用后，其所变更的航班发生不正常时，旅客要求退票，不收退票费，但已付变更费用不退。</p>
        <p><strong>12.5.	自愿退票</strong></p>
        <p>旅客自愿要求退票，按吉祥航空现行《国内票价级别及使用规定（退票）》（详情参阅吉祥航空官方网站www.juneyaoair.com）规定办理。</p>
        <p>12.5.1.	客票全部未使用，扣除退票手续费后，退还剩余票款及税费；</p>
        <p>12.5.2.	客票已部分使用，扣除已使用航段的适用票价、相关税费和退票手续费，将余额退还旅客；</p>
        <p>12.5.3.	若已使用航段的适用票价与全程票价相比后，已使用航段的适用票价大于或等于全程票价时，未使用航段票款不退，其中未使用航段的可退税费退还旅客。</p>
        <p><strong>12.6.	退票手续费</strong></p>
        <p>12.6.1.	吉祥航空可向旅客收取退票手续费。旅客退票，吉祥航空按本条件12.5“自愿退票”规定向旅客收取各航段的退票手续费。</p>
        <p>12.6.2.	下列情形免收退票手续费：</p>
        <p>12.6.2.1.	持革命伤残军人和因公致残人民警察票价客票的旅客要求退票，免收退票手续费；</p>
        <p>12.6.2.2.	持婴儿客票及儿童客票的旅客要求退票，免收退票手续费；</p>
        <p>12.6.2.3.	旅客因病要求退票，需提供二级（含）以上医院（或相当于该级别的医疗机构）出具的医生诊断证明，免收退票手续费。患病旅客的陪伴人员要求退票，应与患病旅客同时办理退票手续，免收退票手续费。每一患病旅客最多可申请办理2名陪伴人员的免手续费退票。</p>
        <p><strong>12.7.	拒绝退票</strong></p>
        <p>12.7.1.	旅客在航班的经停地自动终止旅行，该航班未使用航段的票款不退。</p>
        <p>12.7.2.	客票注明不得退票或无余额可退的客票，税费可单独退还。</p>
        <p>12.7.3.	对于伪造、仿造的客票，吉祥航空保留收存的权利，并且不予退票、退款。</p>
        <p> </p>
        <p><strong>13.	 客票变更</strong></p>
        <p><strong>13.1.	非自愿变更</strong></p>
        <p>13.1.1.	乘坐吉祥航空航班的旅客，由于天气、空中交通管制等无法控制或不能预见的非吉祥航空原因以致航班取消、提前、延误、航班改变、衔接错失或不能提供旅客原已定妥的座位，吉祥航空应当考虑旅客的合理需要并采取以下措施之一：</p>
        <p>13.1.1.1.	为旅客优先安排有可利用座位的吉祥航空航班；</p>
        <p>13.1.1.2.	征得旅客及有关承运人的同意后，办理签转手续；</p>
        <p>13.1.1.3.	变更原客票列明的航程，安排吉祥航空航班，将旅客运达目的地或中途分程地点，票款和逾重行李费的差额多退少不补，因此产生的额外税费差额和地面运输费用及其它服务费用，旅客自理。</p>
        <p>13.1.2.	乘坐吉祥航空航班的旅客，由于机务维护、航班调配等吉祥航空原因以致航班取消、提前、延误、航班改变、衔接错失或不能提供旅客原已定妥的座位，吉祥航空应当考虑旅客的合理需要并采取以下措施之一：</p>
        <p>13.1.2.1.	为旅客优先安排有可利用座位的吉祥航空航班；</p>
        <p>13.1.2.2.	征得旅客及有关承运人的同意后，办理签转手续；</p>
        <p>13.1.2.3.	变更原客票列明的航程，安排吉祥航空或其他承运人航班，   或双方认可的其它运输方式，将旅客运达目的地或中途分程地点，票款和逾重行李费的差额多退少不补。</p>
        <p>13.1.3.	如吉祥航空航班变动，旅客仅限对原航班前后三日内的航班提出申请及变更。</p>
        <p><strong>13.2.	自愿变更</strong></p>
        <p>13.2.1.	自愿改变舱位等级</p>
        <p>旅客购票后，如要求改变舱位等级或运价发生变化，吉祥航空及其销售代理人应在航班有可利用座位和时间允许的条件下予以办理。如从较低运价改为较高运价，需向旅客收取票价价差变更费。如从较高票价改为较低运价，可先按自愿退票办理，后重新购票。</p>
        <p>13.2.2.	自愿改变航班/日期 </p>
        <p>旅客购票后，如要求改变航班和日期，应按照现行《国内票价级别及使用规定（变更）》规定办理。（详情参阅吉祥航空官方网站www.juneyaoair.com）</p>
        <p>13.2.3.	旅客购票后欲改变航程或乘机人，原票均按本条件12.5“自愿退票”规定办理退票，根据新航程或新乘机人姓名重新购票。</p>
        <p>13.2.4.	变更费的费率以退座时间计算。</p>
        <p>13.2.5.	电子客票出票后原则上不允许变更旅客的身份信息。</p>
        <p> </p>
        <p><strong>14.	 客票签转</strong></p>
        <p><strong>14.1.	非自愿签转</strong></p>
        <p>航班取消、延误、航程改变或不能提供原定座位时，吉祥航空应优先安排旅客乘坐吉祥航空后续航班。除吉祥航空另有规定外，在征得旅客及有关承运人同意后，可办理签转手续。</p>
        <p><strong>14.2.	自愿签转</strong></p>
        <p>14.2.1.	如旅客所持吉祥航空客票或含吉祥航空运输航段的非吉祥航空出具  的客票，因自身原因要求更改航段原定承运人，在客票适用条件允许的情况下，经吉祥航空同意后，可为旅客办理签转手续，签转仅限于与吉祥航空有结算协议的航空运输企业航班的相同等级舱位。</p>
        <p>14.2.1.1.	旅客使用的票价无签转限制；</p>
        <p>14.2.1.2.	旅客的客票未改变过航班、日期、舱位等级；</p>
        <p>14.2.1.3.	所签转的承运人与吉祥航空有票证结算关系且所签转的承运人航班有相应服务等级可利用座位。</p>
        <p>14.2.2.	若接收签转的承运人票价与吉祥航空票价不一致，产生的票款差价多退少补。</p>
        <p>14.2.3.	凡不符合本条件14.2.1、14.2.2规定的旅客要求改变承运人，一律按本条件12.5“自愿退票”的规定办理。</p>
        <p>14.2.4.	吉祥航空的销售代理人未经特别授权不得为旅客办理签转手续。</p>
        <p> </p>
        <p><strong>15.	 旅客服务</strong></p>
        <p><strong>15.1.	一般服务</strong></p>
        <p>15.1.1.	吉祥航空应以保证飞机安全和航班正常，提供优质服务为准则，以文明礼貌、热情周到的服务态度，认真完成空中和地面的旅客运输的各项服务工作。</p>
        <p>15.1.2.	吉祥航空不负责为旅客提供机场区域内、机场与市区之间或在同一城市的机场与机场之间的地面运输。对于此项地面运输服务提供者的行为或疏忽，或吉祥航空、销售代理人为旅客取得此项地面运输服务给予的任何帮助，吉祥航空不承担责任。</p>
        <p>15.1.3.	旅客在联程航班衔接地点的地面膳宿费用，应由旅客自理。</p>
        <p>15.1.4.	在航空运输过程中，旅客发生疾病时，吉祥航空将积极采取措施，尽力救护。</p>
        <p>15.1.5.	空中飞行过程中，吉祥航空应按其规定向旅客免费提供饮料或餐食。旅客要求提供超过规定的其他服务，吉祥航空可收取相应的费用。</p>
        <p>15.1.6.	航班延误或取消时，吉祥航空以及地面服务代理人将及时把航班延误或取消等信息通知旅客。</p>
        <p> </p>
        <p><strong>16.	飞机上的行为</strong></p>
        <p>16.1.	如果旅客在飞机上有下列行为之一，机长可采取其认为必要的措施，包括对该旅客实施管束，或在任何地点要求旅客下机，以阻止这种行为（包括但不限于）：</p>
        <p>16.1.1.	危及到飞机或飞机上任何人或财产的安全；</p>
        <p>16.1.2.	妨碍机组人员履行职责；</p>
        <p>16.1.3.	不听从机组的安排和劝导；</p>
        <p>16.1.4.	包括但不限于吸烟、酗酒或吸食毒品；</p>
        <p>16.1.5.	行为对其他旅客造成或有可能造成不适、不便、损害或者伤害、被其他旅客正当反对。</p>
        <p><strong>16.2.	电子设备</strong></p>
        <p>旅客不得在飞机上使用移动电话、对讲机、遥控玩具和其他带遥控装置的电子设备以及有关部门和吉祥航空认定干扰飞机安全运行的其他无线电发射装置。未经吉祥航空允许，旅客不得在飞机上使用除助听器和心脏起搏器以外的任何电子设备。飞行途中禁止使用移动电源，严禁携带额定能量160Wh（瓦特小时）的移动电源登机。</p>
        <p><strong>16.3.	航班禁烟</strong></p>
        <p>吉祥航空所有的航班均已禁烟，机上所有区域均不允许吸烟。</p>
        <p><strong>16.4.	酒类</strong></p>
        <p>飞机上，除吉祥航空供应的含酒精饮料外，不得饮用其他含酒精饮料。</p>
        <p><strong>16.5.	安全带</strong></p>
        <p>当旅客在机上就座时，应按要求系好安全带。</p>
        <p> </p>
        <p><strong>17.	 延误处置</strong></p>
        <p><strong>17.1.	航班出港延误旅客服务</strong></p>
        <p>17.1.1.	吉祥航空应当在掌握航班状态发生变化之后的30分钟内通过公共信息平台、官方网站、呼叫中心、短信、电话、广播等方式，及时、准确地向旅客发布航班出港延误或者取消信息，包括航班出港延误或者取消原因及航班动态。</p>
        <p>17.1.2.	航班出港延误或者取消时，应当根据本条件、客票使用条件，为旅客妥善办理退票或者改签手续。</p>
        <p>17.1.3.	发生航班出港延误或者取消后，吉祥航空或其地面服务代理人应当按照下列情形为旅客提供食宿服务：</p>
        <p>17.1.3.1.	由于机务维护、航班调配、机组等吉祥航空自身原因，造成航班在始发地出港延误或者取消，吉祥航空应当向旅客提供餐食或者住宿等服务。</p>
        <p>17.1.3.2.	由于天气、突发事件、空中交通管制、安检以及旅客等非吉祥航空原因，造成航班在始发地出港延误或者取消，吉祥航空应当协助旅客安排餐食和住宿，费用由旅客自理。</p>
        <p>17.1.3.3.	国内航班在经停地延误或者取消，无论何种原因，吉祥航空均应当向经停旅客提供餐食或者住宿服务。</p>
        <p>17.1.3.4.	国内航班发生备降，无论何种原因，吉祥航空均应当向备降旅客提供餐食或者住宿服务。</p>
        <p>17.1.4.	在航班出港延误或者取消时，吉祥航空应当优先为残疾人、老年人、孕妇、无成人陪伴儿童等需特别照料的旅客提供服务。</p>
        <p><strong>17.2.	机上延误处置</strong></p>
        <p>17.2.1.	发生机上延误后，吉祥航空应当每30分钟向旅客通告延误原因、预计延误时间等航班动态信息。</p>
        <p>17.2.2.	机上延误期间，在不影响航空安全的前提下，吉祥航空应当保证盥洗设备的正常使用。</p>
        <p>17.2.3.	机上延误超过2小时（含）的，应当为机上旅客提供饮用水和食品。</p>
        <p>17.2.4.	机上延误超过3个小时（含）且无明确起飞时间的，吉祥航空应当在不违反航空安全、安全保卫规定的情况下，安排旅客下飞机等待。</p>
        <p> </p>
        <p><strong>18.	 延误补偿</strong></p>
        <p><strong>18.1.	适用范围</strong></p>
        <p>18.1.1.	因吉祥航空原因与非吉祥航空原因造成航班延误给予旅客服务或经济补偿。</p>
        <p>18.1.1.1.	吉祥航空原因是指机务维护、航班调配、机组等吉祥航空自身原因。因吉祥航空原因造成延误4小时（含）以内，给予服务补偿；因吉祥航空原因延误超过4小时以上的，除给予服务补偿外，还给予经济补偿。</p>
        <p>18.1.1.2.	非吉祥航空原因指由于天气、突发事件、空中交通管制、安检、旅客或公共安全原因。因非吉祥航空原因造成的延误给予服务补偿。</p>
        <p>18.1.2.	持吉祥航空会员积分兑换机票的旅客在此补偿范围内。 </p>
        <p>18.1.3.	持吉祥航空免/折票的旅客不在经济补偿范围内。</p>
        <p><strong>18.2.	航班延误补偿标准（详见附录1）</strong></p>
        <p> </p>
        <p><strong>19.	 旅客投诉管理</strong></p>
        <p>19.1.	吉祥航空投诉受理电话：021-95520按“5”；</p>
        <p>19.2.	吉祥航空投诉受理电子邮箱：customercare@juneyao.com； </p>
        <p>19.3.	吉祥航空在收到旅客投诉7日内予以处理并告知旅客受理情况。</p>
        <p> </p>
        <p><strong>19.	 旅客投诉管理</strong></p>
        <p>(三)逾重行李费率以每公斤按逾重行李票填开当日所适用的单程直达经济舱正常票价的1.5％计算，以人民币分为单位。收费总金额以元为单位，尾数四舍五入。</p>
        <p> </p>
        <p><strong>20.	 行政手续</strong></p>
        <p>20.1.	旅客必须遵守中华人民共和国的法律、法规、规章、政府规定、命令、要求及旅行条件的各项规定，并应服从政府或机场管理和吉祥航空的任何安全检查。</p>
        <p>20.2.	旅客应出示国家的法律、法规、规章、政府规定、命令、要求或旅行条件所要求的有效证件。吉祥航空对未遵守国家法律、法规、规章、规定、命令的旅客，或旅行条件、证件不符合要求的旅客，保留拒绝载运的权利。</p>
        <p>20.3.	政府有关主管部门检查旅客的托运行李或非托运行李时，旅客应到场。对旅客未到场而发生的任何损失，吉祥航空不承担责任。</p>
        <p> </p>
        <p><strong>21.	连续承运人</strong></p>
        <p>吉祥航空以及其他承运人依据一个合约或者连续票号履行的运输，或吉祥航空与代码共享航班所属承运人依据一个合约或者连续票号履行的运输，视为一项不可分割的运输，除法律有特别规定外，客票上所列的各承运人对旅客的运输责任受各自运输条件的约束。</p>
        <p> </p>
        <p><strong>22.	损失责任及赔偿限额</strong></p>
        <p><strong>22.1.	损失责任</strong></p>
        <p>22.1.1.	吉祥航空应对发生在其承运的航线上的损失承担责任。吉祥航空为其他承运人航线上填开客票或办理行李托运时，只作为该其他承运人的代理人。尽管如此，旅客享有对其托运行李向第一或最后承运人诉讼的权利。</p>
        <p>22.1.2.	吉祥航空为遵守或旅客未遵守国家法律、政府规定、命令和要求而引起的任何损失，吉祥航空不应承担责任。</p>
        <p>22.1.3.	吉祥航空的责任，应不超过经证明损失的数额。吉祥航空对间接的或随之引发的损失不承担责任。</p>
        <p>22.1.4.	旅客在运输中由于其年龄、精神或身体状况，对本人形成危害和危险，由此造成或加重其本人的任何疾病、受伤、残废或死亡，吉祥航空不承担责任。</p>
        <p>22.1.5.	吉祥航空责任的任何免除或限制适用于并有利于吉祥航空的代理人、雇员和代表以及将飞机提供给吉祥航空使用的任何人及其代理人、雇员和代表。吉祥航空和上述代理人、雇员、代表以及任何人可支付的赔偿总额，不得超过吉祥航空的责任限额。</p>
        <p>22.1.6.	以上明确规定的各项，不排除公约或适用法律规定的吉祥航空责任的任何免除和限制。</p>
        <p><strong>22.2.	赔偿限额</strong></p>
        <p>22.2.1.	吉祥航空对旅客的运输责任受本运输条件约束,与旅客航程有关的其它承运人对旅客的运输责任受其各自的运输条件约束。</p>
        <p>22.2.2.	吉祥航空仅对在客票承运人一栏中填有吉祥航空的航空公司代码的航班或航段在运输过程中导致的损害承担责任。如吉祥航空为其它承运人的运输出具客票或办理托运行李,仅作为该承运人的代理人为上述行为。但是,对于托运行李,旅客可向客票或行李票上列明的第一或最后承运人索赔。</p>
        <p>22.2.3.	对于因吉祥航空遵守适用的法律、政府规则和规定或由于旅客不遵守上述法律、政府规则和规定而给旅客造成的损害,吉祥航空不承担责任。</p>
        <p>22.2.4.	除本条件另有规定外,按相关的规定,吉祥航空对旅客可补偿的损害仅限于经证实的损失和费用。</p>
        <p>22.2.5.	如损害是由于旅客的过失造成或促成的,应按适用的法律,相应免除或减轻吉祥航空对损失承担的责任。</p>
        <p>22.2.6.	吉祥航空的运输合同,包括本条件以及免除或限制责任的条款,同样适用于吉祥航空的授权代理人和受雇人。在任何情况下,从吉祥航空及吉祥航空的授权代理人和受雇人获取的赔偿总额不得超过吉祥航空的责任限额。除非有明确规定,本条件不应使吉祥航空放弃适用根据公约或适用法律的任何免除或限制责任的规定。</p>
        <p>22.2.7.	吉祥航空对因旅客的身体状况引起或加重的任何疾病、受伤或致残,包括死亡,不承担责任。</p>
        <p>22.2.8.	吉祥航空对因旅客的行李或内装物品导致的任何损害不承担责任。旅客的行李或内装物品对他人、他人的财产包括其它行李或其内装物品和吉祥航空的财产造成损害的,旅客应承担责任。</p>
        <p>22.2.9.	吉祥航空对于根据本条件9.1.2条所规定的不允许放在托运行李中的物品,无论其损害如何,均不承担责任。</p>
        <p>22.2.10.	吉祥航空对每名旅客死亡、受伤的赔偿责任限额按照国家现行有效的法律、法规、规章的规定执行。</p>
        <p> </p>
        <p><strong>23.	生效与修改</strong></p>
        <p>23.1.	本条件自发布之日起生效并实施。2008年6月1日实施的《上海吉祥航空股份有限公司旅客、行李国内运输条件》同时废止。</p>
        <p>23.2.	吉祥航空有权按中国民用航空总局规定的程序，不经通知修改其运输条件、运输规定、票价和费用标准。但此类修改不适用于修改前已经开始的运输。吉祥航空的工作人员、销售代理人或雇员都无权更改或违反吉祥航空适用的运输条件、运输规定、票价和费用标准。</p>
        <p>23.3.	本条件解释权属于上海吉祥航空股份有限公司。</p>
        <p>承运人名称: 上海吉祥航空股份有限公司</p>
        <p>名称缩写: HO</p>
        <p>附录1：航班延误补偿标准</p>
        <table>
          <tr>
            <td>延误原因</td>
            <td>延误时间</td>
            <td>地面服务补偿标准</td>
            <td>机上服务补偿标准</td>
            <td>经济补偿标准</td>
          </tr>
          <tr>
            <td>航空公司原因延误</td>
            <td>4小时以内（含4小时）</td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 航班预计延误2（含）至4（含）小时，为旅客提供点心、饮料；在用餐时间（早餐7：00-9：00；中餐11：00-13：00；晚餐17：00-19：00）供应餐食；<br>
                √ 根据旅客需要，免费为旅客办理签转或退票手续； <br>
                √ 根据旅客要求，出具航班延误或取消书面证明。<br>
            </td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 机上延误超过2小时（含）为旅客提供饮用水与食品；<br>
                √ 机上延误超过3小时（含）且无明确起飞时间的，在不违反航空安全、安全保卫规定的情况下，安排旅客下机等待。
            </td>
            <td>无</td>
          </tr>
          <tr>
            <td>航空公司原因延误</td>
            <td>4小时及以上</td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 航班在始发地延误超过4小时以上或取消，免费为旅客安排餐食或住宿服务；<br>
                √ 国内航班在经停地延误超过4小时以上或取消，免费向经停旅客提供餐食或住宿服务；<br>
                √ 国内航班在备降情况下，免费向旅客提供餐食或住宿服务；<br>
                √ 航班在始发地延误超过4小时以上，为旅客提供点心、饮料），在用餐时间（早餐7：00-9：00；中餐11：00-13：00；晚餐17：00-19：00）供应餐食； <br>
                √ 中转联程航班（承运人均为吉祥航空），因始发站航班取消、延误产生的错失衔接航班的旅客，始发站工作人员积极予以协助中转；<br>
                √ 根据旅客需要，免费为旅客办理签转或退票手续；<br>
                √ 根据旅客要求，出具航班延误或取消书面证
            </td>
            <td>
            </td>
            <td>经济补偿方式有两种，根据旅客需要任选一种执行：<br>
                （1） 延误4小时- 6小时（含）<br>
                a. 现金：200 元；<br>
                b. 与相应补偿现金等值的会员积分补偿（即200分）；<br>
                （2）延误6 - 8小时（含）<br>
                a. 现金：300 元；<br>
                b. 与相应补偿现金等值的会员积分补偿（即300分）；<br>
                （3）延误8小时以上<br>
                a. 现金：400 元；<br>
                b. 与相应补偿现金等值的会员积分补偿（即400分）；<br>
            </td>
          </tr>
        </table>
        <table style="margin-top: 1rem;">
          <tr>
            <td>延误原因</td>
            <td>延误时间</td>
            <td>地面服务补偿标准</td>
            <td>机上服务补偿标准</td>
          </tr>
          <tr>
            <td>非航空公司原因延误</td>
            <td>4小时以内</td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √航班在始发地延误或取消，协助旅客安排餐食，费用由旅客自理；<br>
                √ 根据旅客要求，出具航班延误或取消书面证明；<br>
                √ 根据旅客需要，免费为旅客办理签转或退票手续。<br>
            </td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 机上延误超过2小时（含）为旅客提供饮用水与食品；<br>
                √ 机上延误超过3小时（含）且无明确起飞时间的，在不违反航空安全、安全保卫规定的情况下，安排旅客下机等待。
            </td>
          </tr>
          <tr>
            <td>非航空公司原因延误</td>
            <td>4（含）-8小时</td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 航班在始发地延误或取消，协助旅客安排餐食和住宿，费用由旅客自理； <br>
                √ 国内航班在经停地延误或取消，免费向经停旅客提供餐食或住宿服务；<br>
                √ 国内航班在备降情况下，免费向旅客提供餐食或住宿服务；<br>
                √ 中转联程航班（承运人均为吉祥航空），因始发站航班取消、延误产生的错失衔接航班的旅客，始发站工作人员参照补偿标准执行；<br>
                √ 根据旅客需要，免费为旅客办理签转或退票手续； <br>
                √ 根据旅客要求，出具航班延误或取消书面证明。<br>
            </td>
            <td>√ 每隔30分钟通报一次航班信息；<br>
                √ 机上延误超过2小时（含）为旅客提供饮用水与食品；<br>
                √ 机上延误超过3小时（含）且无明确起飞时间的，在不违反航空安全、安全保卫规定的情况下，安排旅客下机等待。<br>
            </td>
          </tr>
        </table>
        
      </div>
    </div> -->
    <div class="reservation-bottom">
        <span @click="closeNotes">确定</span>
    </div>
</div>
</template>

<script>

  	export default {
      data(){
        return {
          
        }
      },
      props: [
      'tipNotes',
      ],
      methods:{
        closeNotes() {
            this.$emit('closeNotes');
        }
      },
      computed: {
        
      },
      created(){

      },
      mounted() {
        
      },
      activated() {
        console.log(this.tipNotes);
      }
  		
  	}

</script>

<style  lang="scss" scoped>
@import "../../style/mixin";
  .reservation-notes{
      @include wh(100%,100%);
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 20;
    }
    .reservation-bottom{
      z-index: 21;
      height: 2.56rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0, #FFF 50%);
      background: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0, #FFF 50%);
      >span{
        bottom: .28rem;
        text-align: center;
        position: absolute;
        left: 2.5%;
        line-height: .88rem;
        background: -webkit-linear-gradient(left, #FE686C 0, #FD3C71 100%);
        background: linear-gradient(90deg, #FE686C 0, #FD3C71 100%);
        border-radius: 100px;
        font-size: 0.36rem;
        color: #fff;
        width: 95%;
        height: 0.88rem;
      }
    }
    .reservation-detail{
        @include wh(100%,10.68rem);
        bottom: 0;
        position: absolute;
        overflow-y: scroll;
        left: 0;
        z-index: 21;
        background-color: #fff;
        transition: all 0.2s ease-in 0s;
        border-radius: 5px 5px 0 0;
      .images1{
        width: 100%;
        height: 4rem;
        background: url('//m.lvmama.com/flight/image/AQ1.png') no-repeat;
        background-size: 100%;
      }
      .images2{
        width: 100%;
        height: 4rem;
        background: url('//m.lvmama.com/flight/image/AQ2.png') no-repeat;
        background-size: 100%;
      }
      >div{
       
        h3{
          @include sc(.32rem,#333);
          margin: .38rem 0;
          text-align: center;
        }
        >div{
          height: 9.5rem;
          overflow-y: auto;
          position: relative;
          padding: 0 .4rem 2.56rem;
          text-align: left;
        }
        .order_title {
          padding-top: .1rem;
          word-break: break-all;
          font-size: .24rem;
          color: #666;
          line-height: .4rem;
        }
        .order_pra {
          padding-top: .1rem;
          word-break: break-all;
          font-size: .24rem;
          color: #666;
          line-height: .4rem;
        }
        .p-title {
            font-size: 18px;
            text-align: center;
            font-weight: bold;
        }

        .p-title-top {
            margin: 30px auto;
        }

        .p-title-small {
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
        }
      }
    }


</style>